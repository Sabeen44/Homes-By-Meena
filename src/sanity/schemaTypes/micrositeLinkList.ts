import { defineType, defineField } from 'sanity'

export const micrositeLinkList = defineType({
  name: 'micrositeLinkList',
  title: 'Microsite Link List',
  type: 'document',
  fields: [
    // ── Identity ──────────────────────────────────────────────────
    defineField({
      name: 'title',
      title: 'Internal Title',
      type: 'string',
      description: 'Internal label for this link list (e.g. "Spring Campaign 2025"). Not shown publicly.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description:
        'Used to build the public URL your QR code points to (e.g. /links/spring-campaign-2025).',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    // ── Branding ──────────────────────────────────────────────────
    defineField({
      name: 'heading',
      title: 'Page Heading',
      type: 'string',
      description: 'Displayed at the top of the microsite page.',
    }),
    defineField({
      name: 'subheading',
      title: 'Page Subheading',
      type: 'text',
      rows: 2,
      description: 'Optional tagline or intro text shown beneath the heading.',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      description: 'Brand logo displayed at the top of the page.',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        }),
      ],
    }),

    // ── Links ─────────────────────────────────────────────────────
    defineField({
      name: 'links',
      title: 'Links',
      type: 'array',
      of: [{ type: 'micrositeLink' }],
      description: 'Add, reorder, or remove links. Drag to reorder.',
      validation: (Rule) => Rule.min(1).error('Add at least one link.'),
    }),

    // ── QR Code notes ─────────────────────────────────────────────
    defineField({
      name: 'qrNotes',
      title: 'QR Code Notes',
      type: 'text',
      rows: 2,
      description:
        'Internal notes about where this QR code is used (e.g. "Printed on brochure, March 2025 event").',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      links: 'links',
      media: 'logo',
    },
    prepare({ title, links, media }) {
      const count = Array.isArray(links) ? links.length : 0
      return {
        title,
        subtitle: `${count} link${count === 1 ? '' : 's'}`,
        media,
      }
    },
  },
})