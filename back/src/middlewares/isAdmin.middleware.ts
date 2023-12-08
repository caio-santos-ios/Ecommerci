import { Request, Response, NextFunction } from "express"
import { AppError } from "../error"

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    const admin = res.locals.user.admin

    if(!admin) throw new AppError('Não autorizado', 401)
    
    return next()
}