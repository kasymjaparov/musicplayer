import React from "react"
import { MultiSelect } from "react-multi-select-component"
import { Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router"
import {
  addSongToPlaylist,
  deleteMyPlaylist,
  deleteSongFromPlaylist,
  getMyPlaylist,
} from "../../../../store/actions/lk/playlist"
import { getMySongs } from "../../../../store/actions/lk/song"

export default function AddSongToMyPlaylist() {
  const [selected, setSelected] = React.useState([])
  const navigate = useNavigate()
  const dispatch = useDispatch()
  React.useEffect(() => {
    dispatch(getMySongs())
    dispatch(getMyPlaylist(id))
  }, [])
  const choosenPlaylist = useSelector(state => state.lk_playlist.getPlaylist)
  const songFromList = useSelector(state => state.lk_song.getAllSongs)
  let id = useParams().id
  let allSongsOptions
  if (songFromList.success) {
    allSongsOptions = songFromList.data.map(song => {
      return {
        label: `${song.name} - ${song.author.name}`,
        value: song.name,
        id: song.id,
      }
    })
  }
  const handleSubmit = () => {
    selected.forEach(song => {
      dispatch(
        addSongToPlaylist({
          songId: song.id,
          playlistId: choosenPlaylist.data.id,
        })
      ).then(() => dispatch(dispatch(getMyPlaylist(id))))
    })
  }
  const deleteSong = songData => {
    dispatch(deleteSongFromPlaylist(songData)).then(() =>
      dispatch(dispatch(getMyPlaylist(id)))
    )
  }
  const deletePlaylistClick = () => {
    dispatch(deleteMyPlaylist(choosenPlaylist.data.id)).then(() => navigate(-1))
  }
  return (
    <div className='addSongToPlaylist'>
      {choosenPlaylist.success && (
        <>
          <h2 className='addSongToAlbum_options'>
            Нвазвание плейлиста: {choosenPlaylist.data.name}
          </h2>
          <div className='addSongToAlbum_songs'>
            <h2 className='addSongToAlbum_options'>Песни</h2>
            {choosenPlaylist.data.songs.map((song, index) => {
              return (
                <div key={song.id} className='addSongToAlbum_songs_item'>
                  {index + 1}) {song.name} {song.duration}
                  <svg
                    onClick={() =>
                      deleteSong({
                        id: song.song_playlist.id,
                      })
                    }
                    xmlns='http://www.w3.org/2000/svg'
                    width='16'
                    height='16'
                    fill='currentColor'
                    className='bi bi-trash deleteSong'
                    viewBox='0 0 16 16'
                  >
                    <path d='M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z' />
                    <path
                      color='red'
                      fillRule='evenodd'
                      d='M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z'
                    />
                  </svg>
                </div>
              )
            })}
          </div>
        </>
      )}
      <br />
      <Button onClick={deletePlaylistClick} variant='danger'>
        Удалить плейлист
      </Button>
      <div className='admin-pages_title'>Добавить песню в плейлист</div>
      {songFromList.success && (
        <MultiSelect
          className='auth_input multiselect-album'
          options={allSongsOptions}
          value={selected}
          onChange={setSelected}
          labelledBy='Select'
        />
      )}
      <Button
        onClick={handleSubmit}
        disabled={!selected.length}
        type='button'
        className='auth_btn'
        variant='primary'
      >
        Отправить
      </Button>
    </div>
  )
}
