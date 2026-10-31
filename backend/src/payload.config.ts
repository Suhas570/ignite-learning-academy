import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { cloudStoragePlugin } from '@payloadcms/plugin-cloud-storage'
import { resendAdapter } from '@payloadcms/email-resend'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Enquiries } from './collections/Enquiries'
import { Courses } from './collections/Courses'
import { SiteSettings } from './globals/SiteSettings'
import { cloudinaryAdapter } from './utilities/cloudinaryAdapter'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const allowedOrigins = [
  'https://ignite-learning-academy.netlify.app',
  'https://ignitelearningacademy.in',
  'https://www.ignitelearningacademy.in',
  ...(process.env.NODE_ENV !== 'production' ? ['http://localhost:3001', 'http://127.0.0.1:3001'] : []),
  ...(process.env.FRONTEND_URL ? [process.env.FRONTEND_URL] : []),
]

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      logout: {
        Button: './components/LogoutButton#LogoutButton',
      },
    },
  },
  cors: allowedOrigins,
  csrf: allowedOrigins,
  collections: [Users, Media, Enquiries, Courses],
  globals: [SiteSettings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'dev-secret-payload-ignite-academy-2026',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  email: resendAdapter({
    defaultFromAddress: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
    defaultFromName: 'Ignite Learning Academy',
    apiKey: process.env.RESEND_API_KEY || 'placeholder_resend_api_key',
  }),
  plugins: [
    cloudStoragePlugin({
      collections: {
        media: {
          adapter: cloudinaryAdapter,
          disableLocalStorage: true,
        },
      },
    }),
  ],
})
