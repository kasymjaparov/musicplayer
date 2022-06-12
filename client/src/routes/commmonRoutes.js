import React from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import Main from "../pages/Main/Main"
import Auth from "../pages/Auth/Auth"
import Album from "../pages/Album/Album"

export default function commmonRoutes() {
  return (
    <Routes>
      <Route element={<Main />} path='/' />
      <Route element={<Auth />} path='/auth' />
      <Route element={<Album />} path='/album/:id' />
      <Route path='*' element={<Navigate to='/auth' />} />
    </Routes>
  )
}
