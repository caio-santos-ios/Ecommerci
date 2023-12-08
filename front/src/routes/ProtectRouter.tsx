import { useAtom } from "jotai"
import { Outlet, Navigate } from "react-router-dom"
import { userLoggind, userToken } from "../Jotai/user"

export const ProtectorRoutes = () => {
    const [loggind] = useAtom(userLoggind);
    const [user] = useAtom(userToken);

    const isAdmin: boolean = user?.token?.isAdmin || false

    return(
        loggind ? 
            isAdmin ?
                <Outlet />
            :
                <Navigate to="/" />
        : 
            <Navigate to="/login" />         
    ) 
}
