import { combineReducers } from "redux"
import auth from "./auth"
import author from "./admin/author"
import genre from "./admin/genre"
import song from "./admin/song"
import album from "./admin/album"
import lk_song from "./lk/songs"
import lk_playlist from "./lk/playlist"
import users from "./admin/users"

export default combineReducers({
  auth,
  author,
  genre,
  song,
  album,
  lk_song,
  lk_playlist,
  users,
})
