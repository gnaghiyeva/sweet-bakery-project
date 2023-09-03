import React, { useRef, useState } from 'react'
import { blogSliderSchema } from '../../../../validation/blogSliderSchema'
import { useNavigate } from 'react-router-dom'
import Swal from "sweetalert2";
import { postBlogSlider } from '../../../../api/requests';
import { useFormik } from 'formik';
import { Alert, Button, TextField } from '@mui/material';
import { Helmet } from 'react-helmet';
import favicon from '../../../../assets/favicon-logo.png'
const AddBlogSlider = () => {
  const navigate = useNavigate()
  const [selectedImages, setSelectedImages] = useState(null)
  const buttonRef = useRef()


  function handleSubmit(values, actions) {
    const formData = new FormData()
    formData.append("image", selectedImages)
    formData.append("title", values.title)

    postBlogSlider(formData)
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: `slider added successfully`,
      showConfirmButton: false,
      timer: 1500,
    });

    buttonRef.current.style.background = '#1976D2';
    buttonRef.current.textContent = 'Upload File';

    setSelectedImages(null)
    actions.resetForm()
    navigate('/admin/blogs/slider')
  }
  const formik = useFormik({
    initialValues: {
      image: '',
      title: '',

    },

    validationSchema: blogSliderSchema,
    onSubmit: handleSubmit
  })

  return (
    <>
      <Helmet>
        <title>Adding Slider</title>
        <link rel="icon" type="image/x-icon" href={favicon} />
      </Helmet>
      <h1 style={{textAlign: 'center', fontFamily: 'Lobster' }}>Add Slider</h1>
      <form onSubmit={formik.handleSubmit} >

        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', width: '60%', margin: '0 auto' }}>
          <TextField type='text' onChange={formik.handleChange} onBlur={formik.handleBlur} name='title' value={formik.values.title} id="outlined-basic" label="title" variant="outlined" />
          {formik.errors.title && formik.touched.title && (<Alert severity="warning">{formik.errors.title}</Alert>)}
        </div> <br />
        <Button style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', width: '20%', margin: '0 auto' }} ref={buttonRef} variant="contained" component="label" >
          Upload File

          <input value={formik.values.image}
            onChange={(e) => {
              buttonRef.current.style.background = 'red'
              buttonRef.current.textContent = e.target.files[0].name;
              formik.handleChange(e)
              setSelectedImages(e.target.files[0])
            }}
            onBlur={formik.handleBlur} name='image' type='file' accept="image/*" hidden
          />
        </Button> <br />
        {formik.errors.image && formik.touched.image && (<Alert severity="warning">{formik.errors.image}</Alert>)}


        <Button style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', width: '10%', margin: '0 auto' }} variant='contained' color='error' type='submit' disabled={formik.isSubmitting || Object.keys(formik.errors).length > 0}>Add</Button>
      </form>
    </>
  )
}

export default AddBlogSlider