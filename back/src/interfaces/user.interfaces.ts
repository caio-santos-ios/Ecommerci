import { z } from "zod"
import userSchemas from "../schemas/user.schemas"

type TresultUserUpdate = z.infer<typeof userSchemas.schemaUserUpdate>
type TresultUserOffPassword = z.infer<typeof userSchemas.schemaUserOffPassword>

export { TresultUserUpdate, TresultUserOffPassword }