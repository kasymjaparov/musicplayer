import React from "react"
import { Accordion } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router"
import { NavLink } from "react-router-dom"
import { getUserSongs } from "../../../../store/actions/admin/users"

export default function UserSongList() {
  const dispatch = useDispatch()
  let { id } = useParams()
  React.useEffect(() => {
    dispatch(getUserSongs(id))
  }, [])
  const userSongs = useSelector(state => state.users.getUserSongs)
  return (
    <div className='userSongList'>
      <h1 className='admin-pages_title'>Песни пользователя</h1>
      {userSongs.success && userSongs.data.length == 0 && (
        <div>Список песен пуст</div>
      )}
      {userSongs.success &&
        userSongs.data.songs.songs.map(song => {
          return (
            <Accordion
              key={song.id}
              className='songs_accordion songs_accordion-item'
              defaultActiveKey='0'
            >
              <Accordion.Item className='songs_accordion' eventKey='1'>
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
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          )
        })}
      <h2 className='admin-pages_title'>Плейлисты пользователя</h2>
      {userSongs.success && userSongs.data.playlists.length == 0 && (
        <div>Песен в плейлисте нет</div>
      )}
      {userSongs.success &&
        userSongs.data.playlists.map(playlist => {
          return (
            <Accordion
              key={playlist.id}
              className='songs_accordion songs_accordion-item'
              defaultActiveKey='0'
            >
              <Accordion.Item className='songs_accordion' eventKey='1'>
                <Accordion.Header className='songs_accordion songs_accordion-item_header'>
                  {playlist.name}
                </Accordion.Header>
                <Accordion.Body>
                  {playlist.songs.map((song, index) => {
                    return (
                      <div key={song.id} className='user_playlist_songs'>
                        {index + 1}) {song.author.name} - {song.name}
                      </div>
                    )
                  })}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          )
        })}
    </div>
  )
}
