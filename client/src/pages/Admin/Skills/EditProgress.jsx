import React, { useEffect, useState } from 'react'
import { useProgressContext } from '../../../context/ProgressContext';
import { useNavigate, useParams } from 'react-router-dom';
import { editProgress, getProgressById } from '../../../api/requests';
import { useFormik } from 'formik';
import { Alert, Button, CircularProgress, TextField } from '@mui/material';
import Swal from "sweetalert2";
import { progressSchema } from '../../../validation/progressSchema';
import { Helmet } from 'react-helmet';
import favicon from '../../../assets/favicon-logo.png'
const EditProgress = () => {
  const [setProgress] = useProgressContext();
  const { id } = useParams()
  const navigate = useNavigate()
  const [prog, setProg] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getProgressById(id).then((res) => {
      setProg(res)
      formik.values.progressName = res.data.progressName;
      formik.values.progressCount = res.data.progressCount;
      setLoading(false)
    })

  }, [id, loading])


  const handleEdit = async (values, actions) => {
    setProgress(values)
    await editProgress(id, values)
    navigate('/admin/skills')
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: `progress edited successfully`,
      showConfirmButton: false,
      timer: 1500,
    });
    actions.resetForm()
  }


  const formik = useFormik({
    initialValues: {
      progressName: prog.progressName,
      progressCount: prog.progressCount,
    },

    validationSchema: progressSchema,
    onSubmit: handleEdit

  })

  return (
    <>
      <Helmet>
        <title>Editing Progress</title>
        <link rel="icon" type="image/x-icon" href={favicon} />
      </Helmet>
      <h1 style={{ textAlign: 'center', fontFamily: 'Lobster' }}>Editing Progress</h1>

      {loading ? <div style={{ textAlign: 'center' }}><CircularProgress color="secondary" /></div> : <form onSubmit={formik.handleSubmit}>
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <TextField type='text' name='progressName' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.progressName} id="outlined-basic" label="name" variant="outlined" /><br />
          {formik.errors.progressName && formik.touched.progressName && (<Alert severity="warning">{formik.errors.progressName}</Alert>)}

          <TextField type='number' name='progressCount' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.progressCount} id="outlined-basic" label="count" variant="outlined" /><br />
          {formik.errors.progressCount && formik.touched.progressCount && (<Alert severity="warning">{formik.errors.progressCount}</Alert>)}


        </div>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Button type='submit' variant='contained' color='success'>Edit</Button>
        </div>
      </form>}
    </>
  )
}

export default EditProgress