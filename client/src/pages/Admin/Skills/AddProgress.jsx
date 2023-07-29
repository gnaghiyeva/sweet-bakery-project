import React from 'react'
import { useNavigate } from 'react-router-dom'
import { postProgress } from '../../../api/requests'
import { useFormik } from 'formik'
import { Button, TextField } from '@mui/material'
import Swal from "sweetalert2";

const AddProgress = () => {
  const navigate = useNavigate()
  const handleSubmit = async(values,actions)=>{
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
    initialValues:{
      progressName:'',
      progressCount:'',
      
    },
    onSubmit:handleSubmit,
  })
  return (
    <>
    <h1 style={{fontFamily:'sans-serif', textAlign:'center', fontFamily:'Lobster'}}>Add Progress</h1>
    <form onSubmit={formik.handleSubmit} style={{display:'flex', flexDirection:'column', justifyContent:'center', width:'60%', margin:'0 auto'}}>
     
    
    <TextField name='progressName' type='text' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} id="outlined-basic" label="name" variant="outlined" /><br/>

    <TextField name='progressCount' type='number' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.more} id="outlined-basic" label="count" variant="outlined" /><br/>

    
     <Button variant='contained' color='success' type='submit'>Add</Button>
  </form>
  </>
  )
}

export default AddProgress