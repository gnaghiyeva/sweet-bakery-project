import React, { useRef, useState } from 'react'
import { postSlider } from '../../../api/requests'
import Swal from "sweetalert2";
import { useFormik } from 'formik';
import { sliderSchema } from '../../../validation/sliderSchema';
import { Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AddSlider = () => {
    const navigate = useNavigate()
    const [selectedImages, setSelectedImages] = useState(null)
    const buttonRef = useRef()

    function handleSubmit(values, actions) {
        const formData = new FormData()
        formData.append("image", selectedImages)
        formData.append("title", values.title)

        postSlider(formData)
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: `slider added successfully`,
            showConfirmButton: false,
            timer: 1500,
        });

        buttonRef.current.style.background = '#1976D2';
        buttonRef.current.textContent = 'Upload File';

        setSelectedImages(null)
        actions.resetForm()
        navigate('/admin/sliders')
    }
    const formik = useFormik({
        initialValues: {
            image: '',
            title: '',

        },

        validationSchema: sliderSchema,
        onSubmit: handleSubmit
    })


  return (
    <>
     <h1 style={{fontFamily:'sans-serif', textAlign:'center', fontFamily:'Lobster'}}>Add Slider</h1>
            <form onSubmit={formik.handleSubmit} >

               <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', width: '60%', margin: '0 auto' }}>
                <TextField type='text' onChange={formik.handleChange} onBlur={formik.handleBlur} name='title' value={formik.values.name} id="outlined-basic" label="name" variant="outlined" />
                {formik.errors.name && formik.touched.name && (<span>{formik.errors.name}</span>)}
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

export default AddSlider