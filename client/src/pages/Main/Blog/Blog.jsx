import React from 'react'
import MyBlogs from './MyBlogs/MyBlogs'
import BlogSlider from './Slider/BlogSlider'
import { Helmet } from 'react-helmet'
import favicon from '../../../assets/favicon-logo.png'
const Blog = () => {
  return (
    <>
      <Helmet>
        <title>Blog</title>
        <link rel="icon" type="image/x-icon" href={favicon} />
      </Helmet>
    <BlogSlider/>
    <MyBlogs/>
    </>
  )
}

export default Blog