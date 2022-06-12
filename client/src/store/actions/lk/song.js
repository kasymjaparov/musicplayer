import axios from "axios"
import { Store } from "react-notifications-component"
import "animate.css"
import api from "../../../api"
import constants from "../../constants"
import notifications from "../../../utils/notifications"

export const getMySongs = () => async dispatch => {
  dispatch({ type: constants.LK_GET_SONG_FROM_LIST_LOADING })
  const token = localStorage.getItem("token")
  axios
    .get(api.lk.song.getMyList, { headers: { Authorization: token } })
    .then(({ data }) => {
      dispatch({
        type: constants.LK_GET_SONG_FROM_LIST_SUCCESS,
        payload: data.songs.songs,
      })
    })
    .catch(err => {
      dispatch({
        type: constants.LK_GET_SONG_FROM_LIST_FAILED,
        payload: err.response.data.message,
      })
      console.log(err.response.data)
      Store.addNotification({
        ...notifications.common,
        ...notifications.failed,
        message: err.response.data.message,
      })
    })
}

export const addSongToMyList = song => async dispatch => {
  dispatch({ type: constants.LK_ADD_SONG_TO_LIST_LOADING })
  const token = localStorage.getItem("token")
  axios
    .post(api.lk.song.addToList, song, { headers: { Authorization: token } })
    .then(({ data }) => {
      dispatch({ type: constants.LK_ADD_SONG_TO_LIST_SUCCESS })
      Store.addNotification({
        ...notifications.common,
        ...notifications.success,
        message: "Вы добавили песню себе в список",
      })
    })
    .catch(err => {
      dispatch({
        type: constants.LK_ADD_SONG_TO_LIST_FAILED,
        payload: err.response.data.message,
      })
      Store.addNotification({
        ...notifications.common,
        ...notifications.failed,
        message: err.response.data.message,
      })
    })
}

export const deleteSongFromMyList = id => async dispatch => {
  dispatch({ type: constants.LK_DELETE_SONG_FROM_LIST_LOADING })
  const token = localStorage.getItem("token")
  axios
    .delete(`${api.lk.song.delete}/${id}`, {
      headers: { Authorization: token },
    })
    .then(({ data }) => {
      dispatch({ type: constants.LK_DELETE_SONG_FROM_LIST_SUCCESS })
      Store.addNotification({
        ...notifications.common,
        ...notifications.success,
        message: "Вы удалили песню из списка",
      })
    })
    .catch(err => {
      dispatch({
        type: constants.LK_DELETE_SONG_FROM_LIST_FAILED,
        payload: err.response.data.message,
      })
      Store.addNotification({
        ...notifications.common,
        ...notifications.failed,
        message: err.response.data.message,
      })
    })
}
