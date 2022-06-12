import React from "react"
import { Accordion, Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import MyNavbar from "../../components/Navbar/Navbar"
import { getAllAuthors } from "../../store/actions/admin/author"
import { getAllGenres } from "../../store/actions/admin/genre"
import { getAllSongs } from "../../store/actions/admin/song"
import {addSongToMyList} from "../../store/actions/lk/song"
import AlbumsSwiper from "./components/AlbumsSwiper"
import SongFilters from "./components/SongFilters"
import "./Main.css"

export default function Main() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const navbarLinks = [{ path: "lk", text: "Личный кабинет" }]
  React.useEffect(() => {
    dispatch(getAllAuthors())
    dispatch(getAllGenres())
    dispatch(getAllSongs())
  }, [])
  const allSongs = useSelector(state => state.song.getAllSongs)
  const mySongs = useSelector(state => state.lk_song.getAllSongs)
  const role = useSelector(state => state.auth.login.role)
  const addSong = songId => {
    if (role !== "user") {
      navigate("/lk")
    }
    dispatch(addSongToMyList({ songId }))
  }
  return (
    <div className='admin main container'>
      <MyNavbar data={navbarLinks} />
      <h1 className='admin-pages_title'>Альбомы</h1>
      <AlbumsSwiper />
      <h1 className='admin-pages_title songs_label'>Песни</h1>
      <SongFilters />
      {allSongs.success && (
        <div className='songs_row'>
          {allSongs.data.reverse().map(song => {
            return (
              <Accordion
                key={song.id}
                className='songs_accordion songs_accordion-item'
                defaultActiveKey='0'
              >
                <Accordion.Item className='songs_accordion' eventKey='0'>
                  <Accordion.Header className='songs_accordion songs_accordion-item_header'>
                    {song.name}
                  </Accordion.Header>
                  <Accordion.Body className='songs_accordion songs_accordion-item_body'>
                    <div className='songs_accordion-item_body_author'>
                      Исполнитель: {song.author.name}
                    </div>

                    <div className='songs_accordion-item_body_duration'>
                      Продолжительность: {song.duration}
                    </div>
                    <div className='songs_accordion-item_body_genre'>
                      Жанр: {song.genre.name}
                    </div>

                    <div className='songs_accordion-item_body_album'>
                      {song.album == null
                        ? "Альбом: -"
                        : `Альбом: ${song.album.name}`}
                    </div>

                    <Button onClick={() => addSong(song.id)}>
                      Добавить к себе
                    </Button>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            )
          })}
        </div>
      )}
    </div>
  )
}
