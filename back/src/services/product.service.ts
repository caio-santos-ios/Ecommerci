import Product from "../entities/product.entity"
import { TresultProductUpdate } from "../interfaces/product.interfaces"
import { productRepository } from "../repository"

const create = async (product: Product): Promise<Product> => {
    const productCreate = productRepository.create(product)
    await productRepository.save(productCreate)
    return productCreate
}

const read = async (): Promise<Product[]> => {
    const products = await productRepository.find()
   
    return products
}

const retrive = async (id: string): Promise<Product | null> => {
    const product = await productRepository.findOneBy({
        id: Number(id)
    })
   
    return product
}

const upddate = async (product: Product, productUpdate: any): Promise<TresultProductUpdate> => {
    const productUp = await productRepository.save({...product, ...productUpdate})
   
    return productUp
}

const destroy = async (product: any): Promise<void> => {
    await productRepository.delete(product)
}

export default { create, read, retrive, upddate, destroy }