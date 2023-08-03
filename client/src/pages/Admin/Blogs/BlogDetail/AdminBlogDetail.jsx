import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { deleteBlogDetail, getBlogById, getBlogDetailById } from '../../../../api/requests';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Swal from "sweetalert2";
import { Pagination } from '@mui/material';
const AdminBlogDetail = () => {
  const [blogDetails, setBlogDetails] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    getBlogDetailById(id).then((res) => {
      setBlogDetails(res);
    });
  }, [id]);



  return (
    <>

      <nav class="navbar navbar-light bg-light">
        <a class="navbar-brand" href="#" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img src="https://static.thenounproject.com/png/396915-200.png" width="30" height="30" class="d-inline-block align-top" alt="" />
          <a class="nav-item nav-link active" ><Link style={{ color: 'black', textDecoration: 'none' }} to='/admin/blog-detail/add-detail'>Add Detail Info</Link> <span class="sr-only"></span></a>
        </a>
      </nav>



      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center"><b>Image</b></TableCell>
              <TableCell align="center"><b>Description</b></TableCell>
              <TableCell align="center"><b>Menu Title</b></TableCell>
              <TableCell align="center"><b>Guest Title</b></TableCell>
              <TableCell align="center"><b>Menu Description</b></TableCell>
              <TableCell align="center"><b>Guest Description</b></TableCell>
              <TableCell align="center"><b>Delete</b></TableCell>
              <TableCell align="center"><b>Edit</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {blogDetails.map((detail) => (
              <TableRow
                key={detail._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >

                <TableCell align="center">
                  <img src={detail.image} width={300} />
                </TableCell>
                <TableCell align="center">{detail.description}</TableCell>
                <TableCell align="center">{detail.menuTitle}</TableCell>
                <TableCell align="center">{detail.guestTitle}</TableCell>
                <TableCell align="center">{detail.menuDesc}</TableCell>
                <TableCell align="center">{detail.guestDesc}</TableCell>
                <TableCell align="center"><DeleteIcon onClick={() => {
                  Swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                  }).then((result) => {
                    if (result.isConfirmed) {
                      deleteBlogDetail(detail._id).then((res) => {
                        Swal.fire(
                          'Deleted!',
                          'Your file has been deleted.',
                          'success'
                        )
                      })
                      setBlogDetails(blogDetails.filter((x) => x._id !== detail._id))
                    }
                  })
                }} /></TableCell>

                <TableCell align="center"><Link to={`/admin/blogDetail/edit/${detail._id}`}><ModeEditIcon /></Link></TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>



    </>
  )
}

export default AdminBlogDetail