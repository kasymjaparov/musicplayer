import axios from "axios"
import { Store } from "react-notifications-component"
import "animate.css"
import api from "../../../api"
import constants from "../../constants"
import notifications from "../../../utils/notifications"

export const addAuthor = author => async dispatch => {
  dispatch({ type: constants.ADD_AUTHORS_LOADING })
  const token = localStorage.getItem("token")
  axios
    .post(api.admin.author.add, author, { headers: { Authorization: token } })
    .then(({ data }) => {
      console.log(data)
      dispatch({ type: constants.ADD_AUTHORS_SUCCESS })
      Store.addNotification({
        ...notifications.common,
        ...notifications.success,
        message: data.message,
      })
    })
    .catch(err => {
      dispatch({
        type: constants.ADD_AUTHORS_FAILED,
        payload: err.response.data.message,
      })
      Store.addNotification({
        ...notifications.common,
        ...notifications.failed,
        message: err.response.data.message,
      })
    })
}

export const getAllAuthors = () => async dispatch => {
  dispatch({ type: constants.GET_AUTHORS_LOADING })
  const token = localStorage.getItem("token")
  axios
    .get(api.admin.author.getAll, { headers: { Authorization: token } })
    .then(({ data }) => {
      dispatch({ type: constants.GET_AUTHORS_SUCCESS, payload: data.authors })
      // Store.addNotification({
      //   ...notifications.common,
      //   ...notifications.success,
      //   message: data.message,
      // })
    })
    .catch(err => {
      dispatch({
        type: constants.GET_AUTHORS_FAILED,
        payload: err.response.data,
      })
      Store.addNotification({
        ...notifications.common,
        ...notifications.failed,
        message: err.response.data,
      })
    })
}
