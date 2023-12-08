import { nullable, z } from "zod"

const schemaUser = z.object({
    id: z.number(),
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    isAdmin: z.boolean().default(false),
    confirmationToken: z.string().nullable(),
    accountValided: z.boolean().default(false)
})

const schemaCreateUser = schemaUser.omit({id: true})
const schemaUserUpdate = schemaCreateUser.partial()
const schemaUserOffPassword = schemaUser.omit({password: true})
const schemaUserOffPasswordAll = schemaUserOffPassword.array()

export default { schemaCreateUser, schemaUserUpdate, schemaUserOffPassword, schemaUserOffPasswordAll }