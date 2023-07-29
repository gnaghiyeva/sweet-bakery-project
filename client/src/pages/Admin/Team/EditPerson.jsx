import React, { useEffect, useRef, useState } from 'react'
import { usePersonContext } from '../../../context/PersonContext'
import { useNavigate, useParams } from 'react-router-dom'
import { editPerson, getPersonById } from '../../../api/requests'
import Swal from "sweetalert2";
import { useFormik } from 'formik';
import { Button, CircularProgress, TextField } from '@mui/material';
const EditPerson = () => {
    const [selectedImages, setSelectedImages] = useState({})
    const buttonRef = useRef()

    const [setPrices] = usePersonContext()
    const [loading, setLoading] = useState(true)
    const { id } = useParams()
    const navigate = useNavigate();
    const [person, SetPerson] = useState({});

    useEffect(() => {
        getPersonById(id).then((res) => {
            SetPerson(res);
            formik.values.image = res.data.image;
            formik.values.fullname = res.data.fullname;
            formik.values.description = res.data.description;
            setLoading(false);

        })
    }, [id]);

    const handleEdit = async (values, actions) => {
        const formData = new FormData();
        formData.append('image', values.image);
        formData.append('fullname', values.fullname);
        formData.append('description', values.description);

        await editPerson(id, formData);

        Swal.fire({
            position: "top-end",
            icon: "success",
            title: `prices section edited successfully`,
            showConfirmButton: false,
            timer: 1500,
        });

        navigate('/admin/team');
        actions.resetForm();
    }
    const formik = useFormik({
        initialValues: {
            image: person.image,
            fullname: person.fullname,
            description: person.description,

        },
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
            <TextField style={{ width: '300px' }} onChange={formik.handleChange} onBlur={formik.handleBlur} name='fullname' type='text' value={formik.values.fullname} id="outlined-basic" label="fullname" variant="outlined" /> <br />
            {formik.errors.fullname && formik.touched.fullname && (<span>{formik.errors.fullname}</span>)}

           
            <TextField type='text' onChange={formik.handleChange} onBlur={formik.handleBlur} name='description' value={formik.values.description} id="outlined-basic" label="description" variant="outlined" />
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

export default EditPerson