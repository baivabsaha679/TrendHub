import express from 'express'
import dotenv from 'dotenv'
import Connection from './database/db.js'
import Router from './routes/route.js'
import cors from 'cors'

dotenv.config()

const app=express()

app.use(cors())
app.use(express.json())
app.use('/',Router)

const PORT=process.env.PORT || 8000

app.listen(PORT,()=>console.log(`Server is running successfully on PORT ${PORT}`))

Connection()