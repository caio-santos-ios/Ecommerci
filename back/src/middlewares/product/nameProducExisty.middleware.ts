import { Request, Response, NextFunction } from "express"
import { productRepository } from "../../repository"
import { AppError } from "../../error"

export const nameProducExisty = async (req: Request, res: Response, nex: NextFunction) => {
    const product = await productRepository.findOneBy({
        name: req.body.name
    })

    if(product) throw new AppError("Produto já cadastrado", 401)

    return nex()
}

