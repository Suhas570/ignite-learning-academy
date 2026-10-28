import type { CollectionConfig } from 'payload'

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
}

export const Courses: CollectionConfig = {
  slug: 'courses',
  labels: {
    singular: 'Course',
    plural: 'Courses',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'duration', 'status', 'featured', 'updatedAt'],
  },
  access: {
    // Authenticated admin users can view and edit everything;
    // Public API queries return Published courses.
    read: ({ req: { user } }) => {
      if (user) return true
      return {
        status: {
          equals: 'Published',
        },
      }
    },
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (data) {
          if (!data.slug && data.title) {
            data.slug = slugify(data.title)
          } else if (data.slug) {
            data.slug = slugify(data.slug)
          }
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Course Title',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'URL Slug',
      admin: {
        description: 'Auto-generated from title or custom URL path (e.g. public-speaking-for-juniors)',
      },
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      label: 'Short Description (Card Summary)',
      admin: {
        description: 'Displayed on course cards and overview banners',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      label: 'Full Course Description',
    },
    {
      name: 'duration',
      type: 'text',
      required: true,
      label: 'Duration',
      admin: {
        description: 'e.g. 1 Year, 6 Weeks, 8 Weeks',
      },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      defaultValue: 'Student Training',
      label: 'Category',
      options: [
        { label: 'Student Training', value: 'Student Training' },
        { label: 'Teacher Training', value: 'Teacher Training' },
      ],
    },
    {
      name: 'badge',
      type: 'text',
      label: 'Badge / Level',
      admin: {
        description: 'e.g. Students (Ages 6–11), Diploma & Certification, Professional Certificate',
      },
    },
    {
      name: 'eligibility',
      type: 'text',
      label: 'Eligibility Criteria',
    },
    {
      name: 'mode',
      type: 'text',
      label: 'Delivery Mode',
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      label: 'Feature on Homepage Slider',
    },
    {
      name: 'syllabus',
      type: 'array',
      label: 'Syllabus / Modules',
      fields: [
        {
          name: 'module',
          type: 'text',
          required: true,
          label: 'Module Topic',
        },
      ],
    },
    {
      name: 'learningOutcomes',
      type: 'array',
      label: 'Learning Outcomes',
      fields: [
        {
          name: 'outcome',
          type: 'text',
          required: true,
          label: 'Outcome',
        },
      ],
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'Published',
      label: 'Publication Status',
      options: [
        { label: 'Published', value: 'Published' },
        { label: 'Draft', value: 'Draft' },
      ],
    },
  ],
  timestamps: true,
}
