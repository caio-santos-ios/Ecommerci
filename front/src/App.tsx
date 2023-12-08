import { MainRouter } from "./routes/MainRouter"
import { GlobalStyle } from "./style/globalStyle"
import { ToastContainer } from 'react-toastify'

function App() {
  
  return (
    <>
      <ToastContainer />
      <GlobalStyle />
      <MainRouter />
    </>
  )
}

export default App
