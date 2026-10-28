import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'mediaType', 'category', 'status', 'order', 'createdAt'],
  },
  access: {
    // Public read access for published Media only. Draft Media is hidden from public API queries.
    read: ({ req: { user } }) => {
      if (user) return true // Authenticated admins/users can read all media
      return {
        status: {
          equals: 'published',
        },
      }
    },
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  endpoints: [
    {
      path: '/thumbnail/:filename',
      method: 'get',
      handler: async (req) => {
        const fs = await import('fs')
        const path = await import('path')
        const rawFilename = (req.routeParams?.filename as string) || ''
        const filename = path.basename(rawFilename)

        if (!filename || filename === '.' || filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
          return new Response('Invalid filename', { status: 400 })
        }

        const candidateDirs = [
          path.resolve('./seed-videos/thumbnails'),
          path.resolve('../backend/seed-videos/thumbnails'),
          path.resolve('./seed-videos'),
          path.resolve('../backend/seed-videos'),
          'C:/tmp/ignite-real-media',
          path.resolve('./tmp/ignite-real-media'),
          'C:/tmp/ignite-seed-media',
          path.resolve('./tmp/ignite-seed-media'),
        ]

        for (const d of candidateDirs) {
          if (!fs.existsSync(d)) continue
          const fullPath = path.join(d, filename)
          if (fs.existsSync(fullPath) && !fs.statSync(fullPath).isDirectory()) {
            const bytes = fs.readFileSync(fullPath)
            return new Response(bytes, {
              status: 200,
              headers: {
                'Content-Type': 'image/jpeg',
                'Content-Length': String(bytes.length),
                'Cache-Control': 'public, max-age=31536000, immutable',
              },
            })
          }

          try {
            const files = fs.readdirSync(d)
            const match = files.find(f => f === filename || f.replace(/[^\w.-]/g, '_') === filename)
            if (match) {
              const matchPath = path.join(d, match)
              if (!fs.statSync(matchPath).isDirectory()) {
                const bytes = fs.readFileSync(matchPath)
                return new Response(bytes, {
                  status: 200,
                  headers: {
                    'Content-Type': 'image/jpeg',
                    'Content-Length': String(bytes.length),
                    'Cache-Control': 'public, max-age=31536000, immutable',
                  },
                })
              }
            }
          } catch {
            // ignore
          }
        }

        const baseVideoName = filename.replace(/\.(jpg|jpeg)$/, '')
        for (const d of candidateDirs) {
          if (!fs.existsSync(d)) continue
          try {
            const files = fs.readdirSync(d)
            const videoMatch = files.find(
              f =>
                f === baseVideoName ||
                f.replace(/[^\w.-]/g, '_') === baseVideoName ||
                `${f}.jpg` === filename ||
                `${f.replace(/[^\w.-]/g, '_')}.jpg` === filename
            )
            if (videoMatch && videoMatch.endsWith('.mp4')) {
              const videoPath = path.join(d, videoMatch)
              const { extractVideoFrame, getThumbnailsDir } = await import('../utilities/videoThumbnail')
              const thumbDir = getThumbnailsDir()
              const outputThumbPath = path.join(thumbDir, `${videoMatch}.jpg`)
              if (!fs.existsSync(outputThumbPath)) {
                extractVideoFrame(videoPath, outputThumbPath)
              }
              if (fs.existsSync(outputThumbPath)) {
                const bytes = fs.readFileSync(outputThumbPath)
                return new Response(bytes, {
                  status: 200,
                  headers: {
                    'Content-Type': 'image/jpeg',
                    'Content-Length': String(bytes.length),
                    'Cache-Control': 'public, max-age=31536000, immutable',
                  },
                })
              }
            }
          } catch {
            // ignore
          }
        }

        return new Response('Thumbnail not found', { status: 404 })
      },
    },
  ],
  fields: [
    {
      name: 'mediaType',
      type: 'select',
      required: true,
      defaultValue: 'image',
      options: [
        { label: 'Photo', value: 'image' },
        { label: 'Video', value: 'video' },
        { label: 'Photo (alias)', value: 'photo' },
        { label: 'Video (Legacy)', value: 'Video' },
      ],
      label: 'Media Type',
    },
    {
      name: 'videoUrl',
      type: 'text',
      label: 'External Video URL (YouTube, Vimeo, etc.)',
      admin: {
        condition: (data) => data?.mediaType === 'video' || data?.mediaType === 'Video',
        description: 'Provide an external video URL or upload a video file below.',
      },
      validate: (val: any, { siblingData, req }: any) => {
        // Validation: If mediaType is "Video" and videoUrl is empty, an uploaded file must be present
        if (siblingData?.mediaType === 'video' || siblingData?.mediaType === 'Video') {
          const hasFile = Boolean(siblingData?.filename || req?.file)
          if (!val && !hasFile) {
            return 'If Media Type is Video and Video URL is empty, an uploaded video file is required.'
          }
        }
        return true
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Title',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
    },
    {
      name: 'altText',
      type: 'text',
      label: 'Alt Text',
      admin: {
        condition: (data) => data?.mediaType === 'image' || data?.mediaType === 'photo' || !data?.mediaType,
        description: 'Descriptive alt text for accessibility (required for Photos).',
      },
      validate: (val: any, { siblingData }: any) => {
        const isPhoto = siblingData?.mediaType === 'image' || siblingData?.mediaType === 'photo' || !siblingData?.mediaType
        if (isPhoto && (!val || typeof val !== 'string' || !val.trim())) {
          return 'Alt Text is required for images.'
        }
        return true
      },
    },
    {
      name: 'category',
      type: 'select',
      defaultValue: 'general',
      options: [
        { label: 'General', value: 'general' },
        { label: 'Campus & Facilities', value: 'campus' },
        { label: 'Courses & Academics', value: 'courses' },
        { label: 'Events & Activities', value: 'events' },
        { label: 'Student Work', value: 'student_work' },
        { label: 'Student Work (Legacy)', value: 'Student Work' },
        { label: 'Classroom', value: 'Classroom' },
        { label: 'Classroom (lowercase)', value: 'classroom' },
      ],
      label: 'Category',
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      label: 'Publishing Status',
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      label: 'Display Order',
      admin: {
        step: 1,
      },
    },
  ],
  hooks: {
    beforeValidate: [
      ({ data, req, operation }) => {
        if (!data) return data
        const isPhoto = data.mediaType === 'image' || data.mediaType === 'photo' || !data.mediaType
        const isVideo = data.mediaType === 'video' || data.mediaType === 'Video'

        if (operation === 'create') {
          const hasFile = Boolean(data.filename || req?.file || (data as any)?.file)
          if (isPhoto && !hasFile) {
            throw new Error('A file upload is required when Media Type is Photo.')
          }
          if (isVideo && !hasFile && !data.videoUrl) {
            throw new Error('Please provide either an External Video URL or upload a video file.')
          }
        }
        return data
      },
    ],
    beforeChange: [
      async ({ data }) => {
        const isVideo =
          data?.mediaType === 'video' ||
          data?.mediaType === 'Video' ||
          data?.filename?.endsWith('.mp4')

        if (isVideo) {
          if (data?.videoUrl) {
            const ytMatch = data.videoUrl.match(
              /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i
            )
            if (ytMatch && ytMatch[1]) {
              data.thumbnailURL = `https://img.youtube.com/vi/${ytMatch[1]}/hqdefault.jpg`
            }
          } else if (data?.url) {
            if (data.url.includes('cloudinary.com')) {
              data.thumbnailURL = data.url.replace(/\.[a-zA-Z0-9]+$/, '.jpg')
            } else if (data.url.endsWith('.mp4')) {
              data.thumbnailURL = `${data.url}.jpg`
            }
          }
          if (data?.thumbnailURL && !data.coverImage) {
            data.coverImage = data.thumbnailURL
          }
        }
        return data
      },
    ],
    afterRead: [
      ({ doc }) => {
        const isVideo =
          doc?.mediaType === 'video' ||
          doc?.mediaType === 'Video' ||
          doc?.filename?.endsWith('.mp4') ||
          Boolean(doc?.videoUrl)

        if (isVideo) {
          if (!doc.thumbnailURL) {
            if (doc?.videoUrl) {
              const ytMatch = doc.videoUrl.match(
                /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i
              )
              if (ytMatch && ytMatch[1]) {
                doc.thumbnailURL = `https://img.youtube.com/vi/${ytMatch[1]}/hqdefault.jpg`
              }
            } else if (doc?.url) {
              if (doc.url.includes('cloudinary.com')) {
                doc.thumbnailURL = doc.url.replace(/\.[a-zA-Z0-9]+$/, '.jpg')
              } else if (doc.url.endsWith('.mp4')) {
                const fname = doc.filename || doc.url.split('/').pop()
                doc.thumbnailURL = `/api/media/thumbnail/${fname}.jpg`
              }
            }
          }
        }
        return doc
      },
    ],
  },
  upload: {
    // Supports images and videos
    mimeTypes: ['image/*', 'video/*'],
    disableLocalStorage: true,
    filesRequiredOnCreate: false,
    adminThumbnail: ({ doc }: any) => {
      if (doc?.thumbnailURL) return doc.thumbnailURL
      if (doc?.url && doc.url.includes('cloudinary.com')) return doc.url.replace(/\.[a-zA-Z0-9]+$/, '.jpg')
      if (doc?.url && doc.url.endsWith('.mp4')) {
        const fname = doc.filename || doc.url.split('/').pop()
        return `/api/media/thumbnail/${fname}.jpg`
      }
      return doc?.url
    },
  },
  timestamps: true,
}

