import React, { useEffect, useState } from 'react'
import { getAllDatas } from '../../../../api/requests';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { Link } from 'react-router-dom';
import favicon from '../../../../assets/favicon-logo.png'
import { Helmet } from 'react-helmet';
const AdminContact = () => {
  const [datas, setDatas] = useState([]);
  useEffect(() => {
    getAllDatas().then((res) => {
      setDatas(res.data)
    })
  }, [datas])
  return (
    <>
      <Helmet>
        <title>Admin Contact</title>
        <link rel="icon" type="image/x-icon" href={favicon} />
      </Helmet>
      <nav class="navbar navbar-light bg-light">
        <a class="navbar-brand" href="!#" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '0 20px' }}>
          <img src="https://static.thenounproject.com/png/396915-200.png" width="30" height="30" class="d-inline-block align-top" alt="" />
          <a class="nav-item nav-link active" href='!#'><Link style={{ color: 'black', textDecoration: 'none' }} to='/admin/contact-slider'>Go to Slider</Link> <span class="sr-only"></span></a>
        </a>
      </nav>

      <TableContainer component={Paper} style={{ width: '100%' }}  >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Title</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center" >Location</TableCell>
              <TableCell align="center">Address</TableCell>
              <TableCell align="center">City</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Phone</TableCell>
              <TableCell align="center">Time in</TableCell>
              <TableCell align="center">Time out</TableCell>
              <TableCell align="center">Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {datas.map((data) => (
              <TableRow
                key={data._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="center">{data.title}</TableCell>
                <TableCell align="center">{data.desc}</TableCell>
                <TableCell align="center" style={{ maxWidth: '300px', overflow: 'scroll', }}>{data.location}</TableCell>


                <TableCell align="center">{data.address}</TableCell>
                <TableCell align="center">{data.city}</TableCell>
                <TableCell align="center">{data.email}</TableCell>
                <TableCell align="center">{data.phone}</TableCell>
                <TableCell align="center">{data.timein}</TableCell>
                <TableCell align="center">{data.timeout}</TableCell>


                <TableCell align="center"> <Link style={{ color: 'white', textDecoration: 'none' }} to={`/admin/contact/edit/${data._id}`}><ModeEditIcon style={{ fontSize: '33px', color: 'blue' }} /></Link></TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default AdminContact