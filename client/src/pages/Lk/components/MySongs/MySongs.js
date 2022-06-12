import React from "react"
import { Accordion, Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import {
  deleteSongFromMyList,
  getMySongs,
} from "../../../../store/actions/lk/song"

export default function MySongs() {
  const dispatch = useDispatch()
  React.useEffect(() => {
    dispatch(getMySongs())
  }, [])
  const mySongs = useSelector(state => state.lk_song.getAllSongs)
  const deleteSong = id => {
    dispatch(deleteSongFromMyList(id)).then(() => dispatch(getMySongs()))
  }
  return (
    <div className='mySongs'>
      <h1 className='admin-pages_title'>Мои песни</h1>
      {mySongs.success && mySongs.data.length == 0 && (
        <div>У вас пустой список песен</div>
      )}
      {mySongs.success &&
        mySongs.data.map(song => {
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
                  <Button onClick={() => deleteSong(song.id)}>Удалить</Button>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          )
        })}
    </div>
  )
}
