import { atom } from 'jotai'

const tokenFromLocalStorage: null | string = localStorage.getItem("@token")

const initialToken: [] | any = tokenFromLocalStorage ? JSON.parse(tokenFromLocalStorage) : null
const initialLoggind: boolean = tokenFromLocalStorage ? true : false

export const userToken = atom(initialToken)
export const userLoggind = atom(initialLoggind)
