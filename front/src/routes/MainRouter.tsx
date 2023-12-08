import { Route, Routes } from "react-router-dom"
import HomePage from "../pages/HomePage"
import LoginPage from "../pages/LoginPage"
import { ProtectorRoutes } from "./ProtectRouter"
import AdminPage from "../pages/AdminPage"
import ConfirmationPage from "../pages/ConfirmationPage"

export const MainRouter = () => {
    return(
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/confirmar" element={<ConfirmationPage />} />

            <Route path="/admin" element={<ProtectorRoutes />}>
                <Route index element={<AdminPage />} />
            </Route>
        </Routes>
    )
}