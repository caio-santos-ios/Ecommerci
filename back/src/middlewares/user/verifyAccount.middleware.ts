import { Request, Response, NextFunction } from "express"
import { userRepository } from "../../repository"
import { AppError } from "../../error"

export const verifyAccount = async (req: Request, res: Response, nex: NextFunction) => {
    console.log(req.body.email)
    const user = await userRepository.findOneBy({
        email: req.body.email
    })
    
    if(!user) throw new AppError("Usuário não encontrado", 404)
    console.log(user)
    
    if(user?.confirmationToken != req.body.confirmationCode) throw new AppError("Codigo inválido", 400)

    user.accountValided = true 

    res.locals.user = user

    return nex()
}

