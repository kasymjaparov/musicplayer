import axios from "axios"
import { Store } from "react-notifications-component"
import "animate.css"
import api from "../../../api"
import constants from "../../constants"
import notifications from "../../../utils/notifications"

export const addAlbum = album => dispatch => {
  dispatch({ type: constants.ADD_ALBUM_LOADING })
  const token = localStorage.getItem("token")
  axios
    .post(api.admin.album.add, album, { headers: { Authorization: token } })
    .then(({ data }) => {
      dispatch({ type: constants.ADD_ALBUM_SUCCESS })
      Store.addNotification({
        ...notifications.common,
        ...notifications.success,
        message: data.message,
      })
    })
    .catch(err => {
      dispatch({
        type: constants.ADD_ALBUM_FAILED,
        payload: err.response.data,
      })
      Store.addNotification({
        ...notifications.common,
        ...notifications.failed,
        message: err.response.data,
      })
    })
}

export const getAllAlbums = () => dispatch => {
  dispatch({ type: constants.GET_ALL_ALBUMS_LOADING })
  const token = localStorage.getItem("token")
  axios
    .get(api.admin.album.getAll, { headers: { Authorization: token } })
    .then(({ data }) => {
      dispatch({ type: constants.GET_ALL_ALBUMS_SUCCESS, payload: data.albums })
      // Store.addNotification({
      //   ...notifications.common,
      //   ...notifications.success,
      //   message: data.message,
      // })
    })
    .catch(err => {
      dispatch({
        type: constants.GET_ALL_ALBUMS_FAILED,
        payload: err.response.data,
      })
      Store.addNotification({
        ...notifications.common,
        ...notifications.failed,
        message: err.response.data,
      })
    })
}

export const getAlbumById = id => dispatch => {
  dispatch({ type: constants.GET_ONE_ALBUM_LOADING })
  const token = localStorage.getItem("token")
  axios
    .get(`${api.admin.album.getById}/${id}`, {
      headers: { Authorization: token },
    })
    .then(({ data }) => {
      dispatch({ type: constants.GET_ONE_ALBUM_SUCCESS, payload: data.album })
      // Store.addNotification({
      //   ...notifications.common,
      //   ...notifications.success,
      //   message: data.message,
      // })
    })
    .catch(err => {
      dispatch({
        type: constants.GET_ONE_ALBUM_FAILED,
        payload: err.response.data,
      })
      Store.addNotification({
        ...notifications.common,
        ...notifications.failed,
        message: err.response.data,
      })
    })
}
