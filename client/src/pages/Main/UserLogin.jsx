import React from 'react'
import { useUserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { Button, TextField } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import { signIn } from '../../api/requests';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';
import favicon from '../../assets/favicon-logo.png'
const UserLogin = () => {
  const [user, setUser] = useUserContext();
  const navigate = useNavigate();

  const handleSubmit = async (values, actions) => {
    const response = await signIn({
      username: values.username,
      password: values.password,
    });

    if (response.auth) {
      localStorage.setItem('userToken', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      setUser(response.user);

      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'User signed in successfully!',
        showConfirmButton: false,
        timer: 1200,
      });

      actions.resetForm();
      navigate('/');
    }
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: handleSubmit,
  });

  return (
    <>
      <Helmet>
        <title>User Login</title>
        <link rel="icon" type="image/x-icon" href={favicon} />
      </Helmet>
      <form onSubmit={formik.handleSubmit}>
        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', width: '20%', margin: '0 auto', paddingTop: '150px' }}>
          <article style={{ textAlign: 'center' }}>
            <span style={{ padding: '15px', backgroundColor: 'rgb(156,39,176)', borderRadius: '54%' }}>
              <LoginIcon style={{ color: 'white' }} />
            </span>
            <h1>User Sign in</h1>
          </article> <br /> <br />
          <TextField
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="username"
            value={formik.values.username}
            type="text"
            id="outlined-basic"
            label="Username"
            variant="outlined"
          />
          <br />
          <TextField
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="password"
            value={formik.values.password}
            type="password"
            id="outlined-basic"
            label="Password"
            variant="outlined"
          />
          <br />
          <Button type="submit" variant="contained">
            SIGN IN
          </Button>
        </div>
        <br />
        <div style={{ textAlign: 'center', color: 'gray' }}>Copyright © Your Website 2023.</div>
      </form>
    </>
  )
}

export default UserLogin