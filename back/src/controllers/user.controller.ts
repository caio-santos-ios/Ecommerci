import { Request, Response } from "express"
import userServices from "../services/user.service"


const create = async (req: Request, res: Response): Promise<Response> => {
    const user = await userServices.create(req.body, res.locals.code)
    return res.status(201).json(user)
}

const read = async (req: Request, res: Response): Promise<Response> => {
    const users = await userServices.read()
    return res.status(200).json(users)
}

const retrive = async (req: Request, res: Response): Promise<Response> => {
    const user = await userServices.retrive(res.locals.user)
    return res.status(200).json(user)
}

const update = async (req: Request, res: Response): Promise<Response> => {
    const user = await userServices.upddate(res.locals.payload, req.body)
    return res.status(200).json(user)
}

const confirmationAccount = async (req: Request, res: Response): Promise<Response> => {
    await userServices.confirmationAccount(res.locals.user)
    return res.status(200).json()
}

const destroy = async (req: Request, res: Response): Promise<Response> => {
    await userServices.destroy(res.locals.payload)
    return res.status(204).json()
}

export default { create, read, retrive, update, destroy, confirmationAccount }