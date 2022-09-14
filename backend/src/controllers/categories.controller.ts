import { NextFunction, Request, Response } from 'express'
import { getUniqueCategories } from '../services/categories.service'


export const getShortCategories = async (req: Request, res: Response, next: NextFunction) => {
    let resp
    try {
        resp = await getUniqueCategories(req.query)
    } catch (err) {
        return next(err)
    }
    res.status(200).json({ data: resp })
}
