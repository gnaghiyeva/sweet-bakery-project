import React, { useEffect, useRef, useState } from 'react'
import { useWorksContext } from '../../../context/WorkContext'
import { useNavigate, useParams } from 'react-router-dom'
import { editWork, getWorkById } from '../../../api/requests'
import Swal from "sweetalert2";
import { useFormik } from 'formik';
import { Alert, Button, CircularProgress, TextField } from '@mui/material';
import { workSchema } from '../../../validation/workSchema';
import { Helmet } from 'react-helmet';
import favicon from '../../../assets/favicon-logo.png'

const EditWork = () => {
  const buttonRef = useRef()
  const [works, setWorks] = useWorksContext()
  const [loading, setLoading] = useState(true)
  const { id } = useParams()
  const navigate = useNavigate();
  const [work, SetWork] = useState({});

  useEffect(() => {
    getWorkById(id).then((res) => {
      SetWork(res);
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

    await editWork(id, formData);
    const updatedWork = works.map((item) => {
      if (item.id === id) {
        return { ...item, image: values.image };
      }
      return item;
    });
    setWorks(updatedWork)

    Swal.fire({
      position: "top-end",
      icon: "success",
      title: `work edited successfully`,
      showConfirmButton: false,
      timer: 1500,
    });

    navigate('/admin/works');
    actions.resetForm();
  }
  const formik = useFormik({
    initialValues: {
      title: work.title,
      description: work.description,
      image: work.image,

    },
    validationSchema: workSchema,
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
        <title>Editing Work</title>
        <link rel="icon" type="image/x-icon" href={favicon} />
      </Helmet>
      <h1 style={{ textAlign: 'center', fontFamily: 'Lobster' }}>Editing Service</h1>
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

          {formik.errors.image && formik.touched.image && (<Alert severity="warning">{formik.errors.image}</Alert>)}
        </div>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Button type='submit' variant='contained' color='success'>Edit</Button>
        </div>
      </form>}
    </>

  )
}

export default EditWork