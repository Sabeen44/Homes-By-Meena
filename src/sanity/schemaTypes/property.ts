const propertySchema = {
  name: 'property',
  title: 'Property',
  type: 'document',
  fields: [
    // Address
    { name: 'address', type: 'string', title: 'Street Address' },
    { name: 'suburb', type: 'string', title: 'Suburb' },
    { name: 'city', type: 'string', title: 'City' },
    { name: 'state', type: 'string', title: 'State' },
    { name: 'zip', type: 'string', title: 'ZIP Code' },

    // Listing
    { name: 'status', type: 'string', title: 'Status (e.g. For Sale)' },
    { name: 'price', type: 'number', title: 'Price' },

    // Stats
    { name: 'beds', type: 'number', title: 'Bedrooms' },
    { name: 'baths', type: 'number', title: 'Bathrooms' },
    { name: 'sqft', type: 'number', title: 'Home Size (sq ft)' },
    { name: 'lotSize', type: 'number', title: 'Lot Size (sq ft)' },
    { name: 'yearBuilt', type: 'number', title: 'Year Built' },

    // Content
    { name: 'description', type: 'text', title: 'Description' },
    {
      name: 'features',
      type: 'array',
      title: 'Features & Amenities',
      of: [{ type: 'string' }],
    },

    // Media
    { name: 'heroImage', type: 'image', title: 'Hero Image' },
    {
      name: 'images',
      type: 'array',
      title: 'Photos',
      of: [{ type: 'image' }],
    },
    { name: 'videoUrl', type: 'url', title: 'Video URL (YouTube/Vimeo)' },
    { name: 'tourUrl', type: 'url', title: '3D Tour URL (Matterport)' },
    {
      name: 'floorPlans',
      type: 'array',
      title: 'Floor Plans',
      of: [{
        type: 'object',
        fields: [
          { name: 'label', type: 'string', title: 'Level (e.g. Ground, First)' },
          { name: 'sqft', type: 'number', title: 'Square Footage' },
          { name: 'image', type: 'image', title: 'Floor Plan Image' },
        ],
      }],
    },

    // Documents
    {
      name: 'documents',
      type: 'array',
      title: 'Property Documents',
      of: [{
        type: 'object',
        fields: [
          { name: 'label', type: 'string', title: 'Document Label' },
          { name: 'file', type: 'file', title: 'File' },
        ],
      }],
    },

    // Location
    { name: 'location', type: 'geopoint', title: 'Location' },
    {
      name: 'proximities',
      type: 'array',
      title: 'Nearby Places',
      of: [{
        type: 'object',
        fields: [
          { name: 'label', type: 'string' },
          { name: 'distance', type: 'string' },
          { name: 'icon', type: 'string', description: 'Emoji e.g. 🏪' },
        ],
      }],
    },

    // Agents
    {
      name: 'agents',
      type: 'array',
      title: 'Agents',
      validation: (Rule: any) => Rule.max(2),
      of: [{ type: 'reference', to: [{ type: 'agent' }] }],
    },
    {
      name: 'brokerageLogo',
      type: 'image',
      title: 'Brokerage Logo',
    },

    // Testimonials
    {
      name: 'testimonials',
      type: 'array',
      title: 'Testimonials',
      of: [{
        type: 'object',
        fields: [
          { name: 'quote', type: 'text' },
          { name: 'author', type: 'string' },
          { name: 'year', type: 'number' },
        ],
      }],
    },
  ],
}

export default propertySchema
