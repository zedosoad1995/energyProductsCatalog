import dotenv from 'dotenv'
import express from 'express'
import routes from './routes'
import cors from 'cors'
import bodyParser from 'body-parser'


dotenv.config()

const app = express()
const port = process.env.PORT

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(routes)

app.listen(port, () => {
    console.log(`Server is listening on ${port}`)
})
