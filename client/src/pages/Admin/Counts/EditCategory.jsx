import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useCategoryContext } from '../../../context/CategoryContext';
import { editCategory, getCategoryById } from '../../../api/requests';
import { categorySchema } from '../../../validation/categorySchema';
import { useFormik } from 'formik';
import { Alert, Button, CircularProgress, TextField } from '@mui/material';
import { Helmet } from 'react-helmet';
import favicon from '../../../assets/favicon-logo.png'
const EditCategory = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [setCategories] = useCategoryContext();

  const [category, setCategory] = useState({})
  const [loading, setLoading] = useState([])

  useEffect(() => {
    getCategoryById(id).then((res) => {
      setCategory(res);
      formik.values.name = res.data.name;
      formik.values.count = res.data.count;

      setLoading(false);

    })
  }, [id]);

  const handleEdit = async (values, actions) => {
    setCategories(values)
    await editCategory(id, values)
    navigate('/admin/categories')
    actions.resetForm()
  }

  const formik = useFormik({
    initialValues: {
      name: category.name,
      count: category.count,
    },

    validationSchema: categorySchema,
    onSubmit: handleEdit
  })
  return (
    <>
      <Helmet>
        <title>Editing Category</title>
        <link rel="icon" type="image/x-icon" href={favicon} />
      </Helmet>
      <h1 style={{textAlign: 'center', fontFamily: 'Lobster' }}>Editing Category</h1>
      {loading ? <div style={{ textAlign: 'center' }}><CircularProgress color="secondary" /></div> : <form onSubmit={formik.handleSubmit}>
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <TextField style={{ width: '300px' }} onChange={formik.handleChange} onBlur={formik.handleBlur} name='name' type='text' value={formik.values.name} id="outlined-basic" label="name" variant="outlined" /> <br />
          {formik.errors.name && formik.touched.name && (<Alert severity="warning">{formik.errors.name}</Alert>)}

          <TextField style={{ width: '500px' }} onChange={formik.handleChange} onBlur={formik.handleBlur} name='count' type='number' value={formik.values.count} id="outlined-basic" label="count" variant="outlined" /> <br />
          {formik.errors.count && formik.touched.count && (<Alert severity="warning">{formik.errors.count}</Alert>)}




        </div>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Button type='submit' variant='contained' color='success'>Edit</Button>
        </div>
      </form>}
    </>
  )
}

export default EditCategory