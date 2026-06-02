// sanity/schemas/property.ts

const propertySchema = {
  name: 'property',
  title: 'Property',
  type: 'document',
  fields: [
    { name: 'address', type: 'string' },
    { name: 'price', type: 'number' },
    { name: 'beds', type: 'number' },
    { name: 'baths', type: 'number' },
    { name: 'sqft', type: 'number' },
    { name: 'yearBuilt', type: 'number' },
    { name: 'description', type: 'text' },
    { name: 'features', type: 'array', of: [{ type: 'string' }] },
    { name: 'images', type: 'array', of: [{ type: 'image' }] },
    { name: 'floorPlans', type: 'array', of: [{ type: 'image' }] },
    { name: 'tourUrl', type: 'url' },
    { name: 'location', type: 'geopoint' },
    { name: 'suburb', type: 'string' },
{ name: 'status', type: 'string' }, // e.g. "For Sale", "For Rent"
    { name: 'agent', type: 'reference', to: [{ type: 'agent' }] },
    { name: 'proximities', type: 'array', of: [{
      type: 'object',
      fields: [
        { name: 'label', type: 'string' },
        { name: 'distance', type: 'string' },
        { name: 'icon', type: 'string', description: 'Emoji icon e.g. 🏪' },
      ]
    }]},
    { name: 'testimonials', type: 'array', of: [{
      type: 'object',
      fields: [
        { name: 'quote', type: 'text' },
        { name: 'author', type: 'string' },
        { name: 'year', type: 'number' },
      ]
    }]}
  ]
}

export default propertySchema