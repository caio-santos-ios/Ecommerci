import { Request, Response, NextFunction } from "express"
import { userRepository } from "../../repository"
import { AppError } from "../../error"
import nodemailer from 'nodemailer'
import { v4 as uuidv4 } from 'uuid'


export const confirmationAccount = async (req: Request, res: Response, nex: NextFunction) => {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD_EMAIL, 
        },
    })

    const confirmationToken = uuidv4()

    const mailOptions = {
        from: process.env.EMAIL,
        to: req.body.email,
        subject: 'Confirme sua conta',
        text: `Condigo de confirmação: ${confirmationToken}`,
    }

    await transporter.sendMail(mailOptions)

    res.locals.code = confirmationToken
    
    return nex()
}

