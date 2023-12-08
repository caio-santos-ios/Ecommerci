import React from "react"
import { Tproduct } from "../../@types/product"
import { StyleCardProductCart } from "./style"
import { AiFillDelete } from 'react-icons/ai'
import { RiAddLine } from 'react-icons/ri'
import { IoIosRemove } from 'react-icons/io'
import { useAtom } from "jotai"
import { listCart } from "../../Jotai/cart"
import { Button } from "react-bootstrap"

type Iprops = Tproduct

export const CardProductCart: React.FC<Iprops> = ({id, name, qtd, valueTotal}) => {
    const [cart, setCart] = useAtom(listCart)

    const removeProduct = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      const myId = e.currentTarget.id
      const myProduct: Tproduct = cart.find((product: Tproduct) => product.id == Number(myId))

      if(e.currentTarget.value === 'delete'){
        const newCart = cart.filter((product: Tproduct) => product.id != Number(myId))
        localStorage.setItem("@cart", JSON.stringify(newCart))
        return setCart(newCart)
      }

      if(e.currentTarget.value === 'remove'){
        if(myProduct.qtd <= 1) {
        const removedProduct = cart.filter((product: Tproduct) => product.id != myProduct.id)
        localStorage.setItem("@cart", JSON.stringify(removedProduct))
        return setCart(removedProduct)
        }

        const indexProduct: number = cart.findIndex((product: Tproduct) => product.id == Number(id))
        cart[indexProduct].qtd -= 1

        cart[indexProduct].valueTotal = cart[indexProduct].qtd * cart[indexProduct].value

        const newCart = [...cart]
        localStorage.setItem("@cart", JSON.stringify(newCart))
        setCart(newCart)
      }

      if(e.currentTarget.value === 'add'){
        const indexProduct: number = cart.findIndex((product: Tproduct) => product.id == Number(id))
        cart[indexProduct].qtd += 1

        cart[indexProduct].valueTotal = cart[indexProduct].qtd * cart[indexProduct].value

        const newCart = [...cart]
        localStorage.setItem("@cart", JSON.stringify(newCart))
        setCart(newCart)
      }
    }
    return(
        <StyleCardProductCart key={id} id={String(id)}>
            <span className="name">{name}</span>
            <Button variant="secondary" value='delete' id={String(id)} onClick={(e) => removeProduct(e)}>         
                <AiFillDelete size={25}/>
            </Button>

            <span className="value">
                    {valueTotal.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                    })}
            </span>
            <Button variant="secondary" value='add' id={String(id)} onClick={(e) => removeProduct(e)}>
              <RiAddLine />              
            </Button>
            <span>{qtd}</span>
            <Button variant="secondary" value='remove' id={String(id)} onClick={(e) => removeProduct(e)}>
              <IoIosRemove />
            </Button>
        </StyleCardProductCart>
    )
}