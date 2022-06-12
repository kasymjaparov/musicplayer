import React from "react"
import { InputGroup, FormControl, Button, Form } from "react-bootstrap"
import * as yup from "yup"
import { useFormik } from "formik"
import { useDispatch, useSelector } from "react-redux"
import { addSong, getAllSongs } from "../../../../store/actions/admin/song"

export default function SongForm() {
  const dispatch = useDispatch()
  const authors = useSelector(state => state.author.getAuthors)
  const genres = useSelector(state => state.genre.getGenres)
  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .required("Обязательное поле")
      .min(3, "Минимальное количество символов 3"),
    duration: yup
      .string()
      .required("Обязательное поле")
      .matches(/\d{2}:\d{2}/, "Формат mm:ss или mmm:ss"),
    genre: yup.string().required("Обязательное поле"),
    author: yup.string().required("Обязательное поле"),
  })
  const initialValues = {
    name: "",
    duration: "",
    author: "",
    genre: "",
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
      dispatch(addSong(data)).then(() => {
        dispatch(getAllSongs())
      })
    },
  })
  return (
    <>
      <h1 className='admin-pages_title'>Песни</h1>
      <span className='auth_label'>Название песни*</span>
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

      <span className='auth_label'>Продолжительность песни*</span>
      <InputGroup>
        <FormControl
          value={values.duration}
          onChange={handleChange}
          onBlur={handleBlur}
          name='duration'
          error={touched.duration && Boolean(errors.duration)}
          className='auth_input'
          placeholder='Введите продолжительность'
        />
      </InputGroup>
      {touched.duration && Boolean(errors.duration) && (
        <div className='input_error'>{errors.duration}</div>
      )}
      {authors.success && (
        <>
          <span className='auth_label'>Исполнитель*</span>
          <Form.Select
            onChange={handleChange}
            onBlur={handleBlur}
            name='author'
            className='auth_input'
          >
            <option disabled selected></option>
            {authors.success &&
              authors.data.map(author => {
                return (
                  <option key={author.id} value={author.name}>
                    {author.name}
                  </option>
                )
              })}
          </Form.Select>
        </>
      )}

      {genres.success && (
        <>
          <span className='auth_label'>Жанр*</span>
          <Form.Select
            onChange={handleChange}
            onBlur={handleBlur}
            name='genre'
            className='auth_input'
          >
            <option disabled selected></option>
            {genres.data.map(author => {
              return (
                <option key={author.id} value={author.name}>
                  {author.name}
                </option>
              )
            })}
          </Form.Select>
        </>
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
    </>
  )
}
