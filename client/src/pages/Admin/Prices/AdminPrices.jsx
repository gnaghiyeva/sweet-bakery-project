import React, { useEffect, useState } from 'react'
import { deletePrice, getAllPrices } from '../../../api/requests'
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

const AdminPrices = () => {
    const [prices, setPrices] = useState([])
    useEffect(() => {
        getAllPrices().then((res) => {
            setPrices(res.data)
        })
    }, [prices])
  return (
    <>

            <nav class="navbar navbar-light bg-light" style={{padding:'0 30px'}}>
                <a class="navbar-brand" href="#" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img src="https://w7.pngwing.com/pngs/415/49/png-transparent-grass-area-symbol-brand-sign-add-logo-grass-desktop-wallpaper.png" width="30" height="30" class="d-inline-block align-top" alt="" />
                    <a class="nav-item nav-link active" ><Link style={{ color: 'black', textDecoration: 'none' }} to='/admin/add-price'>Add Price Card</Link> <span class="sr-only"></span></a>
                </a>
            </nav>
            <TableContainer component={Paper} style={{width:'60%', margin:'0 auto'}}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Image</TableCell>
                            <TableCell align="center">Name</TableCell>
                            <TableCell align="center">Price</TableCell>
                            <TableCell align="center">Color</TableCell>
                            <TableCell align="center">Description</TableCell>
                            <TableCell align="center">Delete</TableCell>
                            <TableCell align="center">Edit</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {prices.map((price) => (
                            <TableRow
                                key={price._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="center">
                                    <img style={{width:'30%'}} src={price.image} />
                                </TableCell>
                                <TableCell align="center">{price.name}</TableCell>
                                <TableCell align="center">{price.price}</TableCell>
                                <TableCell align="center">{price.description}</TableCell>
                                <TableCell align="center">{price.color}</TableCell>
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
                                            deletePrice(price._id).then((res) => {
                                                Swal.fire(
                                                    'Deleted!',
                                                    'Your file has been deleted.',
                                                    'success'
                                                )

                                            })
                                            setPrices(prices.filter((x) => x._id !== price._id))
                                        }
                                    })
                                }} /></TableCell>
                                <TableCell align="center"><Link to={`/admin/price/edit/${price._id}`}><ModeEditIcon style={{ fontSize: '33px' }} /></Link></TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </>
  )
}

export default AdminPrices