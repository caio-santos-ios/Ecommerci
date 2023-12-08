import React from "react"
import { StyleListProduct } from "./style"

type Iprops = {
    children: any
}

export const ListProducts: React.FC<Iprops> = ({children}) => {
    return(
        <StyleListProduct>
            {children}
        </StyleListProduct>
    )
}