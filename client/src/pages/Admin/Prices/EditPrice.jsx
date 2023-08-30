import React, { useEffect, useRef, useState } from 'react'
import { usePriceContext } from '../../../context/PricesContext'
import { useNavigate, useParams } from 'react-router-dom'
import { editPrice, getPriceById } from '../../../api/requests'
import { useFormik } from 'formik'
import Swal from "sweetalert2";
import { Alert, Button, CircularProgress, TextField } from '@mui/material'
import { priceSchema } from '../../../validation/priceSchema'

const EditPrice = () => {
    const [selectedImages, setSelectedImages] = useState({})
    const buttonRef = useRef()

    const [setPrices] = usePriceContext()
    const [loading, setLoading] = useState(true)
    const { id } = useParams()
    const navigate = useNavigate();
    const [price, SetPrice] = useState({});

    useEffect(() => {
        getPriceById(id).then((res) => {
            SetPrice(res);
            formik.values.image = res.data.image;
            formik.values.name = res.data.name;
            formik.values.price = res.data.price;
            formik.values.description = res.data.description;
            formik.values.color = res.data.color;
            setLoading(false);

        })
    }, [id]);

    const handleEdit = async (values, actions) => {
        const formData = new FormData();
        formData.append('image', values.image);
        formData.append('name', values.name);
        formData.append('price', values.price);
        formData.append('description', values.description);
        formData.append('color', values.color);

        await editPrice(id, formData);

        Swal.fire({
            position: "top-end",
            icon: "success",
            title: `prices section edited successfully`,
            showConfirmButton: false,
            timer: 1500,
        });

        navigate('/admin/prices');
        actions.resetForm();
    }
    const formik = useFormik({
        initialValues: {
            image: price.image,
            name: price.name,
            price: price.price,
            description: price.description,
            color: price.color,

        },
        validationSchema: priceSchema,
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
            <h1 style={{ fontFamily: 'sans-serif', textAlign: 'center', fontFamily: 'Lobster' }}>Editing Service</h1>
            {loading ? <div style={{ textAlign: 'center' }}><CircularProgress color="secondary" /></div> : <form onSubmit={formik.handleSubmit}>
                <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <TextField style={{ width: '300px' }} onChange={formik.handleChange} onBlur={formik.handleBlur} name='name' type='text' value={formik.values.name} id="outlined-basic" label="name" variant="outlined" /> <br />
                    {formik.errors.name && formik.touched.name && (<Alert severity="warning">{formik.errors.name}</Alert>)}

                    <TextField type='number' onChange={formik.handleChange} onBlur={formik.handleBlur} name='price' value={formik.values.price} id="outlined-basic" label="price" variant="outlined" />
                    {formik.errors.price && formik.touched.price && (<Alert severity="warning">{formik.errors.price}</Alert>)}
                    <br />
                    <TextField type='text' onChange={formik.handleChange} onBlur={formik.handleBlur} name='description' value={formik.values.description} id="outlined-basic" label="description" variant="outlined" />
                    <br />
                    <TextField type='text' onChange={formik.handleChange} onBlur={formik.handleBlur} name='color' value={formik.values.color} id="outlined-basic" label="color" variant="outlined" />
                    <br />

                    {formik.errors.image && formik.touched.image && (<span>{formik.errors.image}</span>)}

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
                    {formik.errors.image && formik.touched.image && (<span>{formik.errors.image}</span>)}
                </div>

                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <Button type='submit' variant='contained' color='success' disabled={formik.isSubmitting || Object.keys(formik.errors).length > 0}>Edit</Button>
                </div>
            </form>}
        </>
    )
}

export default EditPrice