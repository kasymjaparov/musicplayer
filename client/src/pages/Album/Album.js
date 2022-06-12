import React from "react"
import "./Album.css"
import { useParams } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import { getAlbumById } from "../../store/actions/admin/album"
import { Accordion, Button } from "react-bootstrap"
import { NavLink } from "react-router-dom"
export default function Album() {
  let id = useParams().id
  const dispatch = useDispatch()
  React.useEffect(() => {
    dispatch(getAlbumById(id))
  }, [])
  const choosenAlbum = useSelector(state => state.album.getAlbum)
  return (
    choosenAlbum.success && (
      <div className='container album'>
        <div className='addSongToAlbum_options'>
          Нвазвание альбома: {choosenAlbum.data.name}
        </div>
        <div className='addSongToAlbum_options'>Песни</div>
        <div className='songs_row'>
          {choosenAlbum.data.songs.reverse().map(song => {
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
                    <NavLink to='lk'>
                      <Button>Добавить к себе</Button>
                    </NavLink>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            )
          })}
        </div>
      </div>
    )
  )
}
