import { Router } from "express"
import productController from "../controllers/product.controller"
import { payloadExisty } from "../middlewares/payloadExisty.middleware"
import { productRepository } from "../repository"
import { validateToken } from "../middlewares/validateToken.middleware"
import { isAdmin } from "../middlewares/isAdmin.middleware"
import { upload } from "../middlewares/product/uploadPhoto.middleware"
import product from "../middlewares/product"

const productRouter = Router()

productRouter.post('', validateToken, isAdmin, upload.single('image'), product.nameProducExisty, productController.create)
productRouter.get('', productController.read)
productRouter.get('/:id', payloadExisty(productRepository, 'Produto não encontrado'), productController.retrive)
productRouter.patch('/:id', validateToken, isAdmin, payloadExisty(productRepository, 'Produto não encontrado'), product.nameProducExisty, productController.update)
productRouter.delete('/:id', validateToken, isAdmin, payloadExisty(productRepository, 'Produto não encontrado'), productController.destroy)

export default productRouter