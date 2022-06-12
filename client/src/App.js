import { ReactNotifications } from "react-notifications-component"
import React from "react"
import "react-notifications-component/dist/theme.css"
import "animate.css"
import { BrowserRouter } from "react-router-dom"
import CommonRoute from "./routes/commmonRoutes"
import PrivateRoute from "./routes/privateRotes"
import { useSelector, useDispatch } from "react-redux"
import { getRole } from "./store/actions/auth"
import MyNavbar from "./components/Navbar/Navbar"

function App() {
  const dispatch = useDispatch()
  React.useEffect(() => {
    dispatch(getRole())
  }, [])
  const successLogin =
    useSelector(state => state.auth.login.token) ||
    localStorage.getItem("token")

  return (
    <BrowserRouter>
      <div className='app'>
        <ReactNotifications isMobile={true} />
        {!!successLogin ? <PrivateRoute /> : <CommonRoute />}
      </div>
    </BrowserRouter>
  )
}

export default App
