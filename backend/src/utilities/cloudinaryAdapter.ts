import { v2 as cloudinary, type UploadApiResponse } from 'cloudinary'
import type { Adapter } from '@payloadcms/plugin-cloud-storage/types'

export function getCloudinaryConfig() {
  let cloudName = process.env.CLOUDINARY_CLOUD_NAME || ''
  let apiKey = process.env.CLOUDINARY_API_KEY || ''
  let apiSecret = process.env.CLOUDINARY_API_SECRET || ''
  const url = process.env.CLOUDINARY_URL

  if (url && url.startsWith('cloudinary://')) {
    try {
      const parsed = new URL(url)
      if (parsed.hostname) cloudName = cloudName || parsed.hostname
      if (parsed.username) apiKey = apiKey || decodeURIComponent(parsed.username)
      if (parsed.password) apiSecret = apiSecret || decodeURIComponent(parsed.password)
    } catch {
      // ignore URL parsing error
    }
  }

  const isPlaceholder = (val: string) =>
    !val ||
    val.includes('placeholder') ||
    val.includes('<your_') ||
    val.includes('%3Cyour_')

  const isConfigured = !isPlaceholder(cloudName) && !isPlaceholder(apiKey) && !isPlaceholder(apiSecret)

  return {
    cloudName: cloudName || 'cbbjut8p',
    apiKey,
    apiSecret,
    isConfigured,
  }
}

export const cloudinaryAdapter: Adapter = ({ prefix = 'ignite-academy' }) => {
  return {
    name: 'cloudinary',
    handleUpload: async ({ file, data }) => {
      const { cloudName, apiKey, apiSecret, isConfigured } = getCloudinaryConfig()
      const isVideo = Boolean((file.mimeType && file.mimeType.startsWith('video/')) || file.filename?.endsWith('.mp4'))

      if (isConfigured) {
        try {
          cloudinary.config({
            cloud_name: cloudName,
            api_key: apiKey,
            api_secret: apiSecret,
            secure: true,
          })

          const sanitizedPublicId = (file.filename || '')
            .replace(/\.[^/.]+$/, '')
            .normalize('NFKD')
            .replace(/[^\w\s-]/g, '')
            .trim()
            .replace(/[-\s]+/g, '_')
            .slice(0, 80) || `media_${Date.now()}`

          const result = await new Promise<UploadApiResponse>((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
              {
                folder: prefix,
                public_id: sanitizedPublicId,
                resource_type: isVideo ? 'video' : 'auto',
              },
              (error, res) => {
                if (error) return reject(error)
                if (res) return resolve(res)
                reject(new Error('Cloudinary upload returned empty response'))
              }
            )
            uploadStream.end(file.buffer)
          })

          data.url = result.secure_url
          if (isVideo) {
            data.thumbnailURL = result.secure_url.replace(/\.[a-zA-Z0-9]+$/, '.jpg')
            if (file.buffer) {
              try {
                const { extractVideoFrame, getThumbnailsDir } = await import('./videoThumbnail')
                const fs = await import('fs')
                const path = await import('path')
                const thumbDir = getThumbnailsDir()
                const tempVideoPath = path.resolve(thumbDir, `tmp_${Date.now()}_${file.filename}`)
                const outputThumbPath = path.resolve(thumbDir, `${file.filename}.jpg`)
                fs.writeFileSync(tempVideoPath, file.buffer)
                extractVideoFrame(tempVideoPath, outputThumbPath)
                if (fs.existsSync(tempVideoPath)) fs.unlinkSync(tempVideoPath)
              } catch (e) {
                console.error('[CloudinaryAdapter] Frame extraction error:', e)
              }
            }
          }
          return {
            url: data.url,
            thumbnailURL: data.thumbnailURL,
          }
        } catch (cloudErr) {
          console.warn('[CloudinaryAdapter] Cloudinary upload failed, falling back to local storage:', cloudErr)
        }
      }

      // Local fallback
      data.url = `/api/media/file/${file.filename}`
      if (isVideo) {
        data.thumbnailURL = `/api/media/thumbnail/${file.filename}.jpg`
        try {
          const { extractVideoFrame, getThumbnailsDir } = await import('./videoThumbnail')
          const fs = await import('fs')
          const path = await import('path')
          const thumbDir = getThumbnailsDir()
          const localVideoDir = path.resolve(process.cwd(), 'seed-videos')
          if (!fs.existsSync(localVideoDir)) fs.mkdirSync(localVideoDir, { recursive: true })
          const localVideoPath = path.resolve(localVideoDir, file.filename)
          fs.writeFileSync(localVideoPath, file.buffer)
          const outputThumbPath = path.resolve(thumbDir, `${file.filename}.jpg`)
          extractVideoFrame(localVideoPath, outputThumbPath)
        } catch (e) {
          console.error('[CloudinaryAdapter] Local video thumbnail extraction error:', e)
        }
      }
      return {
        url: data.url,
        thumbnailURL: data.thumbnailURL,
      }
    },
    handleDelete: async ({ filename }) => {
      const { cloudName, apiKey, apiSecret, isConfigured } = getCloudinaryConfig()

      if (isConfigured) {
        cloudinary.config({
          cloud_name: cloudName,
          api_key: apiKey,
          api_secret: apiSecret,
        })
        const sanitizedPublicId = (filename || '')
          .replace(/\.[^/.]+$/, '')
          .normalize('NFKD')
          .replace(/[^\w\s-]/g, '')
          .trim()
          .replace(/[-\s]+/g, '_')
          .slice(0, 80)
        const publicId = `${prefix}/${sanitizedPublicId}`
        await cloudinary.uploader.destroy(publicId).catch(() => {})
      }
    },
    generateURL: ({ filename, data }) => {
      if (data?.url && (data.url.startsWith('http://') || data.url.startsWith('https://'))) {
        return data.url
      }
      return `/api/media/file/${filename}`
    },
    staticHandler: async (_req, { params: { filename } }: any) => {
      const fs = await import('fs')
      const path = await import('path')

      const candidateDirs = [
        path.resolve('./seed-videos/thumbnails'),
        path.resolve('../backend/seed-videos/thumbnails'),
        path.resolve('./seed-videos'),
        path.resolve('../backend/seed-videos'),
        'C:/tmp/ignite-real-media',
        path.resolve('./tmp/ignite-real-media'),
        path.resolve('../tmp/ignite-real-media'),
        'C:/tmp/ignite-seed-media',
        path.resolve('./tmp/ignite-seed-media'),
        path.resolve('../tmp/ignite-seed-media'),
        'C:/Users/ADMIN/Desktop/Ignite Academy',
      ]

      for (const d of candidateDirs) {
        if (!fs.existsSync(d)) continue
        const fullPath = path.join(d, filename)
        if (fs.existsSync(fullPath) && !fs.statSync(fullPath).isDirectory()) {
          const fileBytes = fs.readFileSync(fullPath)
          const isMp4 = filename.endsWith('.mp4')
          const isPng = filename.endsWith('.png')
          const isWebp = filename.endsWith('.webp')
          const contentType = isMp4 ? 'video/mp4' : isPng ? 'image/png' : isWebp ? 'image/webp' : 'image/jpeg'

          return new Response(fileBytes, {
            status: 200,
            headers: {
              'Content-Type': contentType,
              'Content-Length': String(fileBytes.length),
              'Cache-Control': 'public, max-age=31536000, immutable',
            },
          })
        }

        try {
          const files = fs.readdirSync(d)
          const match = files.find(f => f === filename || f.replace(/[^\w.-]/g, '_') === filename)
          if (match) {
            const matchPath = path.join(d, match)
            if (fs.statSync(matchPath).isDirectory()) continue
            const fileBytes = fs.readFileSync(matchPath)
            const isMp4 = match.endsWith('.mp4') || filename.endsWith('.mp4')
            const isPng = match.endsWith('.png') || filename.endsWith('.png')
            const isWebp = match.endsWith('.webp') || filename.endsWith('.webp')
            const contentType = isMp4 ? 'video/mp4' : isPng ? 'image/png' : isWebp ? 'image/webp' : 'image/jpeg'

            return new Response(fileBytes, {
              status: 200,
              headers: {
                'Content-Type': contentType,
                'Content-Length': String(fileBytes.length),
                'Cache-Control': 'public, max-age=31536000, immutable',
              },
            })
          }
        } catch {
          // ignore directory read error
        }
      }

      // If requested file is a thumbnail image for a video (e.g., [filename].mp4.jpg or [filename].jpg)
      if (filename.endsWith('.jpg') || filename.endsWith('.jpeg')) {
        const baseVideoName = filename.replace(/\.(jpg|jpeg)$/, '')
        for (const d of candidateDirs) {
          if (!fs.existsSync(d)) continue
          try {
            const files = fs.readdirSync(d)
            const videoMatch = files.find(
              f => f === baseVideoName || f.replace(/[^\w.-]/g, '_') === baseVideoName || `${f}.jpg` === filename || `${f.replace(/[^\w.-]/g, '_')}.jpg` === filename
            )
            if (videoMatch && videoMatch.endsWith('.mp4')) {
              const videoPath = path.join(d, videoMatch)
              const { extractVideoFrame, getThumbnailsDir } = await import('./videoThumbnail')
              const thumbDir = getThumbnailsDir()
              const outputThumbPath = path.join(thumbDir, `${videoMatch}.jpg`)
              if (!fs.existsSync(outputThumbPath)) {
                extractVideoFrame(videoPath, outputThumbPath)
              }
              if (fs.existsSync(outputThumbPath)) {
                const fileBytes = fs.readFileSync(outputThumbPath)
                return new Response(fileBytes, {
                  status: 200,
                  headers: {
                    'Content-Type': 'image/jpeg',
                    'Content-Length': String(fileBytes.length),
                    'Cache-Control': 'public, max-age=31536000, immutable',
                  },
                })
              }
            }
          } catch {
            // ignore
          }
        }
      }

      return new Response('File not found', { status: 404 })
    },
  }
}

