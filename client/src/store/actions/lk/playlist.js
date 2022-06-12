import axios from "axios"
import { Store } from "react-notifications-component"
import "animate.css"
import api from "../../../api"
import constants from "../../constants"
import notifications from "../../../utils/notifications"

export const getMyPlaylists = () => async dispatch => {
  dispatch({ type: constants.LK_GET_PLAYLISTS_LOADING })
  const token = localStorage.getItem("token")
  axios
    .get(api.lk.playlist.getPlaylists, { headers: { Authorization: token } })
    .then(({ data }) => {
      dispatch({
        type: constants.LK_GET_PLAYLISTS_SUCCESS,
        payload: data.playlists,
      })
    })
    .catch(err => {
      dispatch({
        type: constants.LK_GET_PLAYLISTS_FAILED,
        payload: err.response.data.message,
      })

      Store.addNotification({
        ...notifications.common,
        ...notifications.failed,
        message: err.response.data.message,
      })
    })
}

export const getMyPlaylist = id => async dispatch => {
  dispatch({ type: constants.LK_GET_PLAYLIST_LOADING })
  const token = localStorage.getItem("token")
  axios
    .get(`${api.lk.playlist.getPlaylist}/${id}`, {
      headers: { Authorization: token },
    })
    .then(({ data }) => {
      dispatch({
        type: constants.LK_GET_PLAYLIST_SUCCESS,
        payload: data.playlist,
      })
    })
    .catch(err => {
      dispatch({
        type: constants.LK_GET_PLAYLIST_FAILED,
        payload: err.response.data.message,
      })

      Store.addNotification({
        ...notifications.common,
        ...notifications.failed,
        message: err.response.data.message,
      })
    })
}

export const deleteMyPlaylist = id => async dispatch => {
  dispatch({ type: constants.LK_DELETE_PLAYLIST_LOADING })
  const token = localStorage.getItem("token")
  axios
    .delete(`${api.lk.playlist.deletePlaylist}/${id}`, {
      headers: { Authorization: token },
    })
    .then(({ data }) => {
      dispatch({
        type: constants.LK_DELETE_PLAYLIST_SUCCESS,
      })
    })
    .catch(err => {
      dispatch({
        type: constants.LK_DELETE_PLAYLIST_SUCCESS,
        payload: err.response.data.message,
      })

      Store.addNotification({
        ...notifications.common,
        ...notifications.failed,
        message: err.response.data.message,
      })
    })
}

export const addPlaylist = playlistData => async dispatch => {
  dispatch({ type: constants.LK_ADD_PLAYLIST_LOADING })
  const token = localStorage.getItem("token")
  axios
    .post(api.lk.playlist.addPlaylist, playlistData, {
      headers: { Authorization: token },
    })
    .then(({ data }) => {
      dispatch({
        type: constants.LK_ADD_PLAYLIST_SUCCESS,
      })
    })
    .catch(err => {
      dispatch({
        type: constants.LK_ADD_PLAYLIST_FAILED,
        payload: err.response.data.message,
      })

      Store.addNotification({
        ...notifications.common,
        ...notifications.failed,
        message: err.response.data.message,
      })
    })
}

export const addSongToPlaylist = playlistSongData => async dispatch => {
  dispatch({ type: constants.LK_ADD_SONG_TO_PLAYLIST_LOADING })
  const token = localStorage.getItem("token")
  axios
    .post(api.lk.playlist.addSongToPlaylist, playlistSongData, {
      headers: { Authorization: token },
    })
    .then(({ data }) => {
      dispatch({
        type: constants.LK_ADD_SONG_TO_PLAYLIST_SUCCESS,
      })
    })
    .catch(err => {
      dispatch({
        type: constants.LK_ADD_SONG_TO_PLAYLIST_FAILED,
        payload: err.response.data.message,
      })

      Store.addNotification({
        ...notifications.common,
        ...notifications.failed,
        message: err.response.data.message,
      })
    })
}

export const deleteSongFromPlaylist = playlistSongData => async dispatch => {
  dispatch({ type: constants.LK_DELETE_SONG_FROM_PLAYLIST_LOADING })
  const token = localStorage.getItem("token")
  axios
    .post(api.lk.playlist.deleteSongFromPlaylist, playlistSongData, {
      headers: { Authorization: token },
    })
    .then(({ data }) => {
      dispatch({
        type: constants.LK_DELETE_SONG_FROM_PLAYLIST_SUCCESS,
      })
    })
    .catch(err => {
      dispatch({
        type: constants.LK_DELETE_SONG_FROM_PLAYLIST_FAILED,
        payload: err.response.data.message,
      })

      Store.addNotification({
        ...notifications.common,
        ...notifications.failed,
        message: err.response.data.message,
      })
    })
}
