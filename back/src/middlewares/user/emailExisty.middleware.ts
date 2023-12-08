import { Request, Response, NextFunction } from "express"
import { userRepository } from "../../repository"
import { AppError } from "../../error"

export const emailExisty = async (req: Request, res: Response, nex: NextFunction) => {
    const user = await userRepository.findOneBy({
        email: req.body.email
    })
    
    if(user) throw new AppError("Email inválido", 401)

    return nex()
}
