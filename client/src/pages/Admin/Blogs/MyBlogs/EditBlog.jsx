import React, { useEffect, useRef, useState } from 'react'
import { useBlogContext } from '../../../../context/BlogContext'
import { useNavigate, useParams } from 'react-router-dom'
import { useFormik } from 'formik'
import { Alert, Button, CircularProgress, TextField } from '@mui/material';
import Swal from "sweetalert2";
import { editBlog, getBlogById } from '../../../../api/requests';
import { DatePicker} from 'antd';
import { blogSchema } from '../../../../validation/blogSchema';

const EditBlog = () => {
    const [selectedImages, setSelectedImages] = useState({})
    const buttonRef = useRef()

    const [setBlogs] = useBlogContext()
    const [loading, setLoading] = useState(true)
    const { id } = useParams()
    const navigate = useNavigate();
    const [blog, SetBlog] = useState({});

    useEffect(() => {
        getBlogById(id).then((res) => {
            SetBlog(res);
            formik.values.image = res.data.image;
            formik.values.releaseDate = res.data.releaseDate;
            formik.values.title = res.data.title;
            formik.values.description = res.data.description;
            formik.values.color = res.data.color;
            setLoading(false);

        })
    }, [id]);

    const handleEdit = async (values, actions) => {
        const formData = new FormData();
        formData.append('image', values.image);
        formData.append('releaseDate', values.releaseDate);
        formData.append('title', values.title);
        formData.append('description', values.description);
        formData.append('color', values.color);

        await editBlog(id, formData);

        Swal.fire({
            position: "top-end",
            icon: "success",
            title: `prices section edited successfully`,
            showConfirmButton: false,
            timer: 1500,
        });

        navigate('/admin/blogs');
        actions.resetForm();
    }
    const formik = useFormik({
        initialValues: {
            image: blog.image,
            releaseDate: blog.releaseDate,
            title: blog.title,
            price: blog.price,
            color: blog.color,

        },
        validationSchema: blogSchema,

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
                    <TextField style={{ width: '600px' }} onChange={formik.handleChange} onBlur={formik.handleBlur} name='title' type='text' value={formik.values.title} id="outlined-basic" label="title" variant="outlined" /> <br />
                    {formik.errors.title && formik.touched.title && (<><Alert severity="warning">{formik.errors.title}</Alert></>)}
                    <TextField style={{ width: '600px' }} type='date' onChange={formik.handleChange} onBlur={formik.handleBlur} name='releaseDate' value={formik.values.releaseDate} id="outlined-basic" label="releaseDate" variant="outlined" />
                    {formik.errors.releaseDate && formik.touched.releaseDate && (<><Alert severity="warning">{formik.errors.releaseDate}</Alert></>)}
                    <br />
                    <TextField style={{ width: '600px' }} type='text' onChange={formik.handleChange} onBlur={formik.handleBlur} name='description' value={formik.values.description} id="outlined-basic" label="description" variant="outlined" />
                    {formik.errors.description && formik.touched.description && (<><Alert severity="warning">{formik.errors.description}</Alert></>)}
                    <br />
                    <TextField type='text' onChange={formik.handleChange} onBlur={formik.handleBlur} name='color' value={formik.values.color} id="outlined-basic" label="color" variant="outlined" />
                    {formik.errors.color && formik.touched.color && (<><Alert severity="warning">{formik.errors.color}</Alert></>)}
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
                  
                    {formik.errors.image && formik.touched.image && (<Alert severity="warning">{formik.errors.image}</Alert>)}
                </div>

                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <Button type='submit' variant='contained' color='success' disabled={formik.isSubmitting || Object.keys(formik.errors).length > 0}>Edit</Button>
                </div>
            </form>}
   </>
  )
}

export default EditBlog