import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signIn } from '../../api/requests';
import Swal from 'sweetalert2';
import { useFormik } from 'formik';
import {Grid, TextField } from '@mui/material';
import { useAdminContext } from '../../context/AdminContext';
import { Helmet } from 'react-helmet';
import favicon from '../../assets/favicon-logo.png'
const AdminLogin = () => {
  const [admin, setAdmin] = useAdminContext();
  console.log('admin',admin)
  const navigate = useNavigate();

  const handleSubmit = async (values, actions) => {
    const response = await signIn({
      username: values.username,
      password: values.password,
    });

    if (response.auth) {
      localStorage.setItem('adminToken', response.token);
      localStorage.setItem('admin', JSON.stringify(response.user));
      setAdmin(response.user);

      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Admin signed in successfully!',
        showConfirmButton: false,
        timer: 1200,
      });

      actions.resetForm();


      navigate('/admin');
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
        <title>Admin Login</title>
        <link rel="icon" type="image/x-icon" href={favicon} />
      </Helmet>

      <Grid container spacing={2}  style={{width:'70%', margin:' 100px auto', boxShadow:'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'}}>

        <Grid item sm={6} xs={12} md={6}>
          <div style={{ backgroundColor: 'rgb(246,87,109)', padding:'150px 0'}}>
            <article style={{ color: 'white', textAlign: 'center' }}>
              <h3>Welcome to Admin Login Page</h3>
              <p>Log in and change some things.</p>

            </article>
          </div>
        </Grid>


        <Grid item sm={6} xs={12} md={6}>

          <form onSubmit={formik.handleSubmit}>
            <div>
              <article>
                <h3>Sign In </h3>
              </article>


              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <TextField
                 style={{ width: '80%' }}
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
                 style={{ width: '80%' }}
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
                <button type="submit" style={{ backgroundColor: 'rgb(246,87,109)', border: 'none', padding: '6px 30px', color: 'white', width: '80%' }}>
                  SIGN IN
                </button>
              </div>
            </div>


          </form>
        </Grid>

      </Grid >
      {/* <form onSubmit={formik.handleSubmit}>
        <div style={{ width: '20%', margin: '100px auto', backgroundColor: 'white' }}>
          <article style={{ textAlign: 'center' }}>

            <h1>Admin Sign in</h1>
          </article> <br /> <br />

          <div style={{ display: 'flex', flexDirection: 'column' }}>
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
        </div>
        <br />
        <div style={{ textAlign: 'center', color: 'gray' }}>Copyright © Your Website 2023.</div>
      </form> */}

    </>
  );
};

export default AdminLogin;
