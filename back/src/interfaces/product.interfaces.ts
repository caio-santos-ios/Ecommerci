import { z } from "zod"
import productSchemas from "../schemas/product.schemas"

type TresultProductUpdate = z.infer<typeof productSchemas.schemaProductUpdate>
type TproductUpdate = z.infer<typeof productSchemas.schemaProductUpdate>

export { TresultProductUpdate, TproductUpdate }