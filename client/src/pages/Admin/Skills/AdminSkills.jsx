import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { deleteProgress, deleteSkill, getAllProgress, getAllSkills } from '../../../api/requests'
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
import { Progress } from 'antd';
import { Helmet } from 'react-helmet';
import favicon from '../../../assets/favicon-logo.png'

const AdminSkills = () => {
    const [skills, setSkills] = useState([])
    useEffect(() => {
        getAllSkills().then((res) => {
            setSkills(res.data)
        })
    }, [skills])

    const [progress, setProgress] = useState([])
    useEffect(() => {
        getAllProgress().then((res) => {
            setProgress(res.data)
        })
    }, [progress])

    return (

        <>
            <Helmet>
                <title>Admin Skills</title>
                <link rel="icon" type="image/x-icon" href={favicon} />
            </Helmet>
            <nav class="navbar navbar-light bg-light" style={{ padding: '0 30px' }}>
                <a class="navbar-brand" href="!#" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img src="https://w7.pngwing.com/pngs/415/49/png-transparent-grass-area-symbol-brand-sign-add-logo-grass-desktop-wallpaper.png" width="30" height="30" class="d-inline-block align-top" alt="" />
                    <a class="nav-item nav-link active" href="!#"><Link style={{ color: 'black', textDecoration: 'none' }} to='/admin/add-skill'>Add Skill</Link> <span class="sr-only"></span></a>
                    <a class="nav-item nav-link active" href="!#"><Link style={{ color: 'black', textDecoration: 'none' }} to='/admin/add-progress'>Add Progress</Link> <span class="sr-only"></span></a>
                </a>
            </nav>

            <Grid container spacing={2}>
                <Grid item sm={6} xs={12} md={12} lg={6}>
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
                                            <img style={{ width: '70%' }} src={skill.image} alt='skillImage'/>
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

                <Grid item sm={6} xs={12} md={12} lg={6}>
                    <TableContainer component={Paper} >
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Image</TableCell>
                                    <TableCell align="center">Title</TableCell>
                                    <TableCell align="center">Delete</TableCell>
                                    <TableCell align="center">Edit</TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {progress.map((prog) => (
                                    <TableRow
                                        key={prog._id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align="center">
                                            <Progress
                                                type="circle"
                                                percent={prog.progressCount}
                                                strokeColor={{
                                                    '0%': '#108ee9',
                                                    '100%': '#87d068',
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell align="center">{prog.progressName}</TableCell>

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
                                                    deleteProgress(prog._id).then((res) => {
                                                        Swal.fire(
                                                            'Deleted!',
                                                            'Your file has been deleted.',
                                                            'success'
                                                        )

                                                    })
                                                    setSkills(progress.filter((x) => x._id !== prog._id))
                                                }
                                            })
                                        }} /></TableCell>
                                        <TableCell align="center"><Link to={`/admin/progress/edit/${prog._id}`}><ModeEditIcon style={{ fontSize: '33px' }} /></Link></TableCell>

                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>



        </>
    )
}

export default AdminSkills