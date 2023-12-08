import { atom } from 'jotai'

const cartFromLocalStorage: null | string = localStorage.getItem("@cart")
const initialCart: [] | any = cartFromLocalStorage ? JSON.parse(cartFromLocalStorage) : []
export const listCart = atom(initialCart)
