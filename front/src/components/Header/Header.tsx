import { useRef, useState } from "react"
import { FaUserCircle } from 'react-icons/fa'
import { AiFillDashboard } from 'react-icons/ai'
import Button from 'react-bootstrap/Button'
import { Cart } from "../Cart"
import Tooltip from 'react-bootstrap/Tooltip';
import Overlay from 'react-bootstrap/Overlay';
import { Account } from "../Account"
import { StyleHeader } from "./style";
import { useAtom } from "jotai"
import { userToken } from "../../Jotai/user"
import { useNavigate } from "react-router-dom"


export const Header = () => {
    const [user] = useAtom(userToken)
    const [show, setShow] = useState(false)
    const target = useRef(null)
    const navegation = useNavigate()

    return(
        <StyleHeader>
            <nav>
                <h4>Ecommerce</h4>
                {
                    user?.token?.isAdmin ?
                        <Button variant="primary" onClick={() => navegation('/admin')}>
                            <AiFillDashboard size={30} />
                        </Button>
                    :
                        null
                }
                <Button variant="primary" ref={target} onClick={() => setShow(!show)}>
                    <FaUserCircle size={30} />
                </Button>
                <Overlay target={target.current} show={show} placement="bottom">
                    {(props) => (
                        <Tooltip id="overlay-example" {...props}>
                        <Account />
                    </Tooltip>
                    )}
                </Overlay>
                <Cart/>
            </nav>
        </StyleHeader>
    )
}
