import React from 'react'
import ErrorIcon from '@mui/icons-material/Error';
import  errorimage from '../../../assets/404.png'
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const AdminNotFound = () => {
  return (
    <div style={{backgroundColor:'rgb(244,245,250)'}}>
      <article style={{textAlign:'center'}}>
        <h1 style={{fontSize:'5em', color:'gray'}}>404</h1>
        <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
        <h2 style={{fontSize:'2em', color:'gray'}}>Page Not Found </h2>
        <span style={{marginLeft:'10px'}}><ErrorIcon style={{color:'gray'}}/></span>
        </div>
        <p style={{fontSize:'1em', color:'gray'}}>We couldn′t find the page you are looking for.</p>

        <div style={{width:'50%', margin:'auto'}}>
          <img style={{width:'100%'}} src={errorimage}/>
        </div>
        <Button variant='contained'><Link style={{color:'white', textDecoration:'none'}} to={'/admin'}>Go Admin Page</Link></Button>
      </article>
    </div>
  )
}

export default AdminNotFound