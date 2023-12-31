import React, { useEffect, useRef, useState } from 'react'
import { useProductSliderContext } from '../../../../context/ProductSliderContext'
import { useNavigate, useParams } from 'react-router-dom'
import { editProductSlider, getProductSliderById } from '../../../../api/requests'
import Swal from "sweetalert2";
import { Alert, Button, CircularProgress, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { Helmet } from 'react-helmet';
import favicon from '../../../../assets/favicon-logo.png'
const EditProductSlider = () => {
    const buttonRef = useRef()
    const [sliders, setSliders] = useProductSliderContext()
    const [loading, setLoading] = useState(true)
    const { id } = useParams()
    const navigate = useNavigate();
    const [slider, SetSlider] = useState({});

    useEffect(() => {
        getProductSliderById(id).then((res) => {
            SetSlider(res);
            formik.values.title = res.data.title;
            formik.values.image = res.data.image;
            setLoading(false);

        })
    }, [id]);

    const handleEdit = async (values, actions) => {
        const formData = new FormData();
        formData.append('title', values.title);
        formData.append('image', values.image);

        await editProductSlider(id, formData);
        const updatedSliders = sliders.map((item) => {
            if (item.id === id) {
                return { ...item, image: values.image };
            }
            return item;
        });

        setSliders(updatedSliders);

        Swal.fire({
            position: "top-end",
            icon: "success",
            title: `slider edited successfully`,
            showConfirmButton: false,
            timer: 1500,
        });

        navigate('/admin/product-slider');
        actions.resetForm();
    }
    const formik = useFormik({
        initialValues: {
            title: slider.title,
            image: slider.image,

        },
        onSubmit: handleEdit,
    });
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = () => {
            const base64Image = reader.result;
            formik.setFieldValue('image', file);
            console.log(base64Image)
        };

        reader.readAsDataURL(file);
    };
    return (
        <>
            <Helmet>
                <title>Editing Product</title>
                <link rel="icon" type="image/x-icon" href={favicon} />
            </Helmet>
            <h1 style={{ textAlign: 'center', fontFamily: 'Lobster' }}>Editing Product</h1>
            {loading ? <div style={{ textAlign: 'center' }}><CircularProgress color="secondary" /></div> : <form onSubmit={formik.handleSubmit}>
                <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <TextField style={{ width: '300px' }} onChange={formik.handleChange} onBlur={formik.handleBlur} name='title' type='text' value={formik.values.title} id="outlined-basic" label="name" variant="outlined" /> <br />
                    {formik.errors.title && formik.touched.title && (<Alert severity="warning">{formik.errors.title}</Alert>)}

                    {formik.errors.image && formik.touched.image && (<Alert severity="warning">{formik.errors.image}</Alert>)}

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
                    <Button type='submit' variant='contained' color='success'>Edit</Button>
                </div>
            </form>}
        </>
    )
}

export default EditProductSlider