import { Request, Response } from "express"
import sessionService from "../services/session.service"


const login = async (req: Request, res: Response): Promise<Response> => {
    const token = await sessionService.login(req.body)
    return res.status(201).json(token)
}

export default { login }