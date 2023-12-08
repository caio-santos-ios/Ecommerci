import { useAtom } from "jotai"
import { listProducts } from "../Jotai/products"
import { useEffect } from "react"
import { api } from "../services/api"
import { Header } from "../components/Header/Header"
import { ListProducts } from "../components/ListProducts"
import { Tproduct } from "../@types/product"
import { CardProduct } from "../components/Card"
import { SectionGeneric } from "../components/SectionGeneric"

const HomePage = () => {
    const [products, setProducts] = useAtom(listProducts)

    useEffect(() => {
        const req = async () => {
            try {
                const res = await api.get('products')
                setProducts(res.data.products)
            } catch (error) {
                console.log(error)
            }
        } 
        req()
    }, [])

    return(
        <>
            <Header />
            <main>
                { products.length > 0 ?
                        <ListProducts>
                        {
                            products.map((product: Tproduct) => {
                                return <CardProduct key={product.id} id={product.id} image={product.image} name={product.name} value={product.value} stock={product.stock} qtd={product.qtd} valueTotal={product.valueTotal} />
                            })
                        }
                        </ListProducts>
                        :
                        <SectionGeneric typeSection='display_home'>
                            <h1>Sem Produtos na loja</h1>
                        </ SectionGeneric>
                }
            </main>
        </>
    )
}

export default HomePage