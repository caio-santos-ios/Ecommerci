import { useRef, useState } from "react"
import { BiArrowBack } from 'react-icons/bi'
import { MdAddchart } from 'react-icons/md'
import Button from 'react-bootstrap/Button'
import { useNavigate } from "react-router-dom"
import { StyleHeader } from "../Header/style"
import { ModalAddProduct } from "../ModalAddProduct"


export const HeaderAdmin = () => {
    const [open, setOpen] = useState(false)
    const target = useRef(null)
    const navegation = useNavigate()

    return(
        <StyleHeader>
            <h4>Ecommerce</h4>
            <ModalAddProduct isOpen={open} setOpen={setOpen} />
            <Button variant="primary" ref={target} onClick={() => setOpen(true)}>
                <MdAddchart size={30} />
            </Button>
            <Button variant="primary" ref={target} onClick={() => navegation("/")}>
                <BiArrowBack size={30} />
            </Button>
        </StyleHeader>
    )
}
