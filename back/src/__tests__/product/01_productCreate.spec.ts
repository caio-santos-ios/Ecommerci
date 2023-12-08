import request from "supertest"
import app from "../../app"
import { DataSource } from "typeorm"
import dataBaseSourse from "../../data-source"
import { myProductCreate } from "../mock/product"
import { myTokenLogin, myUserAdminCreate, myUserAdminLogin, myUserCreate, myUserLogin } from "../mock/user"

let token: any;
let tokenIsAdmin: any;

describe("Testa a criação dos produtos", () => {
    let connection: DataSource

    beforeAll(async () => {
        await dataBaseSourse.initialize()
        .then((res) => (connection = res))
        .catch((err) => {
            console.error("Error during Data Source initialization", err)
        })
        
        await request(app).post("/users").send(myUserCreate)
        await request(app).post("/users").send(myUserAdminCreate)

        token = await request(app).post("/users/login").send(myUserLogin)
        tokenIsAdmin = await request(app).post("/users/login").send(myUserAdminLogin)
    })

    afterAll(async () => {
        await connection.destroy();
    })

    test("Criação de produto com sucesso", async () => {  
        const myTokenIsAdmin = tokenIsAdmin.body.tokenUser

        const response = await request(app).post("/products").set("Authorization", `${myTokenIsAdmin}`).send(myProductCreate)

        expect(response.status).toBe(201)
        expect(response.body).toEqual({id: 1, ...myProductCreate})
    })

    test("Criação de produto com erro de admin", async () => {  
        const myToken = token.body.tokenUser

        const response = await request(app).post("/products").set("Authorization", `${myToken}`).send(myProductCreate)

        expect(response.status).toBe(401)
        expect(response.body).toEqual({"message": "Não autorizado"})
    })

    test("Criação de produto sem token", async () => {    
        const myToken = ""

        const response = await request(app).post("/products").set("Authorization", `${myToken}`).send(myProductCreate)
        
        expect(response.status).toBe(401)
        expect(response.body).toEqual({"message":"Missing Authorization Token"})   
    })
    
    test("Criação de produto com nome repetido", async () => {    
        const myTokenIsAdmin = tokenIsAdmin.body.tokenUser

        const response = await request(app).post("/products").set("Authorization", `${myTokenIsAdmin}`).send(myProductCreate)

		expect(response.status).toBe(401)
        expect(response.body).toEqual({"message": "Produto já cadastrado"})   
    })

})
