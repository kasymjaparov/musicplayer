import axios from "axios"
import { Store } from "react-notifications-component"
import "animate.css"
import api from "../../../api"
import constants from "../../constants"
import notifications from "../../../utils/notifications"

export const getFilteredSong = params => dispatch => {
  dispatch({ type: constants.GET_FILTERED_SONGS_LOADING })
  axios
    .get(
      `${api.admin.song.getFilteredSong}?name=${params.name}&genre=${params.genre}&author=${params.author}`
    )
    .then(({ data }) => {
      dispatch({
        type: constants.GET_FILTERED_SONGS_SUCCESS,
        payload: data.songs,
      })
    })
    .catch(err => {
      dispatch({
        type: constants.GET_FILTERED_SONGS_FAILED,
        payload: err.response.data,
      })
      Store.addNotification({
        ...notifications.common,
        ...notifications.failed,
        message: err.response.data,
      })
    })
}
