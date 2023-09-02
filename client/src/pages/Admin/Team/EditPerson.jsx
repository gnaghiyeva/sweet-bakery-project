import React, { useEffect, useRef, useState } from 'react'
import { usePersonContext } from '../../../context/PersonContext'
import { useNavigate, useParams } from 'react-router-dom'
import { editPerson, getPersonById } from '../../../api/requests'
import Swal from "sweetalert2";
import { useFormik } from 'formik';
import { Alert, Button, CircularProgress, TextField } from '@mui/material';
import { personSchema } from '../../../validation/personSchema';
import { Helmet } from 'react-helmet';
import favicon from '../../../assets/favicon-logo.png'
const EditPerson = () => {
    const buttonRef = useRef()

    const [teams, setTeams] = usePersonContext()
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
        const updatedTeam = teams.map((item) => {
            if (item.id === id) {
                return { ...item, image: values.image };
            }
            return item;
        });

        setTeams(updatedTeam);
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
        validationSchema: personSchema,
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
                <title>Editing Person</title>
                <link rel="icon" type="image/x-icon" href={favicon} />
            </Helmet>
            <h1 style={{textAlign: 'center', fontFamily: 'Lobster' }}>Editing Service</h1>
            {loading ? <div style={{ textAlign: 'center' }}><CircularProgress color="secondary" /></div> : <form onSubmit={formik.handleSubmit}>
                <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <TextField style={{ width: '300px' }} onChange={formik.handleChange} onBlur={formik.handleBlur} name='fullname' type='text' value={formik.values.fullname} id="outlined-basic" label="fullname" variant="outlined" /> <br />
                    {formik.errors.fullname && formik.touched.fullname && (<Alert severity="warning">{formik.errors.fullname}</Alert>)}


                    <TextField type='text' onChange={formik.handleChange} onBlur={formik.handleBlur} name='description' value={formik.values.description} id="outlined-basic" label="description" variant="outlined" />
                    <br />

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

export default EditPerson