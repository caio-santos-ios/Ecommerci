import { HeaderAdmin } from "../components/HeaderAdmin/Header"
import { ListStock } from "../components/ListStock"

const AdminPage = () => {
    return(
        <>
            <HeaderAdmin />
            <main>
                <ListStock />
            </main>
        </>
    )
}

export default AdminPage