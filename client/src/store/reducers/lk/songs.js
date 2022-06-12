import constants from "../../constants"

const initialState = {
  getAllSongs: {
    success: false,
    loading: false,
    failed: false,
    message: "",
    data: [],
  },
  addSong: {
    success: false,
    loading: false,
    failed: false,
    message: "",
  },
  deleteSong: {
    success: false,
    loading: false,
    failed: false,
    message: "",
  },
}
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.LK_GET_SONG_FROM_LIST_FAILED:
      return {
        ...state,
        getAllSongs: {
          success: false,
          loading: false,
          failed: true,
          message: action.payload,
        },
      }
    case constants.LK_GET_SONG_FROM_LIST_LOADING:
      return {
        ...state,
        getAllSongs: {
          success: false,
          loading: true,
          failed: false,
          message: "Загрузка...",
        },
      }
    case constants.LK_GET_SONG_FROM_LIST_SUCCESS:
      return {
        ...state,
        getAllSongs: {
          success: true,
          loading: false,
          failed: false,
          data: action.payload,
        },
      }

    case constants.LK_ADD_SONG_TO_LIST_FAILED:
      return {
        ...state,
        addSong: {
          success: false,
          loading: false,
          failed: true,
          message: action.payload,
        },
      }
    case constants.LK_ADD_SONG_TO_LIST_LOADING:
      return {
        ...state,
        addSong: {
          success: false,
          loading: true,
          failed: false,
          message: "Загрузка...",
        },
      }
    case constants.LK_ADD_SONG_TO_LIST_SUCCESS:
      return {
        ...state,
        addSong: {
          success: true,
          loading: false,
          failed: false,
        },
      }

    case constants.LK_DELETE_SONG_FROM_LIST_FAILED:
      return {
        ...state,
        deleteSong: {
          success: false,
          loading: false,
          failed: true,
          message: action.payload,
        },
      }
    case constants.LK_DELETE_SONG_FROM_LIST_LOADING:
      return {
        ...state,
        deleteSong: {
          success: false,
          loading: true,
          failed: false,
          message: "Загрузка...",
        },
      }
    case constants.LK_DELETE_SONG_FROM_LIST_SUCCESS:
      return {
        ...state,
        deleteSong: {
          success: true,
          loading: false,
          failed: false,
        },
      }
    default:
      return state
  }
}

export default reducer
