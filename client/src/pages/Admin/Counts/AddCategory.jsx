import React from 'react'
import { useNavigate } from 'react-router-dom'
import { postCategory } from '../../../api/requests'
import { useFormik } from 'formik'
import { categorySchema } from '../../../validation/categorySchema'
import { Button, TextField } from '@mui/material'

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
        <h1 style={{fontFamily:'sans-serif', textAlign:'center', fontFamily:'Lobster'}}>Add Category</h1>

         <form onSubmit={formik.handleSubmit}>
         <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', width: '30%', margin: '0 auto' }}>
        <TextField placeholder='name' onChange={formik.handleChange} onBlur={formik.handleBlur} name='name' type='text' value={formik.values.name} id="outlined-basic" label="name" variant="outlined" />
        {formik.errors.name && formik.touched.name && (<span>{formik.errors.name}</span>)}
        <br/>
        <TextField placeholder='count' onChange={formik.handleChange} onBlur={formik.handleBlur} name='count' type='number' value={formik.values.count} id="outlined-basic" label="count" variant="outlined" />
        {formik.errors.count && formik.touched.count && (<span>{formik.errors.count}</span>)}
        </div> <br/>
        <Button style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', width: '20%', margin: '0 auto' }} type='submit' variant="contained">Add</Button>
      </form>
        </>
    )
}

export default AddCategory