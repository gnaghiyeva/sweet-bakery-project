import React, { useEffect, useRef, useState } from 'react'
import { useSkillContext } from '../../../context/SkillContext'
import { useNavigate, useParams } from 'react-router-dom'
import { editSkill, getSkillById } from '../../../api/requests'
import { useFormik } from 'formik'
import { Alert, Button, TextField } from '@mui/material'
import { CircularProgress } from '@mui/material';
import Swal from "sweetalert2";
import { skillsSchema } from '../../../validation/skillSchema'
import { Helmet } from 'react-helmet'
import favicon from '../../../assets/favicon-logo.png'
const EditSkill = () => {
  const [selectedImages, setSelectedImages] = useState({})
  const buttonRef = useRef()

  const [setSkills] = useSkillContext()
  const [loading, setLoading] = useState(true)
  const { id } = useParams()
  const navigate = useNavigate();
  const [skill, SetSkill] = useState({});

  useEffect(() => {
    getSkillById(id).then((res) => {
      SetSkill(res);
      formik.values.title = res.data.title;
      formik.values.description = res.data.description;
      formik.values.image = res.data.image;
      setLoading(false);

    })
  }, [id]);

  const handleEdit = async (values, actions) => {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('description', values.description);
    formData.append('image', values.image);

    await editSkill(id, formData);

    Swal.fire({
      position: "top-end",
      icon: "success",
      title: `skill edited successfully`,
      showConfirmButton: false,
      timer: 1500,
    });

    navigate('/admin/skills');
    actions.resetForm();
  }
  const formik = useFormik({
    initialValues: {
      title: skill.title,
      description: skill.description,
      image: skill.image,

    },
    validationSchema: skillsSchema,
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
        <title>Editing Skill</title>
        <link rel="icon" type="image/x-icon" href={favicon} />
      </Helmet>
      <h1 style={{ fontFamily: 'sans-serif', textAlign: 'center', fontFamily: 'Lobster' }}>Editing Service</h1>
      {loading ? <div style={{ textAlign: 'center' }}><CircularProgress color="secondary" /></div> : <form onSubmit={formik.handleSubmit}>
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <TextField style={{ width: '300px' }} onChange={formik.handleChange} onBlur={formik.handleBlur} name='title' type='text' value={formik.values.title} id="outlined-basic" label="name" variant="outlined" /> <br />
          {formik.errors.title && formik.touched.title && (<Alert severity="warning">{formik.errors.title}</Alert>)}

          <TextField style={{ width: '500px' }} onChange={formik.handleChange} onBlur={formik.handleBlur} name='description' type='text' value={formik.values.description} id="outlined-basic" label="description" variant="outlined" /> <br />
          {formik.errors.description && formik.touched.description && (<Alert severity="warning">{formik.errors.description}</Alert>)}

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
          {formik.errors.image && formik.touched.image && (<span>{formik.errors.image}</span>)}
        </div>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Button type='submit' variant='contained' color='success' disabled={formik.isSubmitting || Object.keys(formik.errors).length > 0}>Edit</Button>
        </div>
      </form>}
    </>
  )
}

export default EditSkill