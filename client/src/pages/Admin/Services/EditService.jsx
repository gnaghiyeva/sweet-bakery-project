import React, { useEffect, useRef, useState } from 'react'
import { useServiceContext } from '../../../context/ServiceContext'
import { useNavigate, useParams } from 'react-router-dom'
import { editService, getServiceById } from '../../../api/requests'
import Swal from "sweetalert2";
import { useFormik } from 'formik';
import { Alert, Button, CircularProgress, TextField } from '@mui/material';
import { serviceSchema } from '../../../validation/serviceSchema';
import favicon from '../../../assets/favicon-logo.png'
import { Helmet } from 'react-helmet';
const EditService = () => {
  const buttonRef = useRef()
  const [services, setServices] = useServiceContext()
  const [loading, setLoading] = useState(true)
  const { id } = useParams()
  const navigate = useNavigate();
  const [service, SetService] = useState({});

  useEffect(() => {
    getServiceById(id).then((res) => {
      SetService(res);
      formik.values.title = res.data.title;
      formik.values.description = res.data.description;
      formik.values.image = res.data.image;
      setLoading(false);

    })
  }, [id]);

  const handleEdit = async (values, actions) => {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('description', values.description);
    formData.append('image', values.image);

    await editService(id, formData);
    const updatedService = services.map((item) => {
      if (item.id === id) {
        return { ...item, image: values.image };
      }
      return item;
    });
    setServices(updatedService)

    Swal.fire({
      position: "top-end",
      icon: "success",
      title: `slider edited successfully`,
      showConfirmButton: false,
      timer: 1500,
    });

    navigate('/admin/services');
    actions.resetForm();
  }
  const formik = useFormik({
    initialValues: {
      title: service.title,
      description: service.description,
      image: service.image,

    },
    validationSchema: serviceSchema,
    onSubmit: handleEdit,
  });
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const base64Image = reader.result;
      formik.setFieldValue('image', file);
      console.log(base64Image)
    };

    reader.readAsDataURL(file);
  };
  return (
    <>
      <Helmet>
        <title>Editing Service</title>
        <link rel="icon" type="image/x-icon" href={favicon} />
      </Helmet>
      <h1 style={{textAlign: 'center', fontFamily: 'Lobster' }}>Editing Service</h1>
      {loading ? <div style={{ textAlign: 'center' }}><CircularProgress color="secondary" /></div> : <form onSubmit={formik.handleSubmit}>
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <TextField style={{ width: '300px' }} onChange={formik.handleChange} onBlur={formik.handleBlur} name='title' type='text' value={formik.values.title} id="outlined-basic" label="name" variant="outlined" /> <br />
          {formik.errors.title && formik.touched.title && (<Alert severity="warning">{formik.errors.title}</Alert>)}

          <TextField style={{ width: '500px' }} onChange={formik.handleChange} onBlur={formik.handleBlur} name='description' type='text' value={formik.values.description} id="outlined-basic" label="description" variant="outlined" /> <br />
          {formik.errors.description && formik.touched.description && (<Alert severity="warning">{formik.errors.description}</Alert>)}


          {formik.errors.image && formik.touched.image && (<Alert severity="warning">{formik.errors.image}</Alert>)}

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
          {formik.errors.image && formik.touched.image && (<span>{formik.errors.image}</span>)}
        </div>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Button type='submit' variant='contained' color='success'>Edit</Button>
        </div>
      </form>}
    </>
  )
}

export default EditService