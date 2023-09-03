import React, { useEffect, useState } from 'react'
import { getAllContactSliders } from '../../../api/requests';
import { Pagination, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '../../../style/contactSlider.module.css'
import textStyle from '../../../style/contactSlider.module.css'
import { Bounce } from "react-awesome-reveal";

const ContactSlider = () => {
  const [sliders, setSliders] = useState([]);

  useEffect(() => {
    getAllContactSliders().then((res) => {
      setSliders(res.data)
    })
  }, [])
  return (
    <>
      <Swiper
        pagination={{
          type: 'progressbar',
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {sliders && sliders.map((slider) => (

          <SwiperSlide key={slider._id} style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.1)), url(${slider.image}) `, backgroundSize: 'cover', backgroundPosition: 'bottom', padding: '120px 0', width: '100%' }}>
            <article className={textStyle.slider_text}>
              <Bounce>
                <h1 className={textStyle.slider_text_h1}>{slider.title}</h1>
              </Bounce>
            </article>
          </SwiperSlide>
        ))}


      </Swiper>
    </>
  )
}

export default ContactSlider