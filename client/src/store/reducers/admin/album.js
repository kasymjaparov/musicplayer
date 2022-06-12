import constants from "../../constants"

const initialState = {
  addAlbum: {
    success: false,
    loading: false,
    failed: false,
    message: "",
  },
  getAlbums: {
    success: false,
    loading: false,
    failed: false,
    message: "",
    data: [],
  },
  getAlbum: {
    success: false,
    loading: false,
    failed: false,
    message: "",
    data: {},
  },
}
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.ADD_ALBUM_FAILED:
      return {
        ...state,
        addAlbum: {
          success: false,
          loading: false,
          failed: true,
          message: action.payload,
        },
      }
    case constants.ADD_ALBUM_LOADING:
      return {
        ...state,
        addAlbum: {
          success: false,
          loading: true,
          failed: false,
          message: "Загрузка...",
        },
      }
    case constants.ADD_ALBUM_SUCCESS:
      return {
        ...state,
        addAlbum: {
          success: true,
          loading: false,
          failed: false,
        },
      }

    case constants.GET_ALL_ALBUMS_FAILED:
      return {
        ...state,
        getAlbums: {
          success: false,
          loading: false,
          failed: true,
          message: action.payload,
        },
      }
    case constants.GET_ALL_ALBUMS_LOADING:
      return {
        ...state,
        getAlbums: {
          success: false,
          loading: true,
          failed: false,
          message: "Загрузка...",
        },
      }
    case constants.GET_ALL_ALBUMS_SUCCESS:
      return {
        ...state,
        getAlbums: {
          success: true,
          loading: false,
          failed: false,
          data: action.payload,
        },
      }

    case constants.GET_ONE_ALBUM_FAILED:
      return {
        ...state,
        getAlbum: {
          success: false,
          loading: false,
          failed: true,
          message: action.payload,
        },
      }
    case constants.GET_ONE_ALBUM_LOADING:
      return {
        ...state,
        getAlbum: {
          success: false,
          loading: true,
          failed: false,
          message: "Загрузка...",
        },
      }
    case constants.GET_ONE_ALBUM_SUCCESS:
      return {
        ...state,
        getAlbum: {
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
