import React from "react"
import "./Songs.css"
import { useDispatch, useSelector } from "react-redux"
import {
  getAllAuthors,
  addAuthor,
} from "../../../../store/actions/admin/author"
import { getAllGenres } from "../../../../store/actions/admin/genre"
import { getAllSongs } from "../../../../store/actions/admin/song"
import SongForm from "./SongForm"
import { Accordion } from "react-bootstrap"

export default function Songs() {
  const dispatch = useDispatch()
  const addSongState = useSelector(state => state.song.addSong)
  React.useEffect(() => {
    dispatch(getAllAuthors())
    dispatch(getAllGenres())
    dispatch(getAllSongs())
  }, [])
  React.useEffect(() => {
    dispatch(getAllSongs())
  }, [addSongState])
  const allSongs = useSelector(state => state.song.getAllSongs)
  return (
    <div className='songs'>
      <SongForm />
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
                      {song.album == null ? "Альбом: -" : `Альбом: ${song.album.name}`}
                    </div>
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
