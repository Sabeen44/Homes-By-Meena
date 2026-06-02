import { type SchemaTypeDefinition } from 'sanity'
import { micrositeLink } from './micrositeLink'
import { micrositeLinkList } from './micrositeLinkList'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [micrositeLink, micrositeLinkList],
}