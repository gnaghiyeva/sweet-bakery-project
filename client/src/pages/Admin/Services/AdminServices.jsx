import React, { useEffect, useState } from 'react'
import { deleteService, getAllServices } from '../../../api/requests'
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
import { Link } from 'react-router-dom';

const AdminServices = () => {
    const [services, setServices] = useState([])
    useEffect(() => {
        getAllServices().then((res) => {
            setServices(res.data)
        })
    }, [services])
    return (

        <>

            <nav class="navbar navbar-light bg-light" style={{padding:'0 30px'}}>
                <a class="navbar-brand" href="#" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img src="https://w7.pngwing.com/pngs/415/49/png-transparent-grass-area-symbol-brand-sign-add-logo-grass-desktop-wallpaper.png" width="30" height="30" class="d-inline-block align-top" alt="" />
                    <a class="nav-item nav-link active" ><Link style={{ color: 'black', textDecoration: 'none' }} to='/admin/add-service'>Add Service</Link> <span class="sr-only"></span></a>
                </a>
            </nav>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Image</TableCell>
                            <TableCell align="center">Title</TableCell>
                            <TableCell align="center">Description</TableCell>
                            <TableCell align="center">Delete</TableCell>
                            <TableCell align="center">Edit</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {services.map((service) => (
                            <TableRow
                                key={service._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="center">
                                    <img src={service.image} />
                                </TableCell>
                                <TableCell align="center">{service.title}</TableCell>
                                <TableCell align="center">{service.description}</TableCell>
                                <TableCell align="center"><DeleteIcon style={{ color: 'red', fontSize: '33px' }} onClick={() => {
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
                                            deleteService(service._id).then((res) => {
                                                Swal.fire(
                                                    'Deleted!',
                                                    'Your file has been deleted.',
                                                    'success'
                                                )

                                            })
                                            setServices(services.filter((x) => x._id !== service._id))
                                        }
                                    })
                                }} /></TableCell>
                                <TableCell align="center"><Link to={`/admin/service/edit/${service._id}`}><ModeEditIcon style={{ fontSize: '33px' }} /></Link></TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </>
    )
}

export default AdminServices