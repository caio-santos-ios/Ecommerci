import { useEffect, useState } from "react"
import { StyleListStock } from "./style"
import { useAtom } from "jotai"
import { listProducts } from "../../Jotai/products"
import Table from 'react-bootstrap/Table'
import { api } from "../../services/api"
import { Button } from "react-bootstrap"
import { Tproduct } from "../../@types/product"
import { ModalUpdateProduct } from "../ModalUpdateProduct"
import { ModalDeleteProduct } from "../ModalUpdateProduct copy"

export const ListStock = () => {
    const [products, setProducts] = useAtom(listProducts)
    const [isOpenUpdate, setIsOpenUpdate] = useState(false)
    const [isOpenDestroy, setIsOpenDestroy] = useState(false)
    const [productUpdate, setProductUpdate] = useState([])

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

    const view = (id: string) => {
        console.log(id)
    }

    const distroy = (id: string) => {
        const updateProduct = products.filter((product: Tproduct) => product.id == Number(id))
        setIsOpenDestroy(true)
        setProductUpdate(updateProduct)
    }

    const update = (id: string) => {
        const updateProduct = products.filter((product: Tproduct) => product.id == Number(id))
        setIsOpenUpdate(true)
        setProductUpdate(updateProduct)
    }

    return(
        <StyleListStock>
            <ModalUpdateProduct setOpen={setIsOpenUpdate} isOpen={isOpenUpdate} productUpdate={productUpdate}  />
            <ModalDeleteProduct setOpen={setIsOpenDestroy} isOpen={isOpenDestroy} productDestroy={productUpdate}  />
            {
            products.length > 0 ?
                <Table responsive>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nome</th>
                            <th>Valor</th>
                            <th>Estoque</th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map((product: Tproduct) => {
                                return(
                                    <tr key={product.id}>
                                        <td>{product.id}</td> 
                                        <td>{product.name}</td> 
                                        <td>{product.value}</td> 
                                        <td>{product.stock}</td> 
                                        <td>
                                            <Button id={String(product.id)} onClick={(e) => view(e.currentTarget.id)} variant="secondary">ver</Button>
                                        </td>
                                        <td>
                                            <Button id={String(product.id)} onClick={(e) => update(e.currentTarget.id)} variant="secondary">editar</Button>
                                        </td>
                                        <td>
                                            <Button id={String(product.id)} onClick={(e) => distroy(e.currentTarget.id)} variant="secondary">deletar</Button>
                                        </td>
                                    </tr>
                                ) 
                            })
                        }
                    </tbody>
                </Table>
                :
                <div>
                    <h2>Sem produtos no estoque</h2>
                </div>
                }
        </StyleListStock>

    )
}