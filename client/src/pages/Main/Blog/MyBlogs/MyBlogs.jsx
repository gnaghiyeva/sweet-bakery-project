import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import { Grid } from '@mui/material';
import { getAllBlogs } from '../../../../api/requests';
import blogStyle from '../../../../style/blog.module.css'
import { Link } from 'react-router-dom';

const MyBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    getAllBlogs().then((res) => {
      setBlogs(res.data)
      console.log(res.data)
    })
  }, [])
  
  return (
    <section>
      <Grid container spacing={4} style={{ padding: '50px 100px' }}>
        {blogs && blogs.map((blog) => {
          return (
            <Grid item sm={12} xs={12} md={6} lg={4}>
              <Card>
                <Card.Img variant="top" src={blog.image} />
                <Card.Body>
                  <span className={blogStyle.blog_releaseDate}>{blog.releaseDate}</span>
                  <Card.Title >
                    <h5 className={blogStyle.blog_title}>{blog.title}</h5></Card.Title>
                  <Card.Text>
                    <p className={blogStyle.blog_description}>{blog.description}</p>
                    
                  </Card.Text>
                  <button style={{backgroundColor:blog.color, padding:'7px 30px', border:'none', color:'white', borderRadius:'5px', fontFamily:'Lobster', fontSize:'18px'}}><Link style={{color:'white', textDecoration:'none'}} to={`/blog/${blog._id}`}>Read More</Link></button>
                </Card.Body>
              </Card>
            </Grid>
          )
        })}
      </Grid>
    </section>
  )
}

export default MyBlogs