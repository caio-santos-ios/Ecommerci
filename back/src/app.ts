import "express-async-errors"
import 'reflect-metadata'
import "dotenv/config"
import express, { json } from "express"
import cors from "cors"
import userRouter from "./routers/user.router"
import productRouter from "./routers/product.router"
import handleErrorMiddleware from "./middlewares/handleErro.middleware"

const app = express()

app.use(json())
app.use(cors())

app.use("/users", userRouter)
app.use("/products", productRouter)
app.use(handleErrorMiddleware)

export default app