import axios from "axios"
import { Store } from "react-notifications-component"
import "animate.css"
import api from "../../../api"
import constants from "../../constants"
import notifications from "../../../utils/notifications"

export const getAllGenres = () => async dispatch => {
  dispatch({ type: constants.GET_GENRES_LOADING })
  const token = localStorage.getItem("token")
  axios
    .get(api.admin.genre.getAll, { headers: { Authorization: token } })
    .then(({ data }) => {
      dispatch({ type: constants.GET_GENRES_SUCCESS, payload: data.genres })
    })
    .catch(err => {
      dispatch({
        type: constants.GET_GENRES_FAILED,
        payload: err.response.data,
      })
      Store.addNotification({
        ...notifications.common,
        ...notifications.failed,
        message: err.response.data,
      })
    })
}

export const addGenre = genre => async dispatch => {
  dispatch({ type: constants.ADD_GENRE_LOADING })
  const token = localStorage.getItem("token")
  axios
    .post(api.admin.genre.add, genre, { headers: { Authorization: token } })
    .then(({ data }) => {
      dispatch({ type: constants.ADD_GENRE_SUCCESS })
      Store.addNotification({
        ...notifications.common,
        ...notifications.success,
        message: data.message,
      })
    })
    .catch(err => {
      dispatch({
        type: constants.ADD_GENRE_FAILED,
        payload: err.response.data.message,
      })
      Store.addNotification({
        ...notifications.common,
        ...notifications.failed,
        message: err.response.data.message,
      })
    })
}

export const deleteGenre = id => async dispatch => {
  dispatch({ type: constants.DELETE_GENRE_LOADING })
  const token = localStorage.getItem("token")
  axios
    .add(`${api.admin.genre.delete}/${id}`, {
      headers: { Authorization: token },
    })
    .then(({ data }) => {
      dispatch({ type: constants.DELETE_GENRE_SUCCESS })
      Store.addNotification({
        ...notifications.common,
        ...notifications.success,
        message: data.message,
      })
    })
    .catch(err => {
      dispatch({
        type: constants.DELETE_GENRE_FAILED,
        payload: err.response.data.message,
      })
      Store.addNotification({
        ...notifications.common,
        ...notifications.failed,
        message: err.response.data.message,
      })
    })
}
