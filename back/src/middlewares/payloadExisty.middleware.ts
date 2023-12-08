import { NextFunction } from "express"
import { AppError } from "../error"


export const payloadExisty = (repo: any, msg: string) => async (req: any, res: any, next: NextFunction) => {
    const payload = await repo.findOneBy({
        id: Number(req.params.id)
    })
    
    if(!payload) throw new AppError(msg, 404)

    res.locals.payload = payload

    return next()
}