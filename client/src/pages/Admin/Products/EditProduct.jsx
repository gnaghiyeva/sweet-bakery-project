import React, { useEffect, useRef, useState } from 'react'
import { useProductContext } from '../../../context/ProductsContext'
import { useNavigate, useParams } from 'react-router-dom'
import { editProduct, getProductById } from '../../../api/requests'
import { useFormik } from 'formik'
import Swal from "sweetalert2";
import { Alert, Button, CircularProgress, TextField } from '@mui/material'
import { productSchema } from '../../../validation/productSchema';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Helmet } from 'react-helmet'
import favicon from '../../../assets/favicon-logo.png'
const EditProduct = () => {

    const [selectedImages, setSelectedImages] = useState({})
    const buttonRef = useRef()

    const [setProducts] = useProductContext()
    const [loading, setLoading] = useState(true)
    const { id } = useParams()
    const navigate = useNavigate();
    const [product, setProduct] = useState({});

    useEffect(() => {
        getProductById(id).then((res) => {
            setProduct(res);
            formik.values.image = res.data.image;
            formik.values.title = res.data.title;
            formik.values.price = res.data.price;
            formik.values.priceDiscount = res.data.priceDiscount;
            formik.values.onSale = res.data.onSale;
            formik.values.desc = res.data.desc;
            setLoading(false);

        })
    }, [id]);

    const handleEdit = async (values, actions) => {
        const formData = new FormData();
        formData.append('image', values.image);
        formData.append('title', values.title);
        formData.append('price', values.price);
        formData.append('priceDiscount', values.priceDiscount);
        formData.append('onSale', values.onSale);
        formData.append('desc', values.desc);

        await editProduct(id, formData);

        Swal.fire({
            position: "top-end",
            icon: "success",
            title: `prices section edited successfully`,
            showConfirmButton: false,
            timer: 1500,
        });

        navigate('/admin/shop');
        actions.resetForm();
    }
    const formik = useFormik({
        initialValues: {
            image: product.image,
            title: product.title,
            price: product.price,
            priceDiscount: product.priceDiscount,
            onSale: product.onSale,
            desc: product.desc,

        },
        validationSchema: productSchema,
        onSubmit: handleEdit,
    });
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = () => {
            const base64Image = reader.result;
            setSelectedImages(base64Image);
            formik.setFieldValue('image', file); // Seçilen resmi formik değerine atayın
        };

        reader.readAsDataURL(file);
    };
    return (
        <>
            <Helmet>
                <title>Edit product</title>
                <link rel="icon" type="image/x-icon" href={favicon} />
            </Helmet>
            <h1 style={{ textAlign: 'center', fontFamily: 'Lobster' }}>Editing Product</h1>
            {loading ? <div style={{ textAlign: 'center' }}><CircularProgress color="secondary" /></div> : <form onSubmit={formik.handleSubmit}>
                <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <TextField style={{ width: '300px' }} onChange={formik.handleChange} onBlur={formik.handleBlur} name='title' type='text' value={formik.values.title} id="outlined-basic" label="title" variant="outlined" /> <br />
                    {formik.errors.title && formik.touched.title && (<Alert severity="warning">{formik.errors.title}</Alert>)}

                    <TextField type='number' onChange={formik.handleChange} onBlur={formik.handleBlur} name='price' value={formik.values.price} id="outlined-basic" label="price" variant="outlined" />
                    {formik.errors.price && formik.touched.price && (<Alert severity="warning">{formik.errors.price}</Alert>)}
                    <br />
                    <TextField type='number' onChange={formik.handleChange} onBlur={formik.handleBlur} name='priceDiscount' value={formik.values.priceDiscount} id="outlined-basic" label="priceDiscount" variant="outlined" />
                    {formik.errors.priceDiscount && formik.touched.priceDiscount && (<Alert severity="warning">{formik.errors.priceDiscount}</Alert>)}
                    <br />
                    <TextField style={{ width: '700px' }} onChange={formik.handleChange} onBlur={formik.handleBlur} name='desc' type='text' value={formik.values.desc} id="outlined-basic" label="description" variant="outlined" /> <br />
                    {formik.errors.desc && formik.touched.desc && (<Alert severity="warning">{formik.errors.desc}</Alert>)}



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


                    <Button ref={buttonRef} variant="contained" component="label" >
                        Edit File
                        <input
                            onChange={handleImageChange}
                            onBlur={formik.handleBlur}
                            name="image"
                            type="file"
                            accept="image/*"
                            hidden
                        />
                    </Button>
                    {/* <img src={formik.values.image} width={100} height={100} alt='logo'/>
     */}
                    {formik.errors.image && formik.touched.image && (<Alert severity="warning">{formik.errors.image}</Alert>)}
                </div>

                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <Button type='submit' variant='contained' color='success' disabled={formik.isSubmitting || Object.keys(formik.errors).length > 0}>Edit</Button>
                </div>
            </form>}
        </>
    )
}

export default EditProduct