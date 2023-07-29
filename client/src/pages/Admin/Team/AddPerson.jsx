import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { postPerson } from '../../../api/requests'
import Swal from "sweetalert2";
import { useFormik } from 'formik';
import { personSchema } from '../../../validation/personSchema';
import { Button, TextField } from '@mui/material';
const AddPerson = () => {
    const navigate = useNavigate()
    const [selectedImages, setSelectedImages] = useState(null)
    const buttonRef = useRef()

    function handleSubmit(values, actions) {
        const formData = new FormData()
        formData.append("image", selectedImages)
        formData.append("fullname", values.fullname)
        formData.append("description", values.description)
      
        postPerson(formData)
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: `person added successfully`,
            showConfirmButton: false,
            timer: 1500,
        });

        buttonRef.current.style.background = '#1976D2';
        buttonRef.current.textContent = 'Upload File';

        setSelectedImages(null)
        actions.resetForm()
        navigate('/admin/team')
    }
    const formik = useFormik({
        initialValues: {
            image: '',
            name: '',
            description: '',
        },

        validationSchema: personSchema,
        onSubmit: handleSubmit
    })

  return (
    <>
    <h1 style={{fontFamily:'sans-serif', textAlign:'center', fontFamily:'Lobster'}}>Add Price</h1>
            <form onSubmit={formik.handleSubmit} >

               <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', width: '60%', margin: '0 auto' }}>
                <TextField type='text' onChange={formik.handleChange} onBlur={formik.handleBlur} name='fullname' value={formik.values.fullname} id="outlined-basic" label="fullname" variant="outlined" />
                {formik.errors.fullname && formik.touched.fullname && (<span>{formik.errors.fullname}</span>)}
                <br/>
               
                <TextField type='text' onChange={formik.handleChange} onBlur={formik.handleBlur} name='description' value={formik.values.description} id="outlined-basic" label="description" variant="outlined" />
                <br/>
              
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
                {formik.errors.image && formik.touched.image && (<span>{formik.errors.image}</span>)}


                <Button style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', width: '10%', margin: '0 auto' }}   variant='contained' color='error' type='submit'>Add</Button>
            </form>
    </>
  )
}

export default AddPerson