// sanity/schemas/agent.ts
const agentSchema = {
  name: 'agent',
  title: 'Agent',
  type: 'document',
  fields: [
    { name: 'name', type: 'string' },
    { name: 'role', type: 'string' },
    { name: 'phone', type: 'string' },
    { name: 'email', type: 'string' },
    { name: 'photo', type: 'image' },
  ]
}

export default agentSchema
