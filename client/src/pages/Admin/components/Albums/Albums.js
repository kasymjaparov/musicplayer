import React from "react"
import { Button, FormControl, InputGroup } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import "./Albums.css"
import { addAlbum, getAllAlbums } from "../../../../store/actions/admin/album"
import * as yup from "yup"
import { useFormik } from "formik"
import moment from "moment"
import { NavLink } from "react-router-dom"

export default function Albums() {
  const dispatch = useDispatch()
  React.useEffect(() => {
    dispatch(getAllAlbums())
  }, [])
  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .required("Обязательное поле")
      .min(2, "Минимальное количество символов 2"),
  })
  const initialValues = {
    name: "",
    date: new Date(),
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
      dispatch(addAlbum(data))
      dispatch(getAllAlbums())
      resetForm({})
    },
  })
  const allAlbums = useSelector(state => state.album.getAlbums)
  return (
    <div className='author albums'>
      <h1 className='admin-pages_title'>Альбомы</h1>
      <span className='auth_label'>Название альбома*</span>
      <InputGroup>
        <FormControl
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          name='name'
          error={touched.name && Boolean(errors.name)}
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
      {allAlbums.success && (
        <div className='albums_row'>
          {allAlbums.data.map(album => {
            return (
              <NavLink state={album} key={album.id} to={`addSong/${album.id}`}>
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
                  <div className='albums_row_item_text'>{album.name}</div>
                  <div className='albums_row_item_text'>
                    {moment(album.date).format("L")}
                  </div>
                </div>
              </NavLink>
            )
          })}
        </div>
      )}
    </div>
  )
}
