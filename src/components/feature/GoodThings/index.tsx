import Image from 'next/image'
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { DELAY_SWIPER_MS } from '@/configs/contants'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import { goodThingsItems } from './constants'

export const GoodThings = () => {
  return (
    <section className="GoodThings">
      <h2 className="GoodThings__title">good things</h2>
      <div className="GoodThings__swiper-container">
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
          spaceBetween={20}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            767: {
              slidesPerView: 3,
              slidesPerGroup: 3,
            },
            1520: {
              slidesPerView: 4,
              slidesPerGroup: 4,
            },
          }}
          navigation={{
            nextEl: 'GoodThings__swiper--next',
            prevEl: 'GoodThings__swiper--prev',
          }}
          autoplay={{
            delay: DELAY_SWIPER_MS,
          }}
          pagination={{
            clickable: true,
            el: '.GoodThings__swiper-bullets-items',
          }}
          className="GoodThings__swiper"
        >
          {goodThingsItems.map((item, index) => (
            <SwiperSlide key={`swiper-item-${index + 1}`}>
              <div className="GoodThings__card">
                <div className="GoodThings__card-picture">
                  <Image
                    className="GoodThings__card-image"
                    src={item.image.src}
                    fill
                    alt={item.image.alt}
                  />
                  <Image
                    className="GoodThings__card-icon"
                    src="/images/arrow-green.png"
                    width={49}
                    height={56}
                    alt="icone de card"
                  />
                </div>
                <div className="GoodThings__card-content">
                  <span className="GoodThings__card-tag">
                    {item.content.tag}
                  </span>
                  <span className="GoodThings__card-description">
                    {item.content.description}
                  </span>
                  <a href="#" className="GoodThings__card-readMore">
                    read more
                  </a>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="GoodThings__swiper-bullets">
          <div className="GoodThings__swiper-bullets-items" />
        </div>
      </div>
    </section>
  )
}
