import React from "react"
import "./Author.css"
import { InputGroup, FormControl, Button } from "react-bootstrap"
import * as yup from "yup"
import { useFormik } from "formik"
import { useDispatch, useSelector } from "react-redux"
import {
  getAllAuthors,
  addAuthor,
} from "../../../../store/actions/admin/author"

export default function Author() {
  const dispatch = useDispatch()
  React.useEffect(() => {
    dispatch(getAllAuthors())
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
      dispatch(addAuthor(data)).then(() => dispatch(getAllAuthors()))
      resetForm({})
    },
  })
  const allAuthors = useSelector(state => state.author.getAuthors)
  return (
    <div className='author'>
      <h1 className='admin-pages_title'>Исполнители</h1>
      <span className='auth_label'>Имя исполнителя*</span>
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
      {allAuthors.loading && <div>Загрузка...</div>}
      {allAuthors.failed && <div>Ошибка при получении исполнителей</div>}
      {allAuthors.success && allAuthors.data.length == 0 && (
        <div>Исполнители отсутствуют</div>
      )}

      <div className='authorsRow'>
        {allAuthors.data &&
          allAuthors.data.map(authorItem => (
            <div key={authorItem.id} className='authorsRow_item'>
              {authorItem.name}
            </div>
          ))}
      </div>
    </div>
  )
}
