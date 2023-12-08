import React, { useEffect, useState } from "react"
import { Tproduct } from "../../@types/product"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Placeholder from 'react-bootstrap/Placeholder';
import { api } from "../../services/api";
import { useAtom } from "jotai";
import { listProducts } from "../../Jotai/products";
import { listCart } from "../../Jotai/cart";
import { StyleCardProduct } from "./style"

type Iprops = Tproduct

export const CardProduct: React.FC<Iprops> = ({id, image, name, value }) => {
    const [loading, setLoading] = useState(true)
    const [products] = useAtom(listProducts)
    const [cart, setCart] = useAtom(listCart)

    useEffect(() => {
        const req = async () => {
            try {
                await api.get('products')
                setLoading(false)
            } catch (error) {
                console.log(error)
            }
        }
        req()
    }, [])

    const addProduct = (id: string) => {
        const product: Tproduct[] = products.filter((product: Tproduct) => product.id === Number(id))
        
        if (!product) return
        
        const existingProductIndex: number = cart.findIndex((myProduct: Tproduct) => myProduct.id === product[0].id)
        
        if(existingProductIndex === -1){
            const newProduct = {...product[0], qtd: 1, valueTotal: product[0].value}
            const newCart = [...cart, newProduct]
            setCart(newCart)   
            localStorage.setItem("@cart", JSON.stringify(newCart))
        }
        
        if(existingProductIndex >= 0){
            const updatedCart = [...cart]
            updatedCart[existingProductIndex].qtd += 1
            setCart(updatedCart)
            localStorage.setItem("@cart", JSON.stringify(updatedCart))
        }
    }
    return(
        <div>
            {
                loading ?
                <Card style={{ width: '15rem'}}>
                    <Card.Img variant="top" src="holder.js/100px180" />
                    <Card.Body>
                        <Placeholder as={Card.Title} animation="glow">
                            <Placeholder xs={6} />
                        </Placeholder>      
                        <Placeholder as={Card.Title} animation="glow">
                            <Placeholder xs={6} />
                        </Placeholder>                  
                        <Placeholder.Button variant="primary" xs={6} />
                    </Card.Body>
                </Card>
                :
                <StyleCardProduct>
                    <img src={image} alt="foto-do-produto" />
                    <div>
                        <p>{name}</p>
                        <span>{
                            value.toLocaleString('pt-BR', {
                                style: 'currency',
                                currency: 'BRL',
                            })
                        }</span>
                    </div>
                    <Button className="btn_add" id={String(id)} onClick={(e) => addProduct(e.currentTarget.id)} variant="primary">Adicionar</Button>
                </StyleCardProduct>
            }
        </div>
    )
}
