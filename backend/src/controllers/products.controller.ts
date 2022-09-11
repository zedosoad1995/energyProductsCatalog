import { NextFunction, Request, Response, Router } from 'express'
import { getProducts } from '../services/products.service'

const router = Router()


export const getManyProducts = async (req: Request, res: Response, next: NextFunction) => {
    let resp
    try {
        resp = await getProducts(req.query)
    } catch (err) {
        return next(err)
    }
    res.status(200).json({ data: resp })
}