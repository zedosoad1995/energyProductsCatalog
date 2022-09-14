import { Router } from 'express'
import { getShortProviders } from '../controllers/providers.controller'

const router = Router()

router.get('/short',
    getShortProviders
)

export default router