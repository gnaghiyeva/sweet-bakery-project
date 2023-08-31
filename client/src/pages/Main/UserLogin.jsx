import React from 'react'
import { useUserContext } from '../../context/UserContext';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { Button, Grid, TextField } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import { signIn } from '../../api/requests';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';
import favicon from '../../assets/favicon-logo.png'
import userLogo from '../../assets/user-logo.png'
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

      <Grid container spacing={2} style={{ padding: '30px 140px' }} >
        <Grid item sm={6} xs={12} md={6} style={{ backgroundColor: 'rgb(8,183,172)', textAlign: 'center' }}>
          <div >
            <div style={{width:'100%'}}>
              <img style={{width:'60%'}} src={userLogo} />
            </div>
            <article style={{color:'white'}}>
              <h3>Bakery</h3>
              <p>Sign in and enjoy</p>
            </article>
          </div>
        </Grid>


        <Grid item sm={6} xs={12} md={6}  >
          <form onSubmit={formik.handleSubmit} >
            <div style={{ width: '100%' }}>
              <article style={{ textAlign: 'center' }}>

                <h1 style={{ color: 'rgb(8,183,172)', width: '80%' }}>User Sign in</h1>
              </article>
              <br /> <br />

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

                <button type="submit" style={{ backgroundColor: 'rgb(8,183,172)', border: 'none', padding: '6px 30px', color: 'white', width: '80%' }}>
                  SIGN IN
                </button>
              </div>
            </div>

          </form>
        </Grid>
      </Grid>


    </>
  )
}

export default UserLogin