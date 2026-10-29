/**
 * Triggers non-blocking on-demand revalidation on the Next.js frontend application.
 * Catches all network/endpoint errors to ensure CMS database operations remain uninterrupted.
 */
export async function triggerFrontendRevalidation({
  tag,
  path,
}: {
  tag?: string
  path?: string
}): Promise<void> {
  try {
    const frontendUrl =
      process.env.FRONTEND_URL ||
      (process.env.NODE_ENV === 'production'
        ? 'https://ignite-learning-academy.netlify.app'
        : 'http://localhost:3001')

    const secret =
      process.env.REVALIDATION_SECRET || 'dev-revalidate-secret-ignite-2026'

    const url = new URL('/api/revalidate', frontendUrl)
    url.searchParams.set('secret', secret)
    if (tag) url.searchParams.set('tag', tag)
    if (path) url.searchParams.set('path', path)

    // Non-blocking fetch with 5-second timeout
    fetch(url.toString(), {
      method: 'POST',
      signal: AbortSignal.timeout(5000),
    })
      .then(async (res) => {
        if (!res.ok) {
          const body = await res.text().catch(() => '')
          console.warn(
            `[RevalidateFrontend] Frontend returned status ${res.status}: ${body}`,
          )
        } else {
          console.log(
            `[RevalidateFrontend] Success: tag=${tag || ''}, path=${path || ''}`,
          )
        }
      })
      .catch((error) => {
        console.warn(
          `[RevalidateFrontend] Revalidation network error:`,
          error?.message || error,
        )
      })
  } catch (error: any) {
    console.warn(
      `[RevalidateFrontend] Error executing triggerFrontendRevalidation:`,
      error?.message || error,
    )
  }
}

