import constants from "../../constants"

const initialState = {
  addAuthor: {
    success: false,
    loading: false,
    failed: false,
    message: "",
  },
  getAuthors: {
    success: false,
    loading: false,
    failed: false,
    message: "",
    data: [],
  },
}
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.ADD_AUTHORS_FAILED:
      return {
        ...state,
        addAuthor: {
          success: false,
          loading: false,
          failed: true,
          message: action.payload,
        },
      }
    case constants.ADD_AUTHORS_LOADING:
      return {
        ...state,
        addAuthor: {
          success: false,
          loading: true,
          failed: false,
          message: "Загрузка...",
        },
      }
    case constants.ADD_AUTHORS_SUCCESS:
      return {
        ...state,
        addAuthor: {
          success: true,
          loading: false,
          failed: false,
        },
      }

    case constants.GET_AUTHORS_FAILED:
      return {
        ...state,
        getAuthors: {
          success: false,
          loading: false,
          failed: true,
          message: action.payload,
        },
      }
    case constants.GET_AUTHORS_LOADING:
      return {
        ...state,
        getAuthors: {
          success: false,
          loading: true,
          failed: false,
          message: "Загрузка...",
        },
      }
    case constants.GET_AUTHORS_SUCCESS:
      return {
        ...state,
        getAuthors: {
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
