import React, { useEffect, useState } from 'react'
import { deleteBlogSlider, getAllBlogSliders } from '../../../../api/requests'
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Swal from "sweetalert2";
import { Grid } from '@mui/material';
import favicon from '../../../../assets/favicon-logo.png'
import { Helmet } from 'react-helmet';

const AdminBlogSliders = () => {
  const [sliders, setSliders] = useState([])
  useEffect(() => {
    getAllBlogSliders().then((res) => {
      setSliders(res.data)
      console.log(res.data)
    })
  }, [sliders])
  return (
    <>
      <Helmet>
        <title>Admin Sliders</title>
        <link rel="icon" type="image/x-icon" href={favicon} />
      </Helmet>
      <nav class="navbar navbar-light bg-light">
        <a class="navbar-brand" href="!#" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '0 20px' }}>
          <img src="https://static.thenounproject.com/png/396915-200.png" width="30" height="30" class="d-inline-block align-top" alt="" />
          <a class="nav-item nav-link active" href="!#"  ><Link style={{ color: 'black', textDecoration: 'none' }} to='/admin/blogs/slider/add-slider'>Add Slider</Link> <span class="sr-only"></span></a>
        </a>
      </nav>
      <Grid container spacing={2} style={{ padding: '30px 40px' }}>
        {sliders && sliders.map((slider) => {
          return (
            <Grid item sm={6} xs={12} md={3}>
              <Card style={{ height: '350px' }}>
                <Card.Img variant="top" src={slider.image} height={200} />
                <Card.Body>
                  <Card.Title>{slider.title}</Card.Title>

                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <button type="button" class="btn btn-outline-danger" onClick={() => {
                      Swal.fire({
                        title: 'Are you sure?',
                        text: "You won't be able to revert this!",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Yes, delete it!'
                      }).then((result) => {
                        if (result.isConfirmed) {
                          deleteBlogSlider(slider._id).then((res) => {
                            Swal.fire(
                              'Deleted!',
                              'Your file has been deleted.',
                              'success'
                            )

                          })
                          setSliders(sliders.filter((x) => x._id !== slider._id))
                        }
                      })
                    }}>Delete</button>
                    <button type="button" class="btn btn-outline-info"><Link style={{ textDecoration: 'none' }} to={`/admin/blogs/slider/edit/${slider._id}`}>Edit</Link></button>
                  </div>
                </Card.Body>
              </Card>
            </Grid>
          )
        })}

      </Grid>
    </>
  )
}

export default AdminBlogSliders