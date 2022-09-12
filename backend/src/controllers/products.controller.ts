import { NextFunction, Request, Response, Router } from 'express'
import { getAllBrands, getProducts } from '../services/products.service'

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

export const getShortBrands = async (req: Request, res: Response, next: NextFunction) => {
    let resp
    try {
        resp = await getAllBrands()
    } catch (err) {
        return next(err)
    }
    res.status(200).json({ data: resp })
}