import React from "react"
import Navbar from "../../components/Navbar/Navbar"
import { NavLink, Outlet } from "react-router-dom"
import "./Admin.css"

export default function Admin() {
  const navbarLinks = [
    { path: "", text: "Исполнители" },
    { path: "genres", text: "Жанры" },
    { path: "songs", text: "Песни" },
    { path: "albums", text: "Альбомы" },
    { path: "users", text: "Пользователи" },
  ]
  return (
    <div className='admin container'>
      <Navbar data={navbarLinks} />
      <div className='admin_divider'>
        <Outlet />
      </div>
    </div>
  )
}
