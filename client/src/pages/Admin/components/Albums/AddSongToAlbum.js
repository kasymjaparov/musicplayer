import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router"
import { getAlbumById } from "../../../../store/actions/admin/album"
import {
  addSongToAlbum,
  deleteSongFromAlbum,
  getAllSongs,
} from "../../../../store/actions/admin/song"
import { MultiSelect } from "react-multi-select-component"
import { Button } from "react-bootstrap"

export default function AddSongToAlbum() {
  const allSongs = useSelector(state => state.song.getAllSongs)
  const choosenAlbum = useSelector(state => state.album.getAlbum)
  const addSongState = useSelector(state => state.song.addSongToAlbum)
  const deleteSongState = useSelector(state => state.song.deleteSongFromAlbum)
  const dispatch = useDispatch()
  React.useEffect(() => {
    dispatch(getAlbumById(id))
    dispatch(getAllSongs())
  }, [addSongState, deleteSongState])

  let id = useParams().id
  let allSongsOptions
  if (allSongs.success) {
    allSongsOptions = allSongs.data.map(song => {
      return {
        label: `${song.name} - ${song.author.name}`,
        value: song.name,
        album: song.album,
      }
    })
    for (let i = 0; i < allSongsOptions.length; i++) {
      if (allSongsOptions[i].album !== null) {
        allSongsOptions.splice(i, 1)
      }
    }
  }

  const [selected, setSelected] = React.useState([])
  const handleSubmit = () => {
    selected.forEach(song => {
      dispatch(
        addSongToAlbum({ song: song.value, albumId: choosenAlbum.data.id })
      )
    })
    getAlbumById(id)
  }
  const deleteSong = id => {
    dispatch(deleteSongFromAlbum({songId:id}))
  }
  return (
    <div className='addSongToAlbum'>
      {choosenAlbum.success && (
        <>
          <h2 className='addSongToAlbum_options'>
            Нвазвание альбома: {choosenAlbum.data.name}
          </h2>
          <div className='addSongToAlbum_songs'>
            <h2 className='addSongToAlbum_options'>Песни</h2>
            {choosenAlbum.data.songs.map((song, index) => {
              return (
                <div key={song.id} className='addSongToAlbum_songs_item'>
                  {index + 1}) {song.name} {song.duration}{" "}
                  <svg
                    onClick={() => deleteSong(song.id)}
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
      <div className='admin-pages_title'>Добавить песню в альбом</div>
      {allSongs.success && (
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
