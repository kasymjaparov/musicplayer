import React from "react"
import { Outlet } from "react-router"
import Navbar from "../../components/Navbar/Navbar"
import "./Lk.css"

export default function Lk() {
  const navbarLinks = [
    { path: "", text: "Моя музыка" },
    { path: "playlists", text: "Мои плейлисты" },
  ]
  return (
    <div className='lk container'>
      <Navbar data={navbarLinks} />
      <div className='admin_divider'>
        <Outlet />
      </div>
    </div>
  )
}
