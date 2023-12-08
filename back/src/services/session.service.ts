import { sign } from "jsonwebtoken"
import { AppError } from "../error"
import { userRepository } from "../repository"
import { compareSync } from "bcryptjs"

const login = async (dataLogin: any): Promise<any> => {
    const user = await userRepository.findOneBy({
        email: dataLogin.email
    })
    
    if(!user) throw new AppError('Dados inválidos', 401)
    
    const validatedPassword = compareSync(dataLogin.password, user.password)
    
    if(!validatedPassword) throw new AppError('Dados inválidos', 401)
    
    const token = sign({ email: user.email, admin: user.isAdmin }, process.env.SECRET_KEY!, { subject: user.id.toString(), expiresIn: process.env.EXPIRES_IN })
    
    const userReturn = {
        tokenUser: token,
        id: user.id,
        name: user.name,
        isAdmin: user.isAdmin
    }
    
    return userReturn
}

export default { login }