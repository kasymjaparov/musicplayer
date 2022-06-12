import React from "react"
import { InputGroup, FormControl, Button } from "react-bootstrap"
import * as yup from "yup"
import { useFormik } from "formik"
import { useDispatch, useSelector } from "react-redux"
import {
  getAllGenres,
  addGenre,
  deleteGenre,
} from "../../../../store/actions/admin/genre"

export default function Genres() {
  const dispatch = useDispatch()
  React.useEffect(() => {
    dispatch(getAllGenres())
  }, [])
  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .required("Обязательное поле")
      .min(3, "Минимальное количество символов 3"),
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
      dispatch(addGenre(data)).then(() => dispatch(getAllGenres()))
      resetForm({})
    },
  })
  const allGenres = useSelector(state => state.genre.getGenres)
  return (
    <div className='author'>
      <h1 className='admin-pages_title'>Жанпы</h1>
      <span className='auth_label'>Название жанра*</span>
      <InputGroup>
        <FormControl
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          name='name'
          
          error={touched.name && Boolean(errors.name)}
          className='auth_input'
          placeholder='Введите имя'
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
      {allGenres.loading && <div>Загрузка...</div>}
      {allGenres.failed && <div>Ошибка при получении исполнителей</div>}
      {allGenres.success && allGenres.data.length == 0 && (
        <div>Исполнители отсутствуют</div>
      )}

      <div className='authorsRow'>
        {allGenres.data &&
          allGenres.data.map(authorItem => (
            <div key={authorItem.id} className='authorsRow_item'>
              {authorItem.name}
            </div>
          ))}
      </div>
    </div>
  )
}
