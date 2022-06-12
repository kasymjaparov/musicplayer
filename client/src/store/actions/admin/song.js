import axios from "axios"
import { Store } from "react-notifications-component"
import "animate.css"
import api from "../../../api"
import constants from "../../constants"
import notifications from "../../../utils/notifications"

export const getAllSongs = () => dispatch => {
  dispatch({ type: constants.GET_ALL_SONGS_LOADING })
  const token = localStorage.getItem("token")
  axios
    .get(api.admin.song.getAll, { headers: { Authorization: token } })
    .then(({ data }) => {
      dispatch({ type: constants.GET_ALL_SONGS_SUCCESS, payload: data.songs })
    })
    .catch(err => {
      dispatch({
        type: constants.GET_ALL_SONGS_FAILED,
        payload: err.response.data,
      })
      Store.addNotification({
        ...notifications.common,
        ...notifications.failed,
        message: err.response.data,
      })
    })
}

export const addSong = song => async dispatch => {
  dispatch({ type: constants.ADD_SONG_LOADING })
  const token = localStorage.getItem("token")
  axios
    .post(api.admin.song.add, song, { headers: { Authorization: token } })
    .then(({ data }) => {
      dispatch({ type: constants.ADD_SONG_SUCCESS })
      Store.addNotification({
        ...notifications.common,
        ...notifications.success,
        message: data.message,
      })
    })
    .catch(err => {
      dispatch({
        type: constants.ADD_SONG_FAILED,
        payload: err.response.data,
      })
      Store.addNotification({
        ...notifications.common,
        ...notifications.failed,
        message: err.response.data,
      })
    })
}

export const addSongToAlbum = data => async dispatch => {
  dispatch({ type: constants.ADD_SONG_TO_ALBUM_LOADING })
  const token = localStorage.getItem("token")
  axios
    .post(api.admin.song.addSongToAlbum, data, {
      headers: { Authorization: token },
    })
    .then(({ data }) => {
      dispatch({ type: constants.ADD_SONG_TO_ALBUM_SUCCESS })
    })
    .catch(err => {
      dispatch({
        type: constants.ADD_SONG_TO_ALBUM_FAILED,
        payload: err.response.data,
      })
      Store.addNotification({
        ...notifications.common,
        ...notifications.failed,
        message: err.response.data,
      })
    })
}

export const deleteSongFromAlbum = songId => async dispatch => {
  dispatch({ type: constants.DELETE_SONG_FROM_ALBUM_LOADING })
  const token = localStorage.getItem("token")
  axios
    .post(api.admin.song.deleteSongFromAlbum, songId, {
      headers: { Authorization: token },
    })
    .then(({ data }) => {
      dispatch({ type: constants.DELETE_SONG_FROM_ALBUM_SUCCESS })
      Store.addNotification({
        ...notifications.common,
        ...notifications.success,
        message: data.message,
      })
    })
    .catch(err => {
      dispatch({
        type: constants.DELETE_SONG_FROM_ALBUM_FAILED,
        payload: err.response.data,
      })
      Store.addNotification({
        ...notifications.common,
        ...notifications.failed,
        message: err.response.data,
      })
    })
}
