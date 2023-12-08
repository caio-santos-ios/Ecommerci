import request from "supertest";
import app from "../../app";
import { DataSource } from "typeorm";
import dataBaseSourse from "../../data-source";
import { myTokenLogin, myUserCreate, myUserLogin, myUserLoginInvalited, myUserLoginPasswordInvalited } from "../mock/user";

describe("Testa o login", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await dataBaseSourse.initialize()
    .then((res) => (connection = res))
    .catch((err) => console.log(err))
    
    await request(app).post("/users").send(myUserCreate)
  })
  
  afterAll(async () => {
    await connection.destroy()
  })
  
  test("Login do usuário com sucesso", async () => {
      const response = await request(app).post("/users/login").send(myUserLogin)

      expect(response.status).toBe(201)
      expect(response.body).toEqual({tokenUser: response.body.tokenUser, ...myTokenLogin})
  })

  test("Login do usuário com email e senha inválidos", async () => {
      const response = await request(app).post("/users/login").send(myUserLoginInvalited)
      
      expect(response.status).toBe(401)
      expect(response.body).toEqual({"message": "Dados inválidos"})
  })

  test("Login do usuário com a senha inválida", async () => {
    const response = await request(app).post("/users/login").send(myUserLoginPasswordInvalited)
    
    expect(response.status).toBe(401)
    expect(response.body).toEqual({"message": "Dados inválidos"})
  })
})
