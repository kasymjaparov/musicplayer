import axios from "axios"
import { Store } from "react-notifications-component"
import "animate.css"
import api from "../../../api"
import constants from "../../constants"
import notifications from "../../../utils/notifications"

export const getAllUsers = () => dispatch => {
  dispatch({ type: constants.GET_ALL_USERS_LOADING })
  const token = localStorage.getItem("token")
  axios
    .get(api.admin.users.getAll, { headers: { Authorization: token } })
    .then(({ data }) => {
      dispatch({ type: constants.GET_ALL_USERS_SUCCESS, payload: data.users })
    })
    .catch(err => {
      dispatch({
        type: constants.GET_ALL_USERS_FAILED,
        payload: err.response.data,
      })
      Store.addNotification({
        ...notifications.common,
        ...notifications.failed,
        message: err.response.data,
      })
    })
}
export const getUserSongs = id => dispatch => {
  dispatch({ type: constants.GET_USER_LIST_LOADING })
  const token = localStorage.getItem("token")
  axios
    .get(`${api.admin.users.getUserList}/${id}`, {
      headers: { Authorization: token },
    })
    .then(({ data }) => {
      dispatch({
        type: constants.GET_USER_LIST_SUCCESS,
        payload: data,
      })
    })
    .catch(err => {
      dispatch({
        type: constants.GET_USER_LIST_FAILED,
        payload: err.response.data.message,
      })
      Store.addNotification({
        ...notifications.common,
        ...notifications.failed,
        message: err.response.data.message,
      })
    })
}
