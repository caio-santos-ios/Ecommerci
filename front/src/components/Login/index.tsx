import Form from 'react-bootstrap/Form'
import { Button } from 'react-bootstrap'
import { useForm, SubmitHandler } from "react-hook-form"
import { api } from '../../services/api'
import { useAtom } from 'jotai'
import { userLoggind, userToken } from '../../Jotai/user'
import { TuserLogin } from '../../@types/user'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FormGeneric } from '../FormGeneric'
import { useState } from 'react'
import Spinner from 'react-bootstrap/Spinner';

export const Login = () => {
    const [loading, setLoading] = useState(false)
    const [token, setToken] = useAtom(userToken)
    token
    const [loggind, setLodding] = useAtom(userLoggind)
    const { register, handleSubmit } = useForm<TuserLogin>()
    const navegation = useNavigate()
    
    const req: SubmitHandler<TuserLogin> = async (data: TuserLogin) => {
        setLoading(true)
        if(!data.email || !data.password) return toast.error('Preencha todos os campos', { theme: "colored" })

        try {
            const res = await api.post('users/login', data)
            setLoading(false)
            setToken(res.data)
            setLodding(!loggind)
            localStorage.setItem("@token", JSON.stringify(res.data))
            localStorage.removeItem("@cart")
            navegation("/")
        } catch (error: any) {
            setLoading(false)
            toast.error(error.response.data.message, { theme: "colored" })
        }
    }

    return(
        <FormGeneric onSubmit={handleSubmit(req)} typeForm="display_login">
            <div>
                <Form.Label>Email</Form.Label>
                <Form.Control {...register('email')} type="text" />
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
                <Button style={{height: '3.2rem'}} type='submit' variant="primary">Entrar</Button>
            }
        </FormGeneric>
    )
}
