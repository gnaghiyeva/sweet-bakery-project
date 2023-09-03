import React, { useEffect, useState } from 'react'
import { useContactContext } from '../../../../context/ContactContext';
import { editData, getDataById } from '../../../../api/requests';
import { useFormik } from 'formik';
import { ContactSchema } from '../../../../validation/ContactSchema';
import { useNavigate, useParams } from 'react-router-dom';
import { Alert, Button, CircularProgress, TextField } from '@mui/material';
import favicon from '../../../../assets/favicon-logo.png'
import { Helmet } from 'react-helmet';
import Swal from "sweetalert2";
const EditContact = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [datas, setDatas] = useContactContext();

  const [data, setData] = useState({})
  const [loading, setLoading] = useState([])

  useEffect(() => {
    getDataById(id).then((res) => {
      setData(res);
      formik.values.title = res.data.title;
      formik.values.desc = res.data.desc;
      formik.values.address = res.data.address;
      formik.values.city = res.data.city;
      formik.values.phone = res.data.phone;
      formik.values.email = res.data.email;
      formik.values.timein = res.data.timein;
      formik.values.timeout = res.data.timeout;
      formik.values.location = res.data.location;
      formik.values.meridiem = res.data.meridiem;

      setLoading(false);

    })
  }, [id]);

  const handleEdit = async (values, actions) => {
    setDatas(values)
    await editData(id, values)
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: `contact data edited successfully`,
      showConfirmButton: false,
      timer: 1500,
  });
    navigate('/admin/contact')
    actions.resetForm()
  }

  const formik = useFormik({
    initialValues: {
      title: data.title,
      desc: data.desc,
      address: data.address,
      city: data.city,
      phone: data.phone,
      email: data.email,
      timein: data.timein,
      timeout: data.timeout,
      location: data.location,
      meridiem: data.meridiem,
    },

    validationSchema: ContactSchema,
    onSubmit: handleEdit
  })
  return (
    <>
      <Helmet>
        <title>Editing Contact</title>
        <link rel="icon" type="image/x-icon" href={favicon} />
      </Helmet>
      <h1 style={{ textAlign: 'center', fontFamily: 'Lobster' }}>Editing Contact Information</h1>
      {loading ? <div style={{ textAlign: 'center' }}><CircularProgress color="secondary" /></div> : <form onSubmit={formik.handleSubmit}>
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <TextField style={{ width: '300px' }} onChange={formik.handleChange} onBlur={formik.handleBlur} name='title' type='text' value={formik.values.title} id="outlined-basic" label="title" variant="outlined" /> <br />
          {formik.errors.title && formik.touched.title && (<Alert severity="warning">{formik.errors.title}</Alert>)}

          <TextField style={{ width: '700px' }} type='text' onChange={formik.handleChange} onBlur={formik.handleBlur} name='desc' value={formik.values.desc} id="outlined-basic" label="description" variant="outlined" />
          {formik.errors.desc && formik.touched.desc && (<Alert severity="warning">{formik.errors.desc}</Alert>)}
          <br />
          <TextField style={{ width: '700px' }} type='text' onChange={formik.handleChange} onBlur={formik.handleBlur} name='location' value={formik.values.location} id="outlined-basic" label="location" variant="outlined" />
          {formik.errors.location && formik.touched.location && (<Alert severity="warning">{formik.errors.location}</Alert>)}
          <br />
          <TextField onChange={formik.handleChange} onBlur={formik.handleBlur} name='address' type='text' value={formik.values.address} id="outlined-basic" label="address" variant="outlined" /> <br />
          {formik.errors.address && formik.touched.address && (<Alert severity="warning">{formik.errors.address}</Alert>)}
          <br />

          <TextField onChange={formik.handleChange} onBlur={formik.handleBlur} name='timein' type='time' value={formik.values.timein} id="outlined-basic" label="Time in" variant="outlined" /> <br />
          {formik.errors.timein && formik.touched.timein && (<Alert severity="warning">{formik.errors.timein}</Alert>)}
          <br />
          
          <TextField onChange={formik.handleChange} onBlur={formik.handleBlur} name='timeout' type='time' value={formik.values.timeout} id="outlined-basic" label="Time out" variant="outlined" /> <br />
          {formik.errors.timeout && formik.touched.timeout && (<Alert severity="warning">{formik.errors.timeout}</Alert>)}

          <br />
          <TextField type='text' onChange={formik.handleChange} onBlur={formik.handleBlur} name='city' value={formik.values.city} id="outlined-basic" label="city" variant="outlined" />
          {formik.errors.city && formik.touched.city && (<Alert severity="warning">{formik.errors.city}</Alert>)}
          <br />
          <TextField type='email' onChange={formik.handleChange} onBlur={formik.handleBlur} name='email' value={formik.values.email} id="outlined-basic" label="email" variant="outlined" />
          {formik.errors.email && formik.touched.email && (<Alert severity="warning">{formik.errors.email}</Alert>)}
          <br />
          <TextField type='text' onChange={formik.handleChange} onBlur={formik.handleBlur} name='phone' value={formik.values.phone} id="outlined-basic" label="phone" variant="outlined" /> <br />
          {formik.errors.phone && formik.touched.phone && (<Alert severity="warning">{formik.errors.phone}</Alert>)}

        </div>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Button type='submit' variant='contained' color='success'>Edit</Button>
        </div>
      </form>}
    </>
  )
}

export default EditContact