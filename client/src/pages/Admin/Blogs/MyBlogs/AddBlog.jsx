import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from "sweetalert2";
import { postBlog } from '../../../../api/requests';
import { useFormik } from 'formik';
import { Alert, Button, TextField } from '@mui/material';
import { blogSchema } from '../../../../validation/blogSchema';
import { Helmet } from 'react-helmet';
import favicon from '../../../../assets/favicon-logo.png'
const AddBlog = () => {
    const navigate = useNavigate()
    const [selectedImages, setSelectedImages] = useState(null)
    const buttonRef = useRef()

    function handleSubmit(values, actions) {
        const formData = new FormData()
        formData.append("image", selectedImages)
        formData.append("title", values.title)
        formData.append("description", values.description)
        formData.append("releaseDate", values.releaseDate)
        formData.append("color", values.color)


        formData.append("menuTitle", values.menuTitle)
        formData.append("guestTitle", values.guestTitle)
        formData.append("menuDesc", values.menuDesc)
        formData.append("guestDesc", values.guestDesc)

        postBlog(formData)
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
        navigate('/admin/blogs')
    }
    const formik = useFormik({
        initialValues: {
            image: '',
            releaseDate: '',
            title: '',
            description: '',
            color: '',

            menuTitle: '',
            guestTitle: '',
            menuDesc: '',
            guestDesc: ''



        },
        validationSchema: blogSchema,
        onSubmit: handleSubmit
    })

    return (
        <>
            <Helmet>
                <title>Adding Blog</title>
                <link rel="icon" type="image/x-icon" href={favicon} />
            </Helmet>
            <h1 style={{ fontFamily: 'sans-serif', textAlign: 'center', fontFamily: 'Lobster' }}>Add Blog</h1>
            <form onSubmit={formik.handleSubmit} >

                <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', width: '60%', margin: '0 auto' }}>
                    <TextField type='text' onChange={formik.handleChange} onBlur={formik.handleBlur} name='title' value={formik.values.title} id="outlined-basic" label="title" variant="outlined" />
                    {formik.errors.title && formik.touched.title && (<><Alert severity="warning">{formik.errors.title}</Alert></>)}
                    <br />
                    <TextField type='date' onChange={formik.handleChange} onBlur={formik.handleBlur} name='releaseDate' value={formik.values.releaseDate} id="outlined-basic" placeholder="release date" variant="outlined" />
                    {formik.errors.releaseDate && formik.touched.releaseDate && (<><Alert severity="warning">{formik.errors.releaseDate}</Alert></>)}
                    <br />
                    <TextField type='text' onChange={formik.handleChange} onBlur={formik.handleBlur} name='description' value={formik.values.description} id="outlined-basic" label="description" variant="outlined" />
                    {formik.errors.description && formik.touched.description && (<><Alert severity="warning">{formik.errors.description}</Alert></>)}
                    <br />
                    <TextField type='text' onChange={formik.handleChange} onBlur={formik.handleBlur} name='color' value={formik.values.color} id="outlined-basic" label="color" variant="outlined" />
                    {formik.errors.color && formik.touched.color && (<><Alert severity="warning">{formik.errors.color}</Alert></>)}
                    <br />

                    <h1 style={{fontFamily:'Lobster', textAlign:'center'}}>Adding Blog Detail</h1>
                    <TextField type='text' onChange={formik.handleChange} onBlur={formik.handleBlur} name='menuTitle' value={formik.values.menuTitle} id="outlined-basic" label="menu title" variant="outlined" />
                    {formik.errors.menuTitle && formik.touched.menuTitle && (<><Alert severity="warning">{formik.errors.menuTitle}</Alert></>)}
                    <br />
                    <TextField type='text' onChange={formik.handleChange} onBlur={formik.handleBlur} name='guestTitle' value={formik.values.guesTitle} id="outlined-basic" placeholder="guest title" variant="outlined" />
                    {formik.errors.guestTitle && formik.touched.guestTitle && (<><Alert severity="warning">{formik.errors.guestTitle}</Alert></>)}
                    <br />
                    <TextField type='text' onChange={formik.handleChange} onBlur={formik.handleBlur} name='menuDesc' value={formik.values.menuDesc} id="outlined-basic" label="menu desc" variant="outlined" />
                    {formik.errors.menuDesc && formik.touched.menuDesc && (<><Alert severity="warning">{formik.errors.menuDesc}</Alert></>)}
                    <br />
                    <TextField type='text' onChange={formik.handleChange} onBlur={formik.handleBlur} name='guestDesc' value={formik.values.guestDesc} id="outlined-basic" label="guestDesc" variant="outlined" />
                    {formik.errors.guestDesc && formik.touched.guestDesc && (<><Alert severity="warning">{formik.errors.guestDesc}</Alert></>)}
                    <br />
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


                <Button style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', width: '10%', margin: '0 auto' }} variant='contained' color='error' type='submit' disabled={formik.isSubmitting || Object.keys(formik.errors).length > 0} >Add</Button>
            </form>
        </>
    )
}

export default AddBlog