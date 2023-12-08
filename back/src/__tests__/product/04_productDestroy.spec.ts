import { DataSource } from "typeorm"
import dataBaseSourse from "../../data-source"
import app from "../../app"
import request from "supertest"
import { myUserAdminCreate, myUserAdminLogin, myUserCreate, myUserLogin } from "../mock/user"
import { myProductCreate } from "../mock/product"

let token: any;
let tokenIsAdmin: any;

describe("Testa a deleção dos produtos", () => {
    let connection: DataSource

    beforeAll( async () => {
        await dataBaseSourse.initialize()
        .then((res) => (connection = res))
        .catch((err) => console.log(err))

        await request(app).post("/users").send(myUserAdminCreate)
        await request(app).post("/users").send(myUserCreate)

        tokenIsAdmin = await request(app).post("/users/login").send(myUserAdminLogin)
        token = await request(app).post("/users/login").send(myUserLogin)
        
        const myToken = tokenIsAdmin.body.tokenUser

        await request(app).post("/products").set("Authorization", `${myToken}`).send(myProductCreate)
    })

    afterAll(async () => {
        await connection.destroy()
    })

    test("Deleção do produto com sucesso", async () => {
        const myToken = tokenIsAdmin.body.tokenUser

        const response = await request(app).delete(`/products/${1}`).set("Authorization", `${myToken}`)

        expect(response.status).toBe(204)
    })

    test("Usuário não admin", async () => {
        const myToken = token.body.tokenUser

        const response = await request(app).delete(`/products/${1}`).set("Authorization", `${myToken}`)

        expect(response.status).toBe(401)
        expect(response.body).toEqual({"message":"Não autorizado"})
    })

    test("Usuário sem token", async () => {
        const myToken = ""

        const response = await request(app).delete(`/products/${1}`).set("Authorization", `${myToken}`)

        expect(response.status).toBe(401)
        expect(response.body).toEqual({"message":"Missing Authorization Token"})
    })

    test("Deleção do produto que não existe", async () => {
        const myToken = tokenIsAdmin.body.tokenUser

        const response = await request(app).delete(`/products/${999}`).set("Authorization", `${myToken}`)

        expect(response.status).toBe(404)
        expect(response.body).toEqual({"message": "Produto não encontrado"})
    })
})