import React, { ReactNode } from "react"
import { StyleFormGeneric } from "./style"

type Iprops = {
    children: ReactNode;
    typeForm: string | null;
    onSubmit?: React.FormEventHandler<HTMLFormElement> | undefined
}

export const FormGeneric: React.FC<Iprops> = ({children, typeForm, onSubmit}) => {
    return <StyleFormGeneric onSubmit={onSubmit} typeForm={typeForm}>{children}</StyleFormGeneric>
}