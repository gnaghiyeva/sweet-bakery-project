import React from 'react'
import { useNavigate } from 'react-router-dom'
import { postCategory } from '../../../api/requests'
import { useFormik } from 'formik'
import { categorySchema } from '../../../validation/categorySchema'
import { Alert, Button, TextField } from '@mui/material'
import { Helmet } from 'react-helmet'
import favicon from '../../../assets/favicon-logo.png'
const AddCategory = () => {
  const navigate = useNavigate()
  const handleSubmit = async (values, actions) => {
    await postCategory(values)
    actions.resetForm()
    navigate('/admin/categories')
  }

  const formik = useFormik({
    initialValues: {
      name: '',
      count: ''
    },
    validationSchema: categorySchema,
    onSubmit: handleSubmit
  })

  return (
    <>
      <Helmet>
        <title>Adding Category</title>
        <link rel="icon" type="image/x-icon" href={favicon} />
      </Helmet>
      <h1 style={{textAlign: 'center', fontFamily: 'Lobster' }}>Add Category</h1>

      <form onSubmit={formik.handleSubmit}>
        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', width: '30%', margin: '0 auto' }}>
          <TextField placeholder='name' onChange={formik.handleChange} onBlur={formik.handleBlur} name='name' type='text' value={formik.values.name} id="outlined-basic" label="name" variant="outlined" />
          {formik.errors.name && formik.touched.name && (<Alert severity="warning">{formik.errors.name}</Alert>)}
          <br />
          <TextField placeholder='count' onChange={formik.handleChange} onBlur={formik.handleBlur} name='count' type='number' value={formik.values.count} id="outlined-basic" label="count" variant="outlined" />
          {formik.errors.count && formik.touched.count && (<Alert severity="warning">{formik.errors.count}</Alert>)}
        </div> <br />
        <Button style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', width: '20%', margin: '0 auto' }} type='submit' variant="contained" disabled={formik.isSubmitting || Object.keys(formik.errors).length > 0}>Add</Button>
      </form>
    </>
  )
}

export default AddCategory