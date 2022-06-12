import constants from "../../constants"

const initialState = {
  getGenres: {
    success: false,
    loading: false,
    failed: false,
    message: "",
    data: [],
  },
  addGenre: {
    success: false,
    loading: false,
    failed: false,
    message: "",
  },
  deleteGenre: {
    success: false,
    loading: false,
    failed: false,
    message: "",
  },
}
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.GET_GENRES_FAILED:
      return {
        ...state,
        getGenres: {
          success: false,
          loading: false,
          failed: true,
          message: action.payload,
        },
      }
    case constants.GET_GENRES_LOADING:
      return {
        ...state,
        getGenres: {
          success: false,
          loading: true,
          failed: false,
          message: "Загрузка...",
        },
      }
    case constants.GET_GENRES_SUCCESS:
      return {
        ...state,
        getGenres: {
          success: true,
          loading: false,
          failed: false,
          data: action.payload,
        },
      }

    case constants.ADD_GENRE_FAILED:
      return {
        ...state,
        addGenre: {
          success: false,
          loading: false,
          failed: true,
          message: action.payload,
        },
      }
    case constants.ADD_GENRE_LOADING:
      return {
        ...state,
        addGenre: {
          success: false,
          loading: true,
          failed: false,
          message: "Загрузка...",
        },
      }
    case constants.ADD_GENRE_SUCCESS:
      return {
        ...state,
        addGenre: {
          success: true,
          loading: false,
          failed: false,
        },
      }

    case constants.DELETE_GENRE_FAILED:
      return {
        ...state,
        deleteGenre: {
          success: false,
          loading: false,
          failed: true,
          message: action.payload,
        },
      }
    case constants.DELETE_GENRE_LOADING:
      return {
        ...state,
        deleteGenre: {
          success: false,
          loading: true,
          failed: false,
          message: "Загрузка...",
        },
      }
    case constants.DELETE_GENRE_SUCCESS:
      return {
        ...state,
        deleteGenre: {
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
