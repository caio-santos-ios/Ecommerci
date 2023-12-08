import { v4 as uuidv4 } from 'uuid'

const confirmationCode = uuidv4()

export const myUserCreate = {
    name: "nome",
    email: "nome@email.com",
    password: "123",
    isAdmin: false,
    confirmationToken: confirmationCode,
    accountValided: false
}

export const myUserAdminCreate = {
    name: "nome2",
    email: "nome2@email.com",
    password: "123",
    isAdmin: true,
    confirmationToken: confirmationCode,
    accountValided: false
}

export const myUserOffPassword = {
    name: "nome",
    email: "nome@email.com",
    isAdmin: false,
    confirmationToken: confirmationCode,
    accountValided: false
}

export const myUserAdminOffPassword = {
    name: "nome2",
    email: "nome2@email.com",
    isAdmin: true,
    confirmationToken: confirmationCode,
    accountValided: false
}

export const myUserUpdate = {
    name: "Novo nome",
    email: "nome@email.com",
    isAdmin: false,
    confirmationToken: confirmationCode,
    accountValided: false
}

export const myUserLogin = {
    email: "nome@email.com",
    password: "123"
}

export const myUserAdminLogin = {
    email: "nome2@email.com",
    password: "123"
}

export const myTokenLogin = {
    id: 1,
    name: 'nome',
    isAdmin: false
}

export const myUserLoginInvalited = {
    email: "nome2@email.com",
    password: "456"
}

export const myUserLoginPasswordInvalited = {
    email: "nome@email.com",
    password: "456"
}