import { NextFunction, Request, Response } from 'express'
import { getProducts, getUniqueValuesFromField } from '../services/products.service'


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
        resp = await getUniqueValuesFromField(req.query, 'brand')
    } catch (err) {
        return next(err)
    }
    res.status(200).json({ data: resp })
}

export const getShortEan = async (req: Request, res: Response, next: NextFunction) => {
    let resp
    try {
        resp = await getUniqueValuesFromField(req.query, 'ean')
    } catch (err) {
        return next(err)
    }
    res.status(200).json({ data: resp })
}
