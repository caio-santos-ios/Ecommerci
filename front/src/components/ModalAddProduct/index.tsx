import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useForm } from "react-hook-form"
import { TcreateProduct } from '../../@types/product';
import { toast } from 'react-toastify';
import Form from 'react-bootstrap/Form';
import { api } from '../../services/api';
import { useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
// import { useAtom } from 'jotai';
// import { listProducts } from '../../Jotai/products';

type Iprops = {
    isOpen: boolean; 
    setOpen: any;
}

export const ModalAddProduct: React.FC<Iprops> = ({isOpen, setOpen}) => {
    // const [products, setProducts] = useAtom(listProducts)
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [finishReq, setFinishReq] = useState(false)
    const { register, handleSubmit, reset } = useForm<TcreateProduct>()
    
    const handleClose = () => setOpen(!isOpen)
    
    const token = localStorage.getItem("@token")
    const tokenUser = token ? JSON.parse(token)?.token?.tokenUser : null
    
    const req = async (data: TcreateProduct) => {
        setFinishReq(true)
        try {
            const formData = new FormData();
            
            if (selectedFile) {
                formData.append('image', selectedFile);
            }

            formData.append('name', data.name);
            formData.append('value', data.value.toString());
            formData.append('stock', data.stock.toString());

            await api.post('products', formData, {
                headers: {
                    Authorization: tokenUser
                }
            })
            //setProducts([...products, res.data])
            toast.success("Produto criado!", {theme: 'colored'})
            setFinishReq(false)
            setOpen(!isOpen)
            reset()
        } catch (error) {
            setFinishReq(false)
            toast.error("Produto não foi criado!", {theme: 'colored'})
        }
    }
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        setSelectedFile(file);
    }

    return(
        <>
            <Modal show={isOpen} onHide={handleClose}>
                <form onSubmit={handleSubmit(req)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Label>Nome</Form.Label>
                        <Form.Control {...register('name')} type="text" />

                        <Form.Label>Valor</Form.Label>
                        <Form.Control {...register('value')} type="number" />

                        <Form.Label>Estoque</Form.Label>
                        <Form.Control {...register('stock')} type="number" />

                        <Form.Label>Foto</Form.Label>
                        <Form.Control {...register('image')} type="file" name="image" onChange={handleFileChange} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
                        {
                            finishReq ? 
                            <Button disabled variant="secondary">
                                <Spinner animation="border" role="status">
                                    <span className="visually-hidden">Criando...</span>
                                </Spinner>  
                            </Button>
                            :
                            <Button type='submit' variant="secondary">Salvar</Button>
                        }
                    </Modal.Footer>
                </form>
            </Modal>
      </>
    )
}