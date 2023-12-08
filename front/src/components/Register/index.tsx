import Form from 'react-bootstrap/Form'
import { Button } from 'react-bootstrap'
import { useForm, SubmitHandler } from "react-hook-form"
import { api } from '../../services/api'
import { TuserRegister } from '../../@types/user'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { FormGeneric } from '../FormGeneric'
import { useState } from 'react'
import Spinner from 'react-bootstrap/Spinner';


export const Register = () => {
    const [loading, setLoading] = useState(false)
    const navegation = useNavigate()
    const { register, handleSubmit } = useForm<TuserRegister>()

    const req: SubmitHandler<TuserRegister> = async (data: TuserRegister) => {
        setLoading(true)
        
        try {
            await api.post('users', data)
            setLoading(false)
            localStorage.setItem("@email", JSON.stringify(data.email))
            toast.success("Conta criada", {theme: 'colored'})
            navegation('/confirmar')         
        } catch (error) {
            toast.error("Conta não criada", {theme: 'colored'})
            setLoading(false)
        }
    }

    return(
        <FormGeneric typeForm="display_login" onSubmit={handleSubmit(req)}>
            <div>
                <Form.Label>Usuário</Form.Label>
                <Form.Control {...register('name')} type="text" />
            </div>

            <div>
                <Form.Label>Email</Form.Label>
                <Form.Control {...register('email')} type="email" />
            </div>

            <div>
                <Form.Label>Password</Form.Label>
                <Form.Control {...register('password')} type="password" />
            </div>
            {
                loading ?
                <Button type='submit' variant="primary">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </Button>
                :
                <Button style={{height: '3.2rem'}} type='submit' variant="primary">Criar</Button>
            }

        </FormGeneric>

    )
}