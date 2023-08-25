import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { postPrice, postProduct } from '../../../api/requests'
import Swal from "sweetalert2";
import { Alert, Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { productSchema } from '../../../validation/productSchema';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const AddProduct = () => {
    const navigate = useNavigate()
    const [selectedImages, setSelectedImages] = useState(null)
    const buttonRef = useRef()

    function handleSubmit(values, actions) {
        const formData = new FormData()
        formData.append("image", selectedImages)
        formData.append("title", values.title)
        formData.append("price", values.price)
        formData.append("priceDiscount", values.priceDiscount)
        formData.append("onSale", values.onSale)
        formData.append("desc", values.desc)

        postProduct(formData)
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
        navigate('/admin/shop')
    }
    const formik = useFormik({
        initialValues: {
            image: '',
            title: '',
            price: '',
            priceDiscount: '',
            onSale: '',
            desc:''


        },

        validationSchema: productSchema,
        onSubmit: handleSubmit
    })

    return (
        <>
            <h1 style={{ fontFamily: 'sans-serif', textAlign: 'center', fontFamily: 'Lobster' }}>Add Price</h1>
            <form onSubmit={formik.handleSubmit} >

                <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', width: '60%', margin: '0 auto' }}>
                    <TextField type='text' onChange={formik.handleChange} onBlur={formik.handleBlur} name='title' value={formik.values.title} id="outlined-basic" label="title" variant="outlined" />
                    {formik.errors.title && formik.touched.title && ( <Alert severity="warning">{formik.errors.title}</Alert>)}
    
                    <br />
                    <TextField type='number' onChange={formik.handleChange} onBlur={formik.handleBlur} name='price' value={formik.values.price} id="outlined-basic" label="price" variant="outlined" />
                    {formik.errors.price && formik.touched.price && (<Alert severity="warning">{formik.errors.price}</Alert>)}
                    <br />
                    <TextField type='number' onChange={formik.handleChange} onBlur={formik.handleBlur} name='priceDiscount' value={formik.values.priceDiscount} id="outlined-basic" label="price discount" variant="outlined" />
                    {formik.errors.priceDiscount && formik.touched.priceDiscount && (<Alert severity="warning">{formik.errors.priceDiscount}</Alert>)}
                    <br />

                    <TextField type='text' onChange={formik.handleChange} onBlur={formik.handleBlur} name='desc' value={formik.values.desc} id="outlined-basic" label="description" variant="outlined" />
                    {formik.errors.desc && formik.touched.desc && ( <Alert severity="warning">{formik.errors.desc}</Alert>)}
    
                    <br />
                    <FormControl>
                        <FormLabel id="demo-controlled-radio-buttons-group">is onSale ?</FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            value={formik.values.onSale}
                            onChange={formik.handleChange}
                        >
                            <FormControlLabel value={true} control={<Radio />} label="Yes" name='onSale' />
                            <FormControlLabel value={false} control={<Radio />} label="No" name='onSale' />
                        </RadioGroup>
                    </FormControl>
                </div> <br />


                <Button style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', width: '20%', margin: '0 auto' }} ref={buttonRef} variant="contained" component="label" >
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
                </Button> <br />
                {formik.errors.image && formik.touched.image && (<Alert severity="warning">{formik.errors.image}</Alert>)}


                <Button style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', width: '10%', margin: '0 auto' }} variant='contained' color='error' type='submit'>Add</Button>
            </form>
        </>
    )
}

export default AddProduct