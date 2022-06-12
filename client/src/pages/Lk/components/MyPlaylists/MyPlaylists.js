import React from "react"
import * as yup from "yup"
import { useFormik } from "formik"
import { Button, FormControl, InputGroup } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import {
  getMyPlaylists,
  addPlaylist,
} from "../../../../store/actions/lk/playlist"

export default function MyPlaylists() {
  const dispatch = useDispatch()
  React.useEffect(() => {
    dispatch(getMyPlaylists())
  }, [])
  const getAllPlaylists = useSelector(
    state => state.lk_playlist.getAllPlaylists
  )
  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .required("Обязательное поле")
      .min(2, "Минимальное количество символов 2"),
  })
  const initialValues = {
    name: "",
  }
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    isValid,
    handleSubmit,
    dirty,
  } = useFormik({
    initialValues,
    validateOnBlur: true,
    validationSchema: validationSchema,
    onSubmit: (data, { resetForm }) => {
      dispatch(addPlaylist(data)).then(() => dispatch(getMyPlaylists()))
      resetForm({})
    },
  })
  return (
    <div className='playlist'>
      <h1 className='admin-pages_title'>Плейлисты</h1>
      <span className='auth_label'>Название плейлиста*</span>
      <InputGroup>
        <FormControl
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          name='name'
          error={`${touched.name && Boolean(errors.name)}`}
          className='auth_input'
          placeholder='Введите название'
        />
      </InputGroup>
      {touched.name && Boolean(errors.name) && (
        <div className='input_error'>{errors.name}</div>
      )}
      <Button
        onClick={handleSubmit}
        disabled={!isValid || !dirty}
        type='button'
        className='auth_btn'
        variant='primary'
      >
        Отправить
      </Button>
      {getAllPlaylists.success && (
        <div className='albums_row'>
          {getAllPlaylists.data.map(playlist => {
            return (
              <NavLink
                state={playlist}
                key={playlist.id}
                to={`addSong/${playlist.id}`}
              >
                <div className='albums_row_item'>
                  <div className='albums_row_item_block'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='50'
                      height='50'
                      fill='currentColor'
                      className='bi bi-music-note'
                      viewBox='0 0 16 16'
                    >
                      <path d='M9 13c0 1.105-1.12 2-2.5 2S4 14.105 4 13s1.12-2 2.5-2 2.5.895 2.5 2z' />
                      <path fillRule='evenodd' d='M9 3v10H8V3h1z' />
                      <path d='M8 2.82a1 1 0 0 1 .804-.98l3-.6A1 1 0 0 1 13 2.22V4L8 5V2.82z' />
                    </svg>
                  </div>
                  <div className='albums_row_item_text'>{playlist.name}</div>
                </div>
              </NavLink>
            )
          })}
        </div>
      )}
    </div>
  )
}
