import type { GlobalConfig } from 'payload'
import { triggerFrontendRevalidation } from '../utilities/revalidateFrontend'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  access: {
    // Public read access for site-wide settings
    read: () => true,
    // Authenticated admin only can update settings
    update: ({ req: { user } }) => Boolean(user),
  },
  hooks: {
    afterChange: [
      () => {
        triggerFrontendRevalidation({ tag: 'site-settings', path: '/' })
      },
    ],
  },
  fields: [
    {
      name: 'whatsappNumber',
      type: 'text',
      label: 'WhatsApp Contact Number',
      admin: {
        placeholder: '+91 98765 43210',
      },
    },
    {
      name: 'contactEmail',
      type: 'email',
      label: 'General Contact Email',
      admin: {
        placeholder: 'info@ignitelearningacademy.com',
      },
    },
    {
      name: 'contactPhone',
      type: 'text',
      label: 'Direct Phone Number',
      admin: {
        placeholder: '+91 44 1234 5678',
      },
    },
    {
      name: 'address',
      type: 'textarea',
      label: 'Campus Physical Address',
      admin: {
        placeholder: '123 Academy Blvd, Tech City, Knowledge Corridor',
      },
    },
    {
      name: 'socialLinks',
      type: 'array',
      label: 'Social Media Links',
      fields: [
        {
          name: 'platform',
          type: 'select',
          required: true,
          options: [
            { label: 'Facebook', value: 'facebook' },
            { label: 'Instagram', value: 'instagram' },
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'YouTube', value: 'youtube' },
            { label: 'X (Twitter)', value: 'twitter' },
          ],
        },
        {
          name: 'url',
          type: 'text',
          required: true,
          label: 'Profile / Page URL',
        },
      ],
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Official Academy Logo',
    },
  ],
}
