import { Router } from 'express'
import categoriesRoute from './categories.route'
import productsRoute from './products.route'
import providersRoute from './providers.route'


const api = Router()
    .use('/categories', categoriesRoute)
    .use('/products', productsRoute)
    .use('/providers', providersRoute)

export default Router().use('/api', api);