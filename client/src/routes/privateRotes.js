import React from "react"
import { Navigate, Route, Routes, Outlet } from "react-router-dom"
import Main from "../pages/Main/Main"
import Lk from "../pages/Lk/Lk"
import Admin from "../pages/Admin/Admin"
import { useSelector } from "react-redux"
import Author from "../pages/Admin/components/Author/Author"
import Songs from "../pages/Admin/components/Songs/Songs"
import Albums from "../pages/Admin/components/Albums/Albums"
import AddSongToAlbum from "../pages/Admin/components/Albums/AddSongToAlbum"
import Album from "../pages/Album/Album"
import MySongs from "../pages/Lk/components/MySongs/MySongs"
import MyPlaylists from "../pages/Lk/components/MyPlaylists/MyPlaylists"
import AddSongToMyPlaylist from "../pages/Lk/components/MyPlaylists/AddSongToMyPlaylist"
import AdminUsers from "../pages/Admin/components/Users/Users"
import UserSongList from "../pages/Admin/components/Users/UserSongList"
import Genres from "../pages/Admin/components/Genres/Genres"

export default function PrivateRoutes() {
  const role = useSelector(state => state.auth.login.role)
  return role == "admin" ? <AdminRoutes /> : <UserRoutes />
}

const AdminRoutes = () => {
  return (
    <Routes>
      <Route element={<Main />} path='/' />
      <Route element={<Album />} path='/album/:id' />
      <Route element={<Admin />} path='/admin'>
        <Route index element={<Author />} />
        <Route path='songs' element={<Songs />} />
        <Route path='genres' element={<Genres />} />
        <Route
          path='users'
          element={
            <>
              <Outlet />
            </>
          }
        >
          <Route index element={<AdminUsers />} />
          <Route path='songList/:id' element={<UserSongList />} />
        </Route>
        <Route
          path='albums'
          element={
            <>
              <Outlet />
            </>
          }
        >
          <Route index element={<Albums />} />
          <Route path='addSong/:id' element={<AddSongToAlbum />} />
        </Route>
      </Route>
      <Route path='*' element={<Navigate to='/admin' />} />
    </Routes>
  )
}

const UserRoutes = () => {
  return (
    <Routes>
      <Route element={<Main />} path='/' />
      <Route element={<Lk />} path='/lk'>
        <Route index element={<MySongs />} />
        <Route
          path='playlists'
          element={
            <>
              <Outlet />
            </>
          }
        >
          <Route index element={<MyPlaylists />} />
          <Route path='addSong/:id' element={<AddSongToMyPlaylist />} />
        </Route>
      </Route>
    </Routes>
  )
}
