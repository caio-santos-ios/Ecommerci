import { useState } from "react"
import { Login } from "../components/Login"
import { Button } from "react-bootstrap"
import { Register } from "../components/Register"
import { useNavigate } from "react-router-dom"
import { SectionGeneric } from "../components/SectionGeneric"

const LoginPage = () => {
    const [display, setDisplay] = useState("Cadastrar-se")
    const navegation = useNavigate()

    const toChange = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if(e.currentTarget.value === 'Login') setDisplay('Cadastrar-se')

        if(e.currentTarget.value === 'Cadastrar-se') setDisplay('Login')
    }
    
    return(
        <>
            <main>
                <SectionGeneric typeSection='display_login'>
                    <div>
                        <Button value={display} variant="primary" onClick={() => navegation('/')}>Voltar</Button>
                        <Button value={display} variant="warning" onClick={(e) => toChange(e)}>{display}</Button>
                    </div>
                    {
                    display == 'Cadastrar-se' ?
                        <Login /> 
                    :
                        <Register />
                    }
                </SectionGeneric>
            </main>
        </>
    )
}

export default LoginPage