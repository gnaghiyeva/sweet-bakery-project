import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { deleteSkill, getAllSkills } from '../../../api/requests'
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
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Progress, Space } from 'antd';

const AdminSkills = () => {
    const [skills, setSkills] = useState([])
    useEffect(() => {
        getAllSkills().then((res) => {
            setSkills(res.data)
        })
    }, [skills])
    return (

        <>
            <nav class="navbar navbar-light bg-light" style={{ padding: '0 30px' }}>
                <a class="navbar-brand" href="#" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img src="https://w7.pngwing.com/pngs/415/49/png-transparent-grass-area-symbol-brand-sign-add-logo-grass-desktop-wallpaper.png" width="30" height="30" class="d-inline-block align-top" alt="" />
                    <a class="nav-item nav-link active" ><Link style={{ color: 'black', textDecoration: 'none' }} to='/admin/add-skill'>Add Skill</Link> <span class="sr-only"></span></a>
                </a>
            </nav>
            <Grid container spacing={2} style={{width:'60%', margin:'60px auto'}}>
                
                    <TableContainer component={Paper} >
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
                                {skills.map((skill) => (
                                    <TableRow
                                        key={skill._id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align="center">
                                            <img style={{ width: '70%' }} src={skill.image} />
                                        </TableCell>
                                        <TableCell align="center">{skill.title}</TableCell>
                                        <TableCell align="center">{skill.description}</TableCell>
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
                                                    deleteSkill(skill._id).then((res) => {
                                                        Swal.fire(
                                                            'Deleted!',
                                                            'Your file has been deleted.',
                                                            'success'
                                                        )

                                                    })
                                                    setSkills(skills.filter((x) => x._id !== skill._id))
                                                }
                                            })
                                        }} /></TableCell>
                                        <TableCell align="center"><Link to={`/admin/skills/edit/${skill._id}`}><ModeEditIcon style={{ fontSize: '33px' }} /></Link></TableCell>

                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>

              
            
        </>
    )
}

export default AdminSkills