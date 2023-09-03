import React, { useEffect, useState } from 'react'
import { Pagination, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '../../../style/productSlider.module.css'
import textStyle from '../../../style/productSlider.module.css'
import { Bounce } from "react-awesome-reveal";
import { getAllProductSliders } from '../../../api/requests';

const ShopSlider = () => {
  const [sliders, setSliders] = useState([]);
  useEffect(() => {
    getAllProductSliders().then((res) => {
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

        <SwiperSlide key={slider._id} style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), url(${slider.image}) `, backgroundSize: 'cover', backgroundPosition: 'center', padding: '140px 0', width: '100%' }}>
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

export default ShopSlider