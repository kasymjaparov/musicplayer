import constants from "../../constants"

const initialState = {
  getAllPlaylists: {
    success: false,
    loading: false,
    failed: false,
    message: "",
    data: [],
  },
  getPlaylist: {
    success: false,
    loading: false,
    failed: false,
    message: "",
    data: {},
  },
  deletePlaylist: {
    success: false,
    loading: false,
    failed: false,
    message: "",
  },
  addPlaylist: {
    success: false,
    loading: false,
    failed: false,
    message: "",
  },
  addSongToPlaylist: {
    success: false,
    loading: false,
    failed: false,
    message: "",
  },
  deleteSongFromPlaylist: {
    success: false,
    loading: false,
    failed: false,
    message: "",
  },
}
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.LK_GET_PLAYLISTS_FAILED:
      return {
        ...state,
        getAllPlaylists: {
          success: false,
          loading: false,
          failed: true,
          message: action.payload,
        },
      }
    case constants.LK_GET_PLAYLISTS_LOADING:
      return {
        ...state,
        getAllPlaylists: {
          success: false,
          loading: true,
          failed: false,
          message: "Загрузка...",
        },
      }
    case constants.LK_GET_PLAYLISTS_SUCCESS:
      return {
        ...state,
        getAllPlaylists: {
          success: true,
          loading: false,
          failed: false,
          data: action.payload,
        },
      }

    case constants.LK_GET_PLAYLIST_FAILED:
      return {
        ...state,
        getPlaylist: {
          success: false,
          loading: false,
          failed: true,
          message: action.payload,
        },
      }
    case constants.LK_GET_PLAYLIST_LOADING:
      return {
        ...state,
        getPlaylist: {
          success: false,
          loading: true,
          failed: false,
          message: "Загрузка...",
        },
      }
    case constants.LK_GET_PLAYLIST_SUCCESS:
      return {
        ...state,
        getPlaylist: {
          success: true,
          loading: false,
          failed: false,
          data: action.payload,
        },
      }

    case constants.LK_DELETE_PLAYLIST_FAILED:
      return {
        ...state,
        deletePlaylist: {
          success: false,
          loading: false,
          failed: true,
          message: action.payload,
        },
      }
    case constants.LK_DELETE_PLAYLIST_LOADING:
      return {
        ...state,
        deletePlaylist: {
          success: false,
          loading: true,
          failed: false,
          message: "Загрузка...",
        },
      }
    case constants.LK_DELETE_PLAYLIST_SUCCESS:
      return {
        ...state,
        deletePlaylist: {
          success: true,
          loading: false,
          failed: false,
        },
      }

    case constants.LK_ADD_PLAYLIST_FAILED:
      return {
        ...state,
        addPlaylist: {
          success: false,
          loading: false,
          failed: true,
          message: action.payload,
        },
      }
    case constants.LK_ADD_PLAYLIST_LOADING:
      return {
        ...state,
        addPlaylist: {
          success: false,
          loading: true,
          failed: false,
          message: "Загрузка...",
        },
      }
    case constants.LK_ADD_PLAYLIST_SUCCESS:
      return {
        ...state,
        addPlaylist: {
          success: true,
          loading: false,
          failed: false,
        },
      }

    case constants.LK_ADD_SONG_TO_PLAYLIST_FAILED:
      return {
        ...state,
        addSongToPlaylist: {
          success: false,
          loading: false,
          failed: true,
          message: action.payload,
        },
      }
    case constants.LK_ADD_SONG_TO_PLAYLIST_LOADING:
      return {
        ...state,
        addSongToPlaylist: {
          success: false,
          loading: true,
          failed: false,
          message: "Загрузка...",
        },
      }
    case constants.LK_ADD_SONG_TO_PLAYLIST_SUCCESS:
      return {
        ...state,
        addSongToPlaylist: {
          success: true,
          loading: false,
          failed: false,
        },
      }

    case constants.LK_DELETE_SONG_FROM_PLAYLIST_FAILED:
      return {
        ...state,
        deleteSongFromPlaylist: {
          success: false,
          loading: false,
          failed: true,
          message: action.payload,
        },
      }
    case constants.LK_DELETE_SONG_FROM_PLAYLIST_LOADING:
      return {
        ...state,
        deleteSongFromPlaylist: {
          success: false,
          loading: true,
          failed: false,
          message: "Загрузка...",
        },
      }
    case constants.LK_DELETE_SONG_FROM_PLAYLIST_SUCCESS:
      return {
        ...state,
        deleteSongFromPlaylist: {
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
