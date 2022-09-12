import { Router } from 'express'
import { getManyProducts, getShortBrands } from '../controllers/products.controller'


const router = Router()

router.get('/',
    getManyProducts
)

router.get('/short/brands',
    getShortBrands
)

export default router