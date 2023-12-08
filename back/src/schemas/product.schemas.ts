import { z } from "zod"

const schemaProduct = z.object({
    id: z.number(),
    name: z.string(),
    value: z.string(),
    stock: z.number().positive().default(100)
})

const schemaCreateProduct = schemaProduct.omit({id: true})
const schemaProductUpdate = schemaCreateProduct.partial()

export default { schemaCreateProduct, schemaProductUpdate }