import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['name', 'email', 'role', 'createdAt'],
  },
  auth: {
    // Email + password authentication only (no SMS or OTP)
    tokenExpiration: 7200, // 2 hours
    verify: false, // Phone or SMS verification disabled
    maxLoginAttempts: 5, // Temporary lockout after 5 failed login attempts
    lockTime: 10 * 60 * 1000, // 10 minutes lock time
    forgotPassword: {
      expiration: 30 * 60 * 1000, // 30-minute one-time link expiry for password reset
    },
  },
  access: {
    // Only authenticated users can access the collection
    read: ({ req: { user } }) => {
      if (!user) return false
      if (user.role === 'admin') return true
      return {
        id: {
          equals: user.id,
        },
      }
    },
    create: ({ req: { user } }) => Boolean(user && user.role === 'admin'),
    update: ({ req: { user } }) => {
      if (!user) return false
      if (user.role === 'admin') return true
      return {
        id: {
          equals: user.id,
        },
      }
    },
    delete: ({ req: { user } }) => Boolean(user && user.role === 'admin'),
    admin: ({ req: { user } }) => Boolean(user && (user.role === 'admin' || user.role === 'instructor')),
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Full Name',
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'admin',
      options: [
        { label: 'Administrator', value: 'admin' },
        { label: 'Instructor', value: 'instructor' },
        { label: 'Student', value: 'student' },
      ],
      access: {
        update: ({ req: { user } }) => Boolean(user && user.role === 'admin'),
      },
    },
  ],
  timestamps: true,
}
