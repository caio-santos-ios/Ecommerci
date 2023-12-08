import React, { ReactNode } from "react"
import { StyleSectionGeneric } from "./style"

type Iprops = {
    children: ReactNode;
    typeSection: string | null;
}

export const SectionGeneric: React.FC<Iprops> = ({children, typeSection}) => {
    return <StyleSectionGeneric typeSection={typeSection}>{children}</StyleSectionGeneric>
}