import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { TcreateProduct, Tproduct } from '../../@types/product';
import { useForm } from "react-hook-form"
import Form from 'react-bootstrap/Form';
import { api } from '../../services/api';
import { toast } from 'react-toastify';
import { useAtom } from 'jotai';
import { listProducts } from '../../Jotai/products';

type Iprops = {
    isOpen: boolean; 
    setOpen: any;
    productDestroy: any[];
}
export const ModalDeleteProduct: React.FC<Iprops> = ({isOpen, setOpen, productDestroy}) => {
    const [products, setProducts] = useAtom(listProducts) 
    const { handleSubmit  } = useForm<TcreateProduct>()
    
    const token = localStorage.getItem("@token")
    const tokenUser = token ? JSON.parse(token)?.token?.tokenUser : null;
    
    const handleClose = () => setOpen(!isOpen)
    
    const req = async () => {
        const newList = products.filter((product: Tproduct) => product.id !== productDestroy[0].id)

        try {
            await api.delete(`products/${productDestroy[0].id}`, {
                headers: {
                    Authorization: tokenUser
                }
            })
            setOpen(false)
            setProducts(newList)
            toast.success("Produto deletado", {theme: 'colored'})
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <>
            <Modal show={isOpen} onHide={handleClose}>
                <Form onSubmit={handleSubmit(req)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Deletar Produto</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>   
                        <p>Deleja delatar o produto</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
                        <Button type='submit' variant="secondary">Confirmar</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
      </>
    )
}