import request from "supertest";
import { DataSource } from "typeorm";
import app from "../../app";
import dataBaseSourse from "../../data-source";
import { myUserAdminCreate, myUserAdminOffPassword } from "../mock/user";
import { v4 as uuidv4 } from 'uuid'

const confirmationCode = uuidv4()

describe("Testa a criação dos usuários", () => {
    let connection: DataSource;

    beforeAll(async () => {
        await dataBaseSourse.initialize()
        .then((res) => (connection = res))
        .catch((err) => console.log(err))
    })
    
    afterAll(async () => {
        await dataBaseSourse.destroy()
    })

    test("Criar usuário com sucesso", async () => {
        const response = await request(app).post("/users").send(myUserAdminCreate)

        response.body.confirmationToken = confirmationCode
        myUserAdminOffPassword.confirmationToken = confirmationCode
      
        expect(response.status).toBe(201)
        expect(response.body).toEqual({id: 1, ...myUserAdminOffPassword})
    })

    test("Criar usuário com email inválido", async () => {
        const response = await request(app).post("/users").send(myUserAdminCreate)

        expect(response.status).toBe(401)
        expect(response.body).toEqual({"message": "Email inválido"})
    })
})
