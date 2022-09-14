import { Router } from 'express'
import { getShortCategories } from '../controllers/categories.controller'

const router = Router()

router.get('/short',
    getShortCategories
)

export default router