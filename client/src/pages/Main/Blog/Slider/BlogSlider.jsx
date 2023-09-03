import React, { useEffect, useState } from 'react'
import { getAllBlogSliders } from '../../../../api/requests';
import { Pagination, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import  '../../../../style/blogSlider.module.css'
import textStyle from '../../../../style/blogSlider.module.css'
import { Bounce } from "react-awesome-reveal";

const BlogSlider = () => {
  const [sliders, setSliders] = useState([]);

  useEffect(() => {
    getAllBlogSliders().then((res) => {
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
    {sliders && sliders.map((slider)=>(

    <SwiperSlide key={slider._id} style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${slider.image}) `, backgroundSize: 'cover', backgroundPosition: 'center', padding:'100px 0', width:'100%' }}>
      <article className={textStyle.slider_text}>
      <Bounce>
        <h1 className={textStyle.slider_text_h1}>{slider.title}</h1>
        </Bounce>
      </article>
    </SwiperSlide>
    ))}
     
  </Swiper>
  )
}

export default BlogSlider