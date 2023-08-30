import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { postPrice } from '../../../api/requests'
import Swal from "sweetalert2";
import { priceSchema } from '../../../validation/priceSchema';
import { Alert, Button, TextField } from '@mui/material';
import { useFormik } from 'formik';

const AddPrice = () => {
    const navigate = useNavigate()
    const [selectedImages, setSelectedImages] = useState(null)
    const buttonRef = useRef()

    function handleSubmit(values, actions) {
        const formData = new FormData()
        formData.append("image", selectedImages)
        formData.append("name", values.name)
        formData.append("description", values.description)
        formData.append("price", values.price)
        formData.append("color", values.color)

        postPrice(formData)
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: `service added successfully`,
            showConfirmButton: false,
            timer: 1500,
        });

        buttonRef.current.style.background = '#1976D2';
        buttonRef.current.textContent = 'Upload File';

        setSelectedImages(null)
        actions.resetForm()
        navigate('/admin/prices')
    }
    const formik = useFormik({
        initialValues: {
            image: '',
            name: '',
            description: '',
            price:'',
            color:''


        },

        validationSchema: priceSchema,
        onSubmit: handleSubmit
    })

  return (
    <>
    <h1 style={{fontFamily:'sans-serif', textAlign:'center', fontFamily:'Lobster'}}>Add Price</h1>
            <form onSubmit={formik.handleSubmit} >

               <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', width: '60%', margin: '0 auto' }}>
                <TextField type='text' onChange={formik.handleChange} onBlur={formik.handleBlur} name='name' value={formik.values.name} id="outlined-basic" label="name" variant="outlined" />
                {formik.errors.name && formik.touched.name && (<Alert severity="warning">{formik.errors.name}</Alert>)}
                <br/>
                <TextField type='number' onChange={formik.handleChange} onBlur={formik.handleBlur} name='price' value={formik.values.price} id="outlined-basic" label="price" variant="outlined" />
                {formik.errors.price && formik.touched.price && (<Alert severity="warning">{formik.errors.price}</Alert>)}
                <br/>
                <TextField type='text' onChange={formik.handleChange} onBlur={formik.handleBlur} name='description' value={formik.values.description} id="outlined-basic" label="description" variant="outlined" />
                <br/>
                <TextField type='text' onChange={formik.handleChange} onBlur={formik.handleBlur} name='color' value={formik.values.color} id="outlined-basic" label="color" variant="outlined" />
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
                {formik.errors.image && formik.touched.image && (<Alert severity="warning">{formik.errors.image}</Alert>)}


                <Button style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', width: '10%', margin: '0 auto' }}   variant='contained' color='error' type='submit' disabled={formik.isSubmitting || Object.keys(formik.errors).length > 0}>Add</Button>
            </form>
    </>
  )
}

export default AddPrice