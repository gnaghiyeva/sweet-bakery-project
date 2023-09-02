import React, { useEffect, useRef, useState } from 'react'
import { useBlogDetailContext } from '../../../../context/BlogDetailContext'
import { useNavigate, useParams } from 'react-router-dom'
import { editBlogDetail, getBlogDetailById } from '../../../../api/requests'
import Swal from "sweetalert2";
import { useFormik } from 'formik';
import { blogdetailSchema } from '../../../../validation/blogDetailSchema';
import { Alert, Button, CircularProgress, TextField } from '@mui/material';
import { Helmet } from 'react-helmet';
import favicon from '../../../../assets/favicon-logo.png'
const EditBlogDetail = () => {
  const [selectedImages, setSelectedImages] = useState({})
  const buttonRef = useRef()

  const [setBlogdetails] = useBlogDetailContext()
  const [loading, setLoading] = useState(true)
  const { id } = useParams()
  const navigate = useNavigate();
  const [blogdetail, SetBlogDetail] = useState({});


  useEffect(() => {
    getBlogDetailById(id).then((res) => {
      SetBlogDetail(res.data);
      console.log('detail' + res.data)
      setLoading(false);
    });
  }, [id]);

  const handleEdit = async (values, actions) => {
    console.log('Edit button clicked');
    const formData = new FormData();
    formData.append('image', values.image);
    formData.append('description', values.description);
    formData.append('menuTitle', values.menuTitle);
    formData.append('guestTitle', values.guestTitle);
    formData.append('menuDesc', values.menuDesc);
    formData.append('guestDesc', values.guestDesc);

    await editBlogDetail(id, formData);

    Swal.fire({
      position: "top-end",
      icon: "success",
      title: `detail info edited successfully`,
      showConfirmButton: false,
      timer: 1500,
    });

    navigate('/admin/blogs');
    actions.resetForm();
  }
  const formik = useFormik({
    initialValues: {
      image: blogdetail?.image || '',
      description: blogdetail?.description || '',
      menuTitle: blogdetail?.menuTitle || '',
      guestTitle: blogdetail?.guestTitle || '',
      menuDesc: blogdetail?.menuDesc || '',
      guestDesc: blogdetail?.guestDesc || '',

    },
    validationSchema: blogdetailSchema,
    onSubmit: handleEdit,
  });
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const base64Image = reader.result;
      setSelectedImages(base64Image);
      formik.setFieldValue('image', file); // Seçilen resmi formik değerine atayın
    };

    reader.readAsDataURL(file);
  };
  return (
    <>
      <Helmet>
        <title>Editing Detail Page</title>
        <link rel="icon" type="image/x-icon" href={favicon} />
      </Helmet>
      <h1 style={{ fontFamily: 'sans-serif', textAlign: 'center', fontFamily: 'Lobster' }}>Editing Detail Info</h1>
      <small style={{ textAlign: 'center', display: 'block' }}>change everything</small>
      {loading ? <div style={{ textAlign: 'center' }}><CircularProgress color="secondary" /></div> : <form onSubmit={formik.handleSubmit}>
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

          <TextField style={{ width: '600px' }} onChange={formik.handleChange} onBlur={formik.handleBlur} name='menuTitle' type='text' value={formik.values.menuTitle} id="outlined-basic" label="menu title" variant="outlined" /> <br />
          {formik.errors.blogID && formik.touched.blogID && (<><Alert severity="warning">{formik.errors.blogID}</Alert></>)}
          <TextField style={{ width: '600px' }} type='text' onChange={formik.handleChange} onBlur={formik.handleBlur} name='description' value={formik.values.description} id="outlined-basic" label="description" variant="outlined" />
          <br />
          <TextField style={{ width: '600px' }} type='text' onChange={formik.handleChange} onBlur={formik.handleBlur} name='guestTitle' value={formik.values.guestTitle} id="outlined-basic" label="guest title" variant="outlined" />
          <br />
          <TextField style={{ width: '600px' }} type='text' onChange={formik.handleChange} onBlur={formik.handleBlur} name='menuDesc' value={formik.values.menuDesc} id="outlined-basic" label="menu description" variant="outlined" />
          <br />
          <TextField style={{ width: '600px' }} type='text' onChange={formik.handleChange} onBlur={formik.handleBlur} name='guestDesc' value={formik.values.guestDesc} id="outlined-basic" label="guest description" variant="outlined" />
          <br />


          <Button ref={buttonRef} variant="contained" component="label" >
            Edit File
            <input
              onChange={handleImageChange}
              onBlur={formik.handleBlur}
              name="image"
              type="file"
              accept="image/*"
              hidden
            />
          </Button>
          {/* <img src={formik.values.image} width={100} height={100} alt='logo'/>
     */}
          {/* {formik.errors.image && formik.touched.image && (<span>{formik.errors.image}</span>)} */}
        </div>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Button type='submit' variant='contained' color='success'>Edit</Button>
        </div>
      </form>}
    </>
  )
}

export default EditBlogDetail