import constants from "../../constants"

const initialState = {
  getAllUsers: {
    success: false,
    loading: false,
    failed: false,
    message: "",
    data: [],
  },
  getUserSongs: {
    success: false,
    loading: false,
    failed: false,
    message: "",
    data: [],
  },
}
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.GET_ALL_USERS_FAILED:
      return {
        ...state,
        getAllUsers: {
          success: false,
          loading: false,
          failed: true,
          message: action.payload,
        },
      }
    case constants.GET_ALL_USERS_LOADING:
      return {
        ...state,
        getAllUsers: {
          success: false,
          loading: true,
          failed: false,
          message: "Загрузка...",
        },
      }
    case constants.GET_ALL_USERS_SUCCESS:
      return {
        ...state,
        getAllUsers: {
          success: true,
          loading: false,
          failed: false,
          data: action.payload,
        },
      }

    case constants.GET_USER_LIST_FAILED:
      return {
        ...state,
        getUserSongs: {
          success: false,
          loading: false,
          failed: true,
          message: action.payload,
        },
      }
    case constants.GET_USER_LIST_LOADING:
      return {
        ...state,
        getUserSongs: {
          success: false,
          loading: true,
          failed: false,
          message: "Загрузка...",
        },
      }
    case constants.GET_USER_LIST_SUCCESS:
      return {
        ...state,
        getUserSongs: {
          success: true,
          loading: false,
          failed: false,
          data: action.payload,
        },
      }
    default:
      return state
  }
}

export default reducer
