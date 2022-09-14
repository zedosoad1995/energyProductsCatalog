import { NextFunction, Request, Response } from 'express'
import { getUniqueProviders } from '../services/providers.service'


export const getShortProviders = async (req: Request, res: Response, next: NextFunction) => {
    let resp
    try {
        resp = await getUniqueProviders(req.query)
    } catch (err) {
        return next(err)
    }
    res.status(200).json({ data: resp })
}
