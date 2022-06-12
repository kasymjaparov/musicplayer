const root = "http://localhost:5000"
const api = {
  auth: {
    login: `${root}/api/user/login`,
    registration: `${root}/api/user/reg`,
    getRole: `${root}/api/user/getRole`,
  },
  admin: {
    author: {
      add: `${root}/api/author/add`,
      getAll: `${root}/api/author/getAllAuthors`,
    },
    genre: {
      getAll: `${root}/api/genre/getAllGenres`,
      add: `${root}/api/genre/addGenre`,
      delete: `${root}/api/genre/deleteGenre`,
    },
    song: {
      getAll: `${root}/api/songs/getAllSongs`,
      add: `${root}/api/songs/addSong`,
      addSongToAlbum: `${root}/api/songs/addSongToAlbum`,
      deleteSongFromAlbum: `${root}/api/songs/deleteSongFromAlbum`,
      getFilteredSong: `${root}/api/songs/getSongsByQueries`,
    },
    album: {
      getAll: `${root}/api/albums/getAllAlbums`,
      getById: `${root}/api/albums/getAlbumById`,
      add: `${root}/api/albums/addAlbum`,
    },
    users: {
      getAll: `${root}/api/adminUsers/getAllUsers`,
      getUserList: `${root}/api/adminUsers/getUserList`,
    },
  },
  lk: {
    song: {
      getMyList: `${root}/api/lk/getMySongs`,
      addToList: `${root}/api/lk/addSongToList`,
      delete: `${root}/api/lk/deleteSongFromList`,
    },
    playlist: {
      getPlaylists: `${root}/api/lk/getPlaylists`,
      getPlaylist: `${root}/api/lk/getPlaylist`,
      deletePlaylist: `${root}/api/lk/deletePlaylist`,
      addPlaylist: `${root}/api/lk/addPlaylist`,
      addSongToPlaylist: `${root}/api/lk/addSongToPlaylist`,
      deleteSongFromPlaylist: `${root}/api/lk/deleteSongFromPlaylist`,
    },
  },
}
export default api
