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
  addSongToAlbum: {
    success: false,
    loading: false,
    failed: false,
    message: "",
  },
  deleteSongFromAlbum: {
    success: false,
    loading: false,
    failed: false,
    message: "",
  },
  getFilteredSongs: {
    success: false,
    loading: false,
    failed: false,
    message: "",
  },
}
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.GET_ALL_SONGS_FAILED:
      return {
        ...state,
        getAllSongs: {
          success: false,
          loading: false,
          failed: true,
          message: action.payload,
        },
      }
    case constants.GET_ALL_SONGS_LOADING:
      return {
        ...state,
        getAllSongs: {
          success: false,
          loading: true,
          failed: false,
          message: "Загрузка...",
        },
      }
    case constants.GET_ALL_SONGS_SUCCESS:
      return {
        ...state,
        getAllSongs: {
          success: true,
          loading: false,
          failed: false,
          data: action.payload,
        },
      }

    case constants.GET_FILTERED_SONGS_LOADING:
      return {
        ...state,
        getFilteredSongs: {
          success: false,
          loading: true,
          failed: false,
          message: "Загрузка...",
        },
      }
    case constants.GET_FILTERED_SONGS_FAILED:
      return {
        ...state,
        getFilteredSongs: {
          success: false,
          loading: false,
          failed: true,
          message: action.payload,
        },
      }
    case constants.GET_FILTERED_SONGS_SUCCESS:
      return {
        ...state,
        getAllSongs: {
          success: true,
          loading: false,
          failed: false,
          data: action.payload,
        },
      }

    case constants.ADD_SONG_FAILED:
      return {
        ...state,
        addSong: {
          success: false,
          loading: false,
          failed: true,
          message: action.payload,
        },
      }
    case constants.ADD_SONG_LOADING:
      return {
        ...state,
        addSong: {
          success: false,
          loading: true,
          failed: false,
          message: "Загрузка...",
        },
      }
    case constants.ADD_SONG_SUCCESS:
      return {
        ...state,
        addSong: {
          success: true,
          loading: false,
          failed: false,
        },
      }

    case constants.ADD_SONG_TO_ALBUM_FAILED:
      return {
        ...state,
        addSongToAlbum: {
          success: false,
          loading: false,
          failed: true,
          message: action.payload,
        },
      }
    case constants.ADD_SONG_TO_ALBUM_LOADING:
      return {
        ...state,
        addSongToAlbum: {
          success: false,
          loading: true,
          failed: false,
          message: "Загрузка...",
        },
      }
    case constants.ADD_SONG_TO_ALBUM_SUCCESS:
      return {
        ...state,
        addSongToAlbum: {
          success: true,
          loading: false,
          failed: false,
        },
      }

    case constants.DELETE_SONG_FROM_ALBUM_FAILED:
      return {
        ...state,
        deleteSongFromAlbum: {
          success: false,
          loading: false,
          failed: true,
          message: action.payload,
        },
      }
    case constants.DELETE_SONG_FROM_ALBUM_LOADING:
      return {
        ...state,
        deleteSongFromAlbum: {
          success: false,
          loading: true,
          failed: false,
          message: "Загрузка...",
        },
      }
    case constants.DELETE_SONG_FROM_ALBUM_SUCCESS:
      return {
        ...state,
        deleteSongFromAlbum: {
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
