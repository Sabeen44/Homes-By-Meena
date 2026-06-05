// sanity/schemas/agent.ts
const agentSchema = {
  name: 'agent',
  title: 'Agent',
  type: 'document',
  fields: [
    { name: 'name', type: 'string' },
    { name: 'role', type: 'string' },
    { name: 'company', type: 'string' },
    { name: 'phone', type: 'string' },
    { name: 'email', type: 'string' },
    { name: 'licenseNumber', type: 'string', title: 'License Number' },
    { name: 'websiteUrl', type: 'url', title: 'Website URL' },
    { name: 'photo', type: 'image' },
  ]
}

export default agentSchema
