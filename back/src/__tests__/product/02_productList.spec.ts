import request from "supertest"
import app from "../../app"
import { DataSource } from "typeorm"
import dataBaseSourse from "../../data-source"
import { myProductCreate } from "../mock/product"
import { myUserAdminCreate, myUserAdminLogin } from "../mock/user"

let tokenIsAdmin: any;

describe("Testa a listagem dos produtos", () => {
    let connection: DataSource
    
    beforeAll(async () => {
        await dataBaseSourse.initialize()
        .then((res) => (connection = res))
        .catch((err) => {
            console.error("Error during Data Source initialization", err)
        })
        
        await request(app).post("/users").send(myUserAdminCreate)

        tokenIsAdmin = await request(app).post("/users/login").send(myUserAdminLogin)

        const myToken = tokenIsAdmin.body.tokenUser

        await request(app).post("/products").send(myProductCreate).set("Authorization", `${myToken}`)
    });
    
    afterAll(async () => {
        await connection.destroy()
    });

    test("Lista todos os produtos", async () => {    
        const response = await request(app).get("/products")

		expect(response.status).toBe(200)
        expect(response.body).toEqual([{id: 1, ...myProductCreate}])
    })

    test("Busca produto por id", async () => {    
        const response = await request(app).get(`/products/${1}`)

		expect(response.status).toBe(200)
        expect(response.body).toEqual({id: 1, ...myProductCreate})
    })

    test("Busca produto que não existe", async () => {    
        const response = await request(app).get(`/products/${999}`)

		expect(response.status).toBe(404)
        expect(response.body).toEqual({"message": "Produto não encontrado"})
    })
})