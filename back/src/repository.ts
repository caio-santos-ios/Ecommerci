import dataBaseSourse from "./data-source"
import Product from "./entities/product.entity"
import User from "./entities/user.entity"


export const userRepository = dataBaseSourse.getRepository(User)
export const productRepository = dataBaseSourse.getRepository(Product)