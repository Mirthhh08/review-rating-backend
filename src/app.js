import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'


const app = express();
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

app.use(express.json({ limit: '16kb' }))
app.use(express.urlencoded({ extended: true, limit: '16kb' }))
app.use(express.static("public"))
app.use(cookieParser())
app.use(morgan('dev'))

import companyRouter from './routes/company.routes.js'
import reviewRouter from './routes/review.routes.js'

app.use("/api/v1/company", companyRouter)
app.use("/api/v1/review", reviewRouter)
export { app }