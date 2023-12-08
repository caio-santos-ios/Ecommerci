import { Request, Response } from "express"
import productService from "../services/product.service"
import { v2 as cloudinary } from 'cloudinary'
import fs from "fs"
import { AppError } from "../error"


const create = async (req: Request, res: Response): Promise<Response> => {
    const upload = await cloudinary.uploader.upload(req.file!.path, (error, result) =>  result);
    
    fs.unlink(req.file!.path, (error) => {
        if(error){
            console.log(error)
        }
    })

    const myProduct = {
        ...req.body,
        image: upload.url
    }

    if(myProduct.image == null) throw new AppError("Produto sem", 400)

    const product = await productService.create(myProduct)

    return res.status(201).json(product)
}

const read = async (req: Request, res: Response): Promise<Response> => {
    const products = await productService.read()
    return res.status(200).json(products)
}

const retrive = async (req: Request, res: Response): Promise<Response> => {
    const product = await productService.retrive(req.params.id)
    return res.status(200).json(product)
}


const update = async (req: Request, res: Response): Promise<Response> => {
    const product = await productService.upddate(res.locals.payload, req.body)
    return res.status(200).json(product)
}

const destroy = async (req: Request, res: Response): Promise<Response> => {
    await productService.destroy(res.locals.payload)
    return res.status(204).json()
}

export default { create, read, retrive, update, destroy }