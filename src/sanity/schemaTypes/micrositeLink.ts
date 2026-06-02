import { defineType, defineField } from 'sanity'

export const micrositeLink = defineType({
  name: 'micrositeLink',
  title: 'Microsite Link',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Display name shown on the microsite page.',
      validation: (Rule) => Rule.required().min(1).max(80),
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      description: 'The destination URL this link points to.',
      validation: (Rule) =>
        Rule.required().uri({
          scheme: ['http', 'https'],
        }),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
      description: 'Short description shown beneath the title (optional).',
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: 'icon',
      title: 'Icon / Image',
      type: 'image',
      description: 'Logo or icon for this link. Recommended: square, at least 200×200px.',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Describe the image for screen readers.',
        }),
      ],
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Toggle off to hide this link without deleting it.',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'url',
      media: 'icon',
    },
  },
})