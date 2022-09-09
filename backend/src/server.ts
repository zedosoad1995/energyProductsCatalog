import dotenv from 'dotenv'
import express from 'express'

import { runScraper } from './services/scrapers/worten.service'

dotenv.config()

runScraper()


const app = express()
const port = process.env.PORT

app.get('/', (req, res) => {
    res.send('Server is up and running!')
})



app.listen(port, () => {
    console.log(`Server is listening on ${port}`)
})
