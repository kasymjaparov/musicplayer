import React from "react"
import { Form, FormControl, InputGroup } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { getFilteredSong } from "../../../store/actions/user/song"

export default function SongFilters() {
  const [params, setParams] = React.useState({
    author: "",
    genre: "",
    name: "",
  })
  const dispatch = useDispatch()
  const allGenres = useSelector(state => state.genre.getGenres)
  const allAuthors = useSelector(state => state.author.getAuthors)
  return (
    allGenres.success &&
    allAuthors.success && (
      <div className='main_songs'>
        <div className='main_songs_filters_item'>
          <span className='auth_label main_songs_label'>Жанр</span>
          <Form.Select
            onChange={e => {
              setParams({ ...params, genre: e.target.value })
              dispatch(getFilteredSong({ ...params, genre: e.target.value }))
            }}
            className='auth_input'
          >
            <option value=''>Все</option>
            {allGenres.data.map(item => (
              <option key={item.id} value={item.name}>
                {item.name}
              </option>
            ))}
          </Form.Select>
        </div>
        <div className='main_songs_filters_item'>
          <span className='auth_label main_songs_label'>Исполнитель</span>
          <Form.Select
            onChange={e => {
              setParams({ ...params, author: e.target.value })
              dispatch(getFilteredSong({ ...params, author: e.target.value }))
            }}
            className='auth_input'
          >
            <option value=''>Все</option>
            {allAuthors.data.map(item => (
              <option key={item.id} value={item.name}>
                {item.name}
              </option>
            ))}
          </Form.Select>
        </div>
        <InputGroup style={{width: "50%"}}>
          <FormControl
            style={{ marginTop: "30px" }}
            onChange={e => {
              setParams({ ...params, name: e.target.value })
              dispatch(getFilteredSong({ ...params, name: e.target.value }))
            }}
            name='name'
            className='auth_input'
            placeholder='Введите название песни'
          />
        </InputGroup>
      </div>
    )
  )
}
