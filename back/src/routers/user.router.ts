import userController from "../controllers/user.controller"
import sessionController from "../controllers/session.controller"
import { Router } from "express"
import { payloadExisty } from "../middlewares/payloadExisty.middleware"
import { userRepository } from "../repository"
import { validateBody } from "../middlewares/validateBody.middleware"
import { validateToken } from "../middlewares/validateToken.middleware"
import userSchemas from "../schemas/user.schemas"
import user from "../middlewares/user"
import { isAdmin } from "../middlewares/isAdmin.middleware"
import { confirmationAccount } from "../middlewares/user/confirmationAccount.middleware"
import { verifyAccount } from "../middlewares/user/verifyAccount.middleware"
import { emailExisty } from "../middlewares/user/emailExisty.middleware"

const userRouter = Router()

userRouter.post('/login', sessionController.login)

userRouter.post('', user.emailExisty, validateBody(userSchemas.schemaCreateUser), confirmationAccount, userController.create)
userRouter.get('', validateToken, userController.read)
userRouter.get('/:id', validateToken, payloadExisty(userRepository, 'usuário não encontrado'), userController.retrive)
userRouter.patch('/confirmation', emailExisty, verifyAccount, userController.confirmationAccount)
userRouter.patch('/:id', validateToken, isAdmin, payloadExisty(userRepository, 'usuário não encontrado'), userController.update)
userRouter.delete('/:id', validateToken, isAdmin, payloadExisty(userRepository, 'usuário não encontrado'), userController.destroy)


export default userRouter