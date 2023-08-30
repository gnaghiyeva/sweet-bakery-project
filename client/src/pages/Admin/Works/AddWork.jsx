import React, { useRef, useState } from 'react'
import { workSchema } from '../../../validation/workSchema'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import Swal from "sweetalert2";
import { postWork } from '../../../api/requests';
import { Button, TextField } from '@mui/material';
const AddWork = () => {
    const navigate = useNavigate()
    const [selectedImages, setSelectedImages] = useState(null)
    const buttonRef = useRef()

    function handleSubmit(values, actions) {
        const formData = new FormData()
        formData.append("image", selectedImages)
        formData.append("title", values.title)
        formData.append("description", values.description)

        postWork(formData)
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: `work added successfully`,
            showConfirmButton: false,
            timer: 1500,
        });

        buttonRef.current.style.background = '#1976D2';
        buttonRef.current.textContent = 'Upload File';

        setSelectedImages(null)
        actions.resetForm()
        navigate('/admin/works')
    }
    const formik = useFormik({
        initialValues: {
            image: '',
            title: '',
            description: ''

        },

        validationSchema: workSchema,
        onSubmit: handleSubmit
    })
  return (
   <>
   <h1 style={{fontFamily:'sans-serif', textAlign:'center', fontFamily:'Lobster'}}>Add Work</h1>
            <form onSubmit={formik.handleSubmit} >

               <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', width: '60%', margin: '0 auto' }}>
                <TextField type='text' onChange={formik.handleChange} onBlur={formik.handleBlur} name='title' value={formik.values.title} id="outlined-basic" label="title" variant="outlined" />
                {formik.errors.title && formik.touched.title && (<Alert severity="warning">{formik.errors.title}</Alert>)}
                <br/>
                <TextField type='text' onChange={formik.handleChange} onBlur={formik.handleBlur} name='description' value={formik.values.description} id="outlined-basic" label="description" variant="outlined" />
                {formik.errors.description && formik.touched.description && (<Alert severity="warning">{formik.errors.description}</Alert>)}
                </div> <br/>
                <Button style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', width: '20%', margin: '0 auto' }}  ref={buttonRef} variant="contained" component="label" >
                    Upload File

                    <input value={formik.values.image}
                        onChange={(e) => {
                            buttonRef.current.style.background = 'red'
                            buttonRef.current.textContent = e.target.files[0].name;
                            formik.handleChange(e)
                            setSelectedImages(e.target.files[0])
                        }}
                        onBlur={formik.handleBlur} name='image' type='file' accept="image/*" hidden
                    />
                </Button> <br/>
                {formik.errors.image && formik.touched.image && (<Alert severity="warning">{formik.errors.image}</Alert>)}


                <Button style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', width: '10%', margin: '0 auto' }}   variant='contained' color='error' type='submit'>Add</Button>
            </form>
   </>
  )
}

export default AddWork