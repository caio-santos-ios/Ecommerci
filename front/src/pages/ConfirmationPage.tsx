import Form from 'react-bootstrap/Form'
import { SectionGeneric } from "../components/SectionGeneric"
import { Button } from "react-bootstrap"
import { FormGeneric } from '../components/FormGeneric'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
 import { api } from '../services/api'
import { toast } from 'react-toastify'

const ConfirmationPage = () => {
    const emailFromLocalStorage: null | string = localStorage.getItem("@email")
    const initialEmail: string | any = emailFromLocalStorage ? JSON.parse(emailFromLocalStorage) : null
    const navegation = useNavigate()
    const { register, handleSubmit } = useForm()
    const req: SubmitHandler<any> = async ({ confirmationToken }: any) => {
        const data = {
            email: initialEmail,
            confirmationCode: confirmationToken
        }
        console.log(data)
        try {
            await api.patch("users/confirmation", data)
            toast.success("Conta ativada", {theme: 'colored'})
            navegation('/login')         
        } catch (error: any) {
            toast.error(error.response.data.message, {theme: 'colored'})
        }
    }

    return(
        <>
            <main>
                <SectionGeneric typeSection="display_confirmation">
                    <FormGeneric onSubmit={handleSubmit(req)} typeForm="display_confirmation">
                        <div>
                            <Form.Label>Codigo de Confirmação</Form.Label>
                            <Form.Control {...register('confirmationToken')} type="text" />
                        </div>
                        <Button type='submit' variant="primary">Confirmar</Button>
                        <Button onClick={() => navegation('/login')} type='button' variant="primary">Voltar</Button>
                    </FormGeneric>
                </SectionGeneric>
            </main>
        </>
    )
}

export default ConfirmationPage