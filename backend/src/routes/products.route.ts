import { Router } from 'express'
import { getManyProducts, getShortBrands, getShortEan } from '../controllers/products.controller'


const router = Router()

router.get('/',
    getManyProducts
)

router.get('/short/brands',
    getShortBrands
)

router.get('/short/ean',
    getShortEan
)

export default router