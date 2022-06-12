import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { getAllUsers } from "../../../../store/actions/admin/users"
import "./Users.css"

export default function Users() {
  const dispatch = useDispatch()
  React.useEffect(() => {
    dispatch(getAllUsers())
  }, [])
  const users = useSelector(state => state.users.getAllUsers)
  return (
    <div className='adminUsers'>
      <h1 className='admin-pages_title'>Пользователи</h1>
      <div className='adminUsers_users'>
        {users.success &&
          users.data.map(user => {
            return (
              <NavLink key={user.id} to={`songList/${user.id}`}>Почта - {user.email}</NavLink>
            )
          })}
      </div>
    </div>
  )
}
