import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { TcreateProduct, Tproduct } from '../../@types/product';
import { useForm } from "react-hook-form"
import Form from 'react-bootstrap/Form';
import { api } from '../../services/api';
import { toast } from 'react-toastify';

type Iprops = {
    isOpen: boolean; 
    setOpen: any;
    productUpdate: Tproduct[];
}
export const ModalUpdateProduct: React.FC<Iprops> = ({isOpen, setOpen, productUpdate}) => {
    const { register, handleSubmit } = useForm<TcreateProduct>()
    const handleClose = () => setOpen(!isOpen);
    
    const token = localStorage.getItem("@token")
    const tokenUser = token ? JSON.parse(token)?.token?.tokenUser : null

    const req = async (data: TcreateProduct) => {
        try {
            await api.patch(`products/${productUpdate[0].id}`, data, {
                headers: {
                    Authorization: tokenUser
                }
            })
            setOpen(false)
            toast.success("Produto editado", {theme: 'colored'})
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <>
            <Modal show={isOpen} onHide={handleClose}>
            <form onSubmit={handleSubmit(req)}> 
                <Modal.Header closeButton>
                    <Modal.Title>Edita produto</Modal.Title>
                </Modal.Header>
                <Modal.Body>   
                    {
                        productUpdate.length > 0 ?
                        <>
                            <Form.Label>Nome</Form.Label>
                            <Form.Control defaultValue={productUpdate[0].name} {...register('name')} type='text' />          
                            <Form.Label>Estoque</Form.Label>
                            <Form.Control defaultValue={productUpdate[0].stock} {...register('stock')} type='number' />          
                            <Form.Label>Valor</Form.Label>
                            <Form.Control defaultValue={productUpdate[0].value} {...register('value')} type='number' />                    
                        </>
                        :
                        null
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
                    <Button type='submit' variant="secondary">Salvar</Button>
                </Modal.Footer>
            </form>
            </Modal>
      </>
    )
}