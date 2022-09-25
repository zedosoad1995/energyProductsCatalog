import express, { Express, Request, Response, NextFunction } from 'express'
import routes from './routes'
import cors from 'cors'
import bodyParser from 'body-parser'
import { runJobs } from './helpers/jobs'

import dotenv from 'dotenv'
import { runAllScrapers } from './services/scraper.service'
dotenv.config()

//runJobs()
runAllScrapers()

const app = express()
const port = process.env.PORT

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(routes)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    return res.status(500).json({ message: err.message })
})

app.listen(port, () => {
    console.log(`Server is listening on ${port}`)
})
