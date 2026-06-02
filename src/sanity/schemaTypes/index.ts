import { type SchemaTypeDefinition } from 'sanity'
import { micrositeLink } from './micrositeLink'
import { micrositeLinkList } from './micrositeLinkList'
import agentSchema from './agent'
import propertySchema from './property'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [micrositeLink, micrositeLinkList, agentSchema, propertySchema],
}