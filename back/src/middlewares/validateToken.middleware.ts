import { Request, Response, NextFunction } from "express"
import { verify } from "jsonwebtoken"
import { AppError } from "../error"

export const validateToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization

    if (!token) {
        throw new AppError('Missing Authorization Token', 401)
    }

    const decodedToken = verify(token!, process.env.SECRET_KEY!)

    res.locals.user = decodedToken    

    return next()
}