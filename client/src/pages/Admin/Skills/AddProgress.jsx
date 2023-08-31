import React from 'react'
import { useNavigate } from 'react-router-dom'
import { postProgress } from '../../../api/requests'
import { useFormik } from 'formik'
import { Alert, Button, TextField } from '@mui/material'
import Swal from "sweetalert2";
import { progressSchema } from '../../../validation/progressSchema'
import { Helmet } from 'react-helmet'
import favicon from '../../../assets/favicon-logo.png'
const AddProgress = () => {
  const navigate = useNavigate()
  const handleSubmit = async (values, actions) => {
    await postProgress(values)
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: `progress added successfully`,
      showConfirmButton: false,
      timer: 1500,
    });
    actions.resetForm()
    navigate('/admin/skills')
  }
  const formik = useFormik({
    initialValues: {
      progressName: '',
      progressCount: '',

    },
    validationSchema: progressSchema,
    onSubmit: handleSubmit,
  })
  return (
    <>
      <Helmet>
        <title>Adding Progress</title>
        <link rel="icon" type="image/x-icon" href={favicon} />
      </Helmet>
      <h1 style={{ fontFamily: 'sans-serif', textAlign: 'center', fontFamily: 'Lobster' }}>Add Progress</h1>
      <form onSubmit={formik.handleSubmit} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '60%', margin: '0 auto' }}>


        <TextField name='progressName' type='text' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} id="outlined-basic" label="name" variant="outlined" /><br />
        {formik.errors.progressName && formik.touched.progressName && (<Alert severity="warning">{formik.errors.progressName}</Alert>)}

        <TextField name='progressCount' type='number' min={0} onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.more} id="outlined-basic" label="count" variant="outlined" /><br />
        {formik.errors.progressCount && formik.touched.progressCount && (<Alert severity="warning">{formik.errors.progressCount}</Alert>)}


        <Button variant='contained' color='success' type='submit' disabled={formik.isSubmitting || Object.keys(formik.errors).length > 0}>Add</Button>
      </form>
    </>
  )
}

export default AddProgress