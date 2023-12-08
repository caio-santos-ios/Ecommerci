import request from "supertest";
import app from "../../app";
import { DataSource } from "typeorm";
import dataBaseSourse from "../../data-source";
import { myUserAdminCreate, myUserAdminLogin, myUserAdminOffPassword } from "../mock/user";
import { v4 as uuidv4 } from 'uuid'

const confirmationCode = uuidv4()

let tokenIsAdmin: any;

describe("Testa a listagem dos usuários", () => {
    let connection: DataSource

    beforeAll(async () => {
        await dataBaseSourse.initialize()
        .then((res) => (connection = res))
        .catch((err) => console.log(err))

        await request(app).post("/users").send(myUserAdminCreate)
        tokenIsAdmin = await request(app).post("/users/login").send(myUserAdminLogin)
    })
    
    afterAll(async () => {
        await connection.destroy()
    })

    test("Lista todos os usuários", async () => {
        const myToken = tokenIsAdmin.body.tokenUser

        const response = await request(app).get("/users").set("Authorization", `${myToken}`)

        response.body[0].confirmationToken = confirmationCode
        myUserAdminOffPassword.confirmationToken = confirmationCode

        expect(response.status).toBe(200)
        expect(response.body).toEqual([{id: 1, ...myUserAdminOffPassword}])
    })
})
