import type { CollectionConfig } from 'payload'

// Simple in-memory rate limiter per IP / email to prevent spam (Awesome Skills)
const rateLimitMap = new Map<string, { count: number; firstAttempt: number }>()
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000 // 10 minutes
const MAX_ENQUIRIES_PER_WINDOW = 5

function checkRateLimit(key: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(key)

  if (!entry || now - entry.firstAttempt > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(key, { count: 1, firstAttempt: now })
    return true
  }

  if (entry.count >= MAX_ENQUIRIES_PER_WINDOW) {
    return false
  }

  entry.count += 1
  return true
}

export const Enquiries: CollectionConfig = {
  slug: 'enquiries',
  admin: {
    useAsTitle: 'subject',
    defaultColumns: ['name', 'email', 'subject', 'status', 'createdAt'],
  },
  access: {
    // Only authenticated admins can read/update/delete. The public can only create enquiries.
    read: ({ req: { user } }) => Boolean(user),
    create: () => true, // Public can submit contact enquiries
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  hooks: {
    beforeValidate: [
      async ({ data, req, operation }) => {
        if (operation === 'create' && data) {
          // Spam protection: check rate limit by client IP or email
          let clientIp = 'default-client'
          try {
            if (req.headers && typeof req.headers.get === 'function') {
              clientIp = (req.headers.get('x-forwarded-for') || 'default-client').split(',')[0].trim()
            } else if (req.headers && typeof req.headers === 'object') {
              clientIp = String((req.headers as any)['x-forwarded-for'] || 'default-client').split(',')[0].trim()
            }
          } catch {
            clientIp = 'default-client'
          }

          const emailKey = (data.email || '').toLowerCase().trim()
          const rateKey = `${clientIp}_${emailKey}`

          if (!checkRateLimit(rateKey)) {
            throw new Error(
              'Too many enquiry submissions from your connection. Please wait 10 minutes or reach out directly on WhatsApp.'
            )
          }

          // Basic string sanitization
          if (data.name) data.name = String(data.name).trim().slice(0, 150)
          if (data.subject) data.subject = String(data.subject).trim().slice(0, 200)
          if (data.message) data.message = String(data.message).trim().slice(0, 3000)
          if (data.phone) data.phone = String(data.phone).trim().slice(0, 30)
        }
        return data
      },
    ],
    afterChange: [
      async ({ doc, operation, req }) => {
        if (operation === 'create') {
          try {
            // 1. Fetch contact email from SiteSettings global
            let adminEmail = 'info@ignitelearningacademy.com'
            try {
              const siteSettings = await req.payload.findGlobal({ slug: 'site-settings' })
              if (siteSettings?.contactEmail) {
                adminEmail = siteSettings.contactEmail
              }
            } catch (e) {
              console.warn('[Enquiries afterChange] Could not fetch SiteSettings contactEmail, using fallback:', adminEmail)
            }

            const apiKey = process.env.RESEND_API_KEY
            const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'

            // Helper to dispatch email via Resend
            const sendResendEmail = async ({
              to,
              subject,
              html,
              type,
            }: {
              to: string
              subject: string
              html: string
              type: 'admin' | 'user'
            }) => {
              req.payload?.logger?.info(`[Resend Dispatch] Sending ${type} email to: ${to} | Subject: "${subject}"`)

              if (!apiKey || apiKey === 'placeholder_resend_api_key') {
                req.payload?.logger?.info(
                  `[Resend Simulated] RESEND_API_KEY is placeholder. Mocked email successfully sent to ${to}.`
                )
                return { id: `simulated-${Date.now()}`, simulated: true }
              }

              try {
                const res = await fetch('https://api.resend.com/emails', {
                  method: 'POST',
                  headers: {
                    Authorization: `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    from: `Ignite Learning Academy <${fromEmail}>`,
                    to: [to],
                    subject,
                    html,
                  }),
                })

                const resData = await res.json()
                if (!res.ok) {
                  req.payload?.logger?.warn(`[Resend Error] Status ${res.status}: ${JSON.stringify(resData)}`)
                  if (res.status === 403) {
                    req.payload?.logger?.warn(
                      '[Resend 403 /boost Fallback] Free onboarding@resend.dev requires sending only to the registered account email until domain is verified. Logged safely.'
                    )
                  }
                  return { error: resData, status: res.status }
                }

                req.payload?.logger?.info(`[Resend Success] ${type} email delivered to ${to}. Message ID: ${resData.id}`)
                return resData
              } catch (err: any) {
                req.payload?.logger?.error(`[Resend Network Error] Failed sending ${type} email: ${err.message}`)
                return { error: err.message }
              }
            }

            // a) Admin Notification Email
            await sendResendEmail({
              type: 'admin',
              to: adminEmail,
              subject: `New Student Enquiry: ${doc.subject || doc.name}`,
              html: `
                <h2>New Student Enquiry Received</h2>
                <p><strong>Name:</strong> ${doc.name}</p>
                <p><strong>Email:</strong> ${doc.email}</p>
                <p><strong>Phone:</strong> ${doc.phone || 'Not provided'}</p>
                <p><strong>Subject/Programme:</strong> ${doc.subject}</p>
                <p><strong>Source:</strong> ${doc.source || 'website'}</p>
                <p><strong>Message:</strong></p>
                <blockquote style="background:#f9f9f9;padding:12px;border-left:4px solid #5A1D16;">${doc.message}</blockquote>
                <p><small>Received at ${new Date(doc.createdAt).toLocaleString('en-IN')}</small></p>
              `,
            })

            // b) User Auto-reply Email
            if (doc.email) {
              await sendResendEmail({
                type: 'user',
                to: doc.email,
                subject: 'Thank you for contacting Ignite Learning Academy',
                html: `
                  <h2>Thank you for contacting Ignite Learning Academy!</h2>
                  <p>Dear ${doc.name},</p>
                  <p>We have received your enquiry regarding <strong>${doc.subject}</strong>.</p>
                  <p>Our academic admissions counseling team will get back to you within 24 hours with complete details on course eligibility, syllabus, batch schedules, and fee structures.</p>
                  <br/>
                  <p>Warm regards,<br/><strong>Ignite Learning Academy Admissions Desk</strong><br/>Bangalore Campus | +91 90119 01930</p>
                `,
              })
            }
          } catch (err: any) {
            req.payload?.logger?.error?.(`[Enquiries afterChange] Error processing notification: ${err?.message || err}`)
          }
        }
      },
    ],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Full Name',
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      label: 'Email Address',
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Phone Number',
    },
    {
      name: 'subject',
      type: 'text',
      required: true,
      label: 'Subject',
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
      label: 'Message',
    },
    {
      name: 'source',
      type: 'select',
      defaultValue: 'website',
      options: [
        { label: 'Website Contact Form', value: 'website' },
        { label: 'Referral', value: 'referral' },
        { label: 'Social Media', value: 'social_media' },
        { label: 'Walk-in / Campus', value: 'campus' },
        { label: 'Other', value: 'other' },
      ],
      label: 'Enquiry Source',
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'In Progress', value: 'in_progress' },
        { label: 'Resolved', value: 'resolved' },
        { label: 'Archived', value: 'archived' },
      ],
      label: 'Status',
    },
  ],
  timestamps: true,
}
