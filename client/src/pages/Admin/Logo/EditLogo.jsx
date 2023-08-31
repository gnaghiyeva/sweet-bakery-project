import React, { useEffect, useRef, useState } from 'react'
import { useLogoContext } from '../../../context/LogoContext'
import { useNavigate, useParams } from 'react-router-dom'
import { editLogo, getLogoById } from '../../../api/requests'
import Swal from "sweetalert2";
import { useFormik } from 'formik';
import { Alert, Button, TextField } from '@mui/material';
import favicon from '../../../assets/favicon-logo.png'
import { Helmet } from 'react-helmet';
const EditLogo = () => {
  const [selectedImages, setSelectedImages] = useState({})
  const buttonRef = useRef()

  const [setLogos] = useLogoContext()
  const [loading, setLoading] = useState(true)
  const { id } = useParams()
  const navigate = useNavigate();
  const [logo, SetLogo] = useState({});

  useEffect(() => {
    getLogoById(id).then((res) => {
      SetLogo(res);
      formik.values.image = res.data.image;
      setLoading(false);

    })
  }, [id]);

  const handleEdit = async (values, actions) => {
    const formData = new FormData();
    formData.append('image', values.image);

    await editLogo(id, formData);

    Swal.fire({
      position: "top-end",
      icon: "success",
      title: `logo edited successfully`,
      showConfirmButton: false,
      timer: 1500,
    });

    navigate('/admin/logo');
    actions.resetForm();


  };
  const formik = useFormik({
    initialValues: {
      image: logo.image,

    },
    onSubmit: handleEdit,
  });
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const base64Image = reader.result;
      setSelectedImages(base64Image);
      formik.setFieldValue('image', file);
    };

    reader.readAsDataURL(file);
  };

  return (
    <>
      <Helmet>
        <title>Editing Logo</title>
        <link rel="icon" type="image/x-icon" href={favicon} />
      </Helmet>
      <h1 style={{ fontFamily: 'sans-serif', textAlign: 'center', fontFamily: 'Lobster' }}>Editing Logo</h1>
      {loading ? <div>loading...</div> : <form onSubmit={formik.handleSubmit}>
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>


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
          {formik.errors.image && formik.touched.image && (<Alert severity="warning">{formik.errors.image}</Alert>)}
        </div>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Button type='submit' variant='contained' color='success' disabled={formik.isSubmitting || Object.keys(formik.errors).length > 0}>Edit</Button>
        </div>
      </form>}
    </>
  )
}

export default EditLogo