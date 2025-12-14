import { type SchemaTypeDefinition } from 'sanity'
import user from './user'
import product from './product'
import category from './category'
import carModel from './carmodel'
import order from './order'
import orderItem from './orderitem'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [user, product, category, carModel, order, orderItem],
}
