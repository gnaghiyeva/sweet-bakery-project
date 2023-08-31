import React, { useEffect, useState } from 'react'
import { deletePerson, getAllTeam } from '../../../api/requests'
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
import { Helmet } from 'react-helmet';
import favicon from '../../../assets/favicon-logo.png'
const AdminTeam = () => {
    const [teams, setTeams] = useState([])
    useEffect(() => {
        getAllTeam().then((res) => {
            setTeams(res.data)
        })
    }, [teams])
    return (
        <>
            <Helmet>
                <title>Admin Teams</title>
                <link rel="icon" type="image/x-icon" href={favicon} />
            </Helmet>

            <nav class="navbar navbar-light bg-light" style={{ padding: '0 30px' }}>
                <a class="navbar-brand" href="#" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img width={50} src="https://img.freepik.com/free-icon/user_318-460608.jpg" alt="" />
                    <a class="nav-item nav-link active" ><Link style={{ color: 'black', textDecoration: 'none' }} to='/admin/add-person'>Add Person</Link> <span class="sr-only"></span></a>
                </a>
            </nav>
            <TableContainer component={Paper} style={{ width: '60%', margin: '0 auto' }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Image</TableCell>
                            <TableCell align="center">Fullname</TableCell>
                            <TableCell align="center">Description</TableCell>
                            <TableCell align="center">Delete</TableCell>
                            <TableCell align="center">Edit</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {teams.map((person) => (
                            <TableRow
                                key={person._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="center">
                                    <img style={{ width: '30%' }} src={person.image} />
                                </TableCell>
                                <TableCell align="center">{person.fullname}</TableCell>
                                <TableCell align="center">{person.description}</TableCell>

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
                                            deletePerson(person._id).then((res) => {
                                                Swal.fire(
                                                    'Deleted!',
                                                    'Your file has been deleted.',
                                                    'success'
                                                )

                                            })
                                            setTeams(teams.filter((x) => x._id !== person._id))
                                        }
                                    })
                                }} /></TableCell>
                                <TableCell align="center"><Link to={`/admin/team/edit/${person._id}`}><ModeEditIcon style={{ fontSize: '33px' }} /></Link></TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </>
    )
}

export default AdminTeam