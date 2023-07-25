import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useCategoryContext } from '../../../context/CategoryContext';
import { editCategory, getCategoryById } from '../../../api/requests';
import { categorySchema } from '../../../validation/categorySchema';
import { useFormik } from 'formik';
import { Button, CircularProgress, TextField } from '@mui/material';

const EditCategory = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [categories, setCategories] = useCategoryContext();
    
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

      const handleEdit = async(values,actions)=>{
        setCategories(values)
        await editCategory(id,values)
        navigate('/admin/categories')
        actions.resetForm()
      }
    
      const formik = useFormik({
        initialValues:{
            name:category.name,
            count:category.count,
           },
    
           validationSchema: categorySchema,
           onSubmit:handleEdit
      })
  return (
    <>
    <h1 style={{fontFamily:'sans-serif', textAlign:'center', fontFamily:'Lobster'}}>Editing Service</h1>
    {loading ? <div style={{textAlign:'center'}}><CircularProgress color="secondary" /></div> : <form onSubmit={formik.handleSubmit}>
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <TextField style={{width:'300px'}} onChange={formik.handleChange} onBlur={formik.handleBlur} name='name' type='text' value={formik.values.name} id="outlined-basic" label="name" variant="outlined" /> <br/>
          {formik.errors.name && formik.touched.name && (<span>{formik.errors.name}</span>)}

          <TextField style={{width:'500px'}} onChange={formik.handleChange} onBlur={formik.handleBlur} name='count' type='number' value={formik.values.count} id="outlined-basic" label="count" variant="outlined" /> <br/>
          {formik.errors.count && formik.touched.count && (<span>{formik.errors.count}</span>)}


          
         
        </div>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Button type='submit' variant='contained' color='success' disabled={formik.isSubmitting || Object.keys(formik.errors).length > 0}>Edit</Button>
        </div>
      </form>}
   </>
  )
}

export default EditCategory