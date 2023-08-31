import React from 'react'
import { useNavigate } from 'react-router-dom'
import { signUp } from '../../api/requests'
import { useFormik } from 'formik'
import { Alert, Button, TextField } from '@mui/material'
import Swal from 'sweetalert2'

const UserRegister = () => {
    const navigate = useNavigate()
    const handleSubmit = async (values, actions) => {
        await signUp(values)
        Swal.fire(
            'Good job!',
            'Account created succesfully!',
            'success'
          )
        actions.resetForm()
        navigate('/login')
    }

    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: ''
        },

        onSubmit: handleSubmit
    })
    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', width: '30%', margin: '0 auto' }}>
                    <TextField placeholder='username' onChange={formik.handleChange} onBlur={formik.handleBlur} name='username' type='text' value={formik.values.username} id="outlined-basic" label="username" variant="outlined" />
                    {formik.errors.username && formik.touched.username && (<Alert severity="warning">{formik.errors.username}</Alert>)}
                    <br />
                    <TextField placeholder='email' onChange={formik.handleChange} onBlur={formik.handleBlur} name='email' type='email' value={formik.values.email} id="outlined-basic" label="email" variant="outlined" />
                    {formik.errors.email && formik.touched.email && (<Alert severity="warning">{formik.errors.email}</Alert>)}
                    <br/>
                    <TextField placeholder='password' onChange={formik.handleChange} onBlur={formik.handleBlur} name='password' type='password' value={formik.values.password} id="outlined-basic" label="password" variant="outlined" />
                    {formik.errors.password && formik.touched.password && (<Alert severity="warning">{formik.errors.password}</Alert>)}
                    
                </div> <br />
                <Button  style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', width: '20%', margin: '0 auto' }} type='submit' variant="contained" disabled={formik.isSubmitting || Object.keys(formik.errors).length > 0}>Create Account</Button>
            </form>
        </>
    )
}

export default UserRegister