import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Scrollbar, A11y } from "swiper"
import "swiper/css"
import { useDispatch, useSelector } from "react-redux"
import { getAllAlbums } from "../../../store/actions/admin/album"
import moment from "moment"
import { NavLink } from "react-router-dom"

export default function AlbumsSwiper() {
  const dispatch = useDispatch()
  React.useEffect(() => {
    dispatch(getAllAlbums())
  }, [])
  const getAllAlbumsState = useSelector(state => state.album.getAlbums)
  return (
    <div className='albumSwiper'>
      {getAllAlbumsState.success && getAllAlbumsState.data.length == 0 && (
        <div>Альбомов пока нет</div>
      )}
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={4}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
      >
        {getAllAlbumsState.success &&
          getAllAlbumsState.data.map(album => {
            return (
              <SwiperSlide key={album.id}>
                <NavLink state={album} to={`album/${album.id}`}>
                  <div className='albums_row_item'>
                    <div className='albums_row_item_block'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='50'
                        height='50'
                        fill='currentColor'
                        className='bi bi-music-note'
                        viewBox='0 0 16 16'
                      >
                        <path d='M9 13c0 1.105-1.12 2-2.5 2S4 14.105 4 13s1.12-2 2.5-2 2.5.895 2.5 2z' />
                        <path fillRule='evenodd' d='M9 3v10H8V3h1z' />
                        <path d='M8 2.82a1 1 0 0 1 .804-.98l3-.6A1 1 0 0 1 13 2.22V4L8 5V2.82z' />
                      </svg>
                    </div>
                    <div className='albums_row_item_text'>{album.name}</div>
                    <div className='albums_row_item_text'>
                      {moment(album.date).format("L")}
                    </div>
                  </div>
                </NavLink>
              </SwiperSlide>
            )
          })}
      </Swiper>
    </div>
  )
}
