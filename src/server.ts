import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path'

import { mysqlDBConnect } from './database/mysql'

import apiRoutes from './routes/api'
import adminRoutes from './routes/admin'


dotenv.config()

mysqlDBConnect()

const server = express()

server.use(cors({
    origin: '*',
    methods: ['GET', 'POST']
}))

server.use(express.static(path.join(__dirname, '../public')))
server.use(express.urlencoded({extended: true}))

server.use('/api', apiRoutes)
server.use('/admin', adminRoutes)

server.use((req: Request, res: Response) => {
    res.status(404).send('Página não encontrada!')
})

server.listen(process.env.PORT)