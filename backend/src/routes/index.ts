import { Router } from 'express'
import productsRoute from './products.route';


const api = Router()
    .use('/products', productsRoute)

export default Router().use('/api', api);