import React, { useEffect, useRef, useState } from 'react'
import { getBlogDetailById, postBlogDetail } from '../../../../api/requests'
import Swal from "sweetalert2";
import { useFormik } from 'formik';
import { blogdetailSchema } from '../../../../validation/blogDetailSchema';
import { useNavigate, useParams } from 'react-router-dom';
import { Alert, Button, TextField } from '@mui/material';
const AddDetail = () => {
  const navigate = useNavigate()
  const [selectedImages, setSelectedImages] = useState(null)
  const buttonRef = useRef()

  

  function handleSubmit(values, actions) {
    const formData = new FormData()
    
    formData.append("blogID", values.blogID)
    formData.append("image", selectedImages)
    formData.append("menuTitle", values.menuTitle)
    formData.append("menuDesc", values.menuDesc)
    formData.append("guestTitle", values.guestTitle)
    formData.append("guestDesc", values.guestTitle)

    postBlogDetail(formData)
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: `service added successfully`,
      showConfirmButton: false,
      timer: 1500,
    });

    buttonRef.current.style.background = '#1976D2';
    buttonRef.current.textContent = 'Upload File';

    setSelectedImages(null)
    actions.resetForm()
    navigate('/admin/blogs')
  }
  const formik = useFormik({
    initialValues: {
      image: '',
      releaseDate: '',
      title: '',
      description: '',
      color: ''


    },
    validationSchema: blogdetailSchema,
    onSubmit: handleSubmit
  })
  return (
    <>
      <h1 style={{ fontFamily: 'sans-serif', textAlign: 'center', fontFamily: 'Lobster' }}>Add Detail info</h1>
      <form onSubmit={formik.handleSubmit} >

        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', width: '60%', margin: '0 auto' }}>
          <TextField type='text' onChange={formik.handleChange} onBlur={formik.handleBlur} name='blogID' value={formik.values.blogID} id="outlined-basic" label="blogID" variant="outlined" />
          {formik.errors.blogID && formik.touched.blogID && (<><Alert severity="warning">{formik.errors.blogID}</Alert></>)}
           <br/>
          <TextField type='text' onChange={formik.handleChange} onBlur={formik.handleBlur} name='menuTitle' value={formik.values.menuTitle} id="outlined-basic" label="title" variant="outlined" />
          <br />
          <TextField type='date' onChange={formik.handleChange} onBlur={formik.handleBlur} name='guestTitle' value={formik.values.guestTitle} id="outlined-basic" placeholder="release date" variant="outlined" />
          <br />
          <TextField type='text' onChange={formik.handleChange} onBlur={formik.handleBlur} name='menuDesc' value={formik.values.menuDesc} id="outlined-basic" label="description" variant="outlined" />
          <br />
          <TextField type='text' onChange={formik.handleChange} onBlur={formik.handleBlur} name='guestDesc' value={formik.values.guestDesc} id="outlined-basic" label="color" variant="outlined" />
          <br />
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


        <Button style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', width: '10%', margin: '0 auto' }} variant='contained' color='error' type='submit' disabled={formik.isSubmitting || Object.keys(formik.errors).length > 0} >Add</Button>
      </form>
    </>
  )
}

export default AddDetail