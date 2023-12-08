import User from "../entities/user.entity"
import { TresultUserOffPassword, TresultUserUpdate } from "../interfaces/user.interfaces"
import { userRepository } from "../repository"
import userSchemas from "../schemas/user.schemas"


const create = async (user: User, codeConfirmation: string): Promise<any> => {
    const dataUser = {
        ...user,
        confirmationToken: codeConfirmation
    }

    const userCreate = userRepository.create(dataUser)
    
    await userRepository.save(userCreate)

    return userSchemas.schemaUserOffPassword.parse(userCreate)
}

const read = async (): Promise<TresultUserOffPassword[]> => {  
    const users = await userRepository.find()
    return userSchemas.schemaUserOffPasswordAll.parse(users)
}

const retrive = async (id: any): Promise<any> => {  
    const user = await userRepository.findOneBy({
        id
    })
    
    return userSchemas.schemaUserOffPassword.parse(user)
}

const upddate = async (user: any, userUpdate: any): Promise<TresultUserUpdate> => {
    const userUp = await userRepository.save({...user, ...userUpdate})
    return userSchemas.schemaUserOffPassword.parse(userUp)
}

const confirmationAccount = async (user: User): Promise<boolean> => {
    await userRepository.save({...user})
    return true
}

const destroy = async (user: any): Promise<void> => {
    await userRepository.delete(user)
}

export default { create, read, retrive, upddate, destroy, confirmationAccount }