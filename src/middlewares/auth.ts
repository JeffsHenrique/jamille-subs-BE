import { Request, Response, NextFunction } from 'express'
import JWT from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export const Auth = {
    private: async (req: Request, res: Response, next: NextFunction) => {
        let authorized = false

        if (req.headers.authorization) {
            const [authType, token] = req.headers.authorization.split(' ')
            if (authType === 'Bearer') {
                try {
                    JWT.verify(
                        token,
                        process.env.JWT_SECRET_KEY as string
                    )
                    authorized = true
                } catch (error) {
                    
                }
            }
        }

        if (authorized) {
            next()
        } else {
            res.status(403)
            res.json({ error: 'Não autorizado!' })
        }
    }
}