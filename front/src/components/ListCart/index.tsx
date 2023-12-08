import { useAtom } from "jotai"
import { Tproduct } from "../../@types/product"
import { CardProductCart } from "../CardProductCart"
import { StyleListCart } from "./style"
import { listCart } from "../../Jotai/cart"
import { Button } from "react-bootstrap"

type Iprops = {
    list: Tproduct[]
}

export const ListCart: React.FC<Iprops> = ({list}) => {
    const [cart] = useAtom(listCart)

    const total = cart.reduce((currentValue: any, product: any) => currentValue + Number(product.valueTotal), 0)
    
    const finishCart = () => {
        console.log("Compras finalizada")
    }

    return(
        <StyleListCart>
            <div className="list_cart">
            {
                list.length > 0 ? 
                list.map(product => {
                    return (
                        <>
                            <CardProductCart key={product.id} id={product.id} image={product.image} name={product.name} value={product.value} stock={product.stock} qtd={product.qtd} valueTotal={product.valueTotal}/>
                        </>
                    )
                })
                :
                <h4>Carrinho esta vazio</h4>
            }
            </div>
            <div className="container_finish">
                <h6>Total</h6>
                <h6>
                    {total.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                    })}
                </h6>
                {
                    list.length > 0 ? 
                    <Button variant="secondary" onClick={() => finishCart()}>
                        Finalizar compras
                    </Button>
                    :
                    <Button disabled variant="secondary" onClick={() => finishCart()}>
                        Finalizar compras
                    </Button>
                }
            </div>
        </StyleListCart>
    )
}