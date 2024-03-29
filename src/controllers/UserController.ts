import { Request, Response } from 'express'
import JWT from 'jsonwebtoken'

import { User } from '../models/User'

export const register = async (req: Request, res: Response) => {
    if (req.body.email && req.body.password) {
        let { email, password } = req.body

        let hasUser = await User.findOne({where: { email }})
        if (!hasUser) {
            let newUser = await User.create({ email, password })

            const token = JWT.sign(
                { id: newUser.id, email: newUser.email},
                process.env.JWT_SECRET_KEY as string,
                { expiresIn: '24h' }
            )

            res.status(201)
            res.json({ id: newUser.id, token })
        } else {
            res.json({ error: 'Este e-mail já existe.' })
        }
    } else {
        res.json({ error: 'E-mail e/ou senha não digitados. Por favor, tente novamente.' })
    }
}

export const login = async (req: Request, res: Response) => {
    if (req.body.email && req.body.password) {
        let email: string = req.body.email
        let password: string = req.body.password

        let user = await User.findOne({
            where: { email, password }
        })

        if (user) {
            const token = JWT.sign(
                { id: user.id, email: user.email },
                process.env.JWT_SECRET_KEY as string,
                { expiresIn: '24h' }
            )

            res.json({ status: true, token })
            return
        }
    }

    res.json({ status: false })
}

export const listUsers = async (req: Request, res: Response) => {
    let userList = await User.findAll()

    res.json({ userList })
}