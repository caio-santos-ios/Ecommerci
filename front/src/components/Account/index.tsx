import { StyleAccount } from "./style"
import { ImExit } from 'react-icons/im'
import { useNavigate } from "react-router-dom"
import { useAtom } from "jotai"
import { userLoggind, userToken } from "../../Jotai/user"
import { FaChessKing } from 'react-icons/fa'
import { listCart } from "../../Jotai/cart"

export const Account = () => {
    const [logged, setLogged] = useAtom(userLoggind)
    const [user, setUser] = useAtom(userToken)
    const [setCart] = useAtom(listCart)
    const navegation = useNavigate()

    const logout = () => {
        setLogged(false)
        setUser(false)
        setCart([])
        localStorage.removeItem("@token")
        localStorage.removeItem("@cart")
    }

    return(
        <StyleAccount isAdmin={user?.token?.isAdmin ? user?.token?.tokenUser : false}>
            {
                logged ? 
                    <>
                        <div>
                            <span>{user.token.name}</span>
                            {
                                user?.token?.isAdmin ?
                                <FaChessKing />
                                :
                                null
                            }
                        </div>
                        <button onClick={() => logout()}>
                            Sair
                            <ImExit />
                        </button>
                    </>
                :
                    <button onClick={() => navegation('/login')}>
                       Logar
                    </button>
            }
        </StyleAccount>
    )
}