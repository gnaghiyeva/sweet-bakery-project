import React, { useEffect, useState } from 'react'
import { Pagination, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '../../../../style/slider.module.css'
import { getAllSliders } from '../../../../api/requests';
import textStyle from '../../../../style/slider.module.css'
import { Bounce } from "react-awesome-reveal";
const Sliders = () => {
  const [sliders, setSliders] = useState([]);
  useEffect(() => {
    getAllSliders().then((res) => {
      setSliders(res.data)
      console.log(res.data)
    })
  }, [])
  return (
    <Swiper
      pagination={{
        type: 'progressbar',
      }}
      navigation={true}
      modules={[Pagination, Navigation]}
      className="mySwiper"
    >
      {sliders && sliders.map((slider) => (

        <SwiperSlide key={slider._id} style={{ backgroundImage: `url(${slider.image})`, backgroundSize: 'cover', backgroundPosition: 'center', padding: '250px 0', width: '100%' }}>
          <article className={textStyle.slider_text}>
            <Bounce>
              <h1 className={textStyle.slider_text_h1}>{slider.title}</h1>
            </Bounce>
          </article>
        </SwiperSlide>
      ))}
      {/* <SwiperSlide>Slide 2</SwiperSlide>
    <SwiperSlide>Slide 3</SwiperSlide> */}

    </Swiper>
  )
}

export default Sliders