import dotenv from 'dotenv'
import { app } from './app.js'
import connectDB from './db/db.js'

dotenv.config({
    path: './.env'
})

connectDB()
    .then(() => {
        app.on("error", (err) => {
            console.log(err)
        })
        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server listening on port ${process.env.PORT || 8000}`)
        })
    })
    .catch((err) => console.log("MONGO_DB ERROR : ", err))