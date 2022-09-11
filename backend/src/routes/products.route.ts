import { Router } from 'express'
import { getManyProducts } from '../controllers/products.controller'


const router = Router()

router.get('/',
    getManyProducts
)

export default router