import React, { useEffect, useState } from 'react'
import { deleteWork, getAllWorks } from '../../../api/requests';
import { Grid } from '@mui/material';
import workStyle from '../../../style/works.module.css'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Swal from "sweetalert2";
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import favicon from '../../../assets/favicon-logo.png'

const AdminWorks = () => {
    const [works, setWorks] = useState([]);
    useEffect(() => {
        getAllWorks().then((res) => {
            setWorks(res.data)
        })
    }, [works])
    return (

        <>
            <Helmet>
                <title>Admin Works</title>
                <link rel="icon" type="image/x-icon" href={favicon} />
            </Helmet>
            <nav class="navbar navbar-light bg-light" style={{ padding: '0 30px' }}>
                <a class="navbar-brand" href={() => false} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img src="https://w7.pngwing.com/pngs/415/49/png-transparent-grass-area-symbol-brand-sign-add-logo-grass-desktop-wallpaper.png" width="30" height="30" class="d-inline-block align-top" alt="" />
                    <a class="nav-item nav-link active" href={() => false} ><Link style={{ color: 'black', textDecoration: 'none' }} to='/admin/add-work'>Add Work</Link> <span class="sr-only"></span></a>
                </a>
            </nav>
            <Grid container spacing={2} style={{ padding: '50px 60px' }}>
                {works && works.map((work) => {
                    return (
                        <Grid item sm={6} xs={12} md={4} lg={3}>
                            <Card >
                                <div className={workStyle.works_card}>
                                    <Card.Img variant="top" src={work.image} />
                                </div>


                                <Card.Body>
                                    <Card.Title className={workStyle.works_card_title}>{work.title}</Card.Title>
                                    <Card.Text className={workStyle.works_card_description}>
                                        {work.description}
                                    </Card.Text>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Button variant="outline-danger" onClick={() => {
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
                                                    deleteWork(work._id).then((res) => {
                                                        Swal.fire(
                                                            'Deleted!',
                                                            'Your file has been deleted.',
                                                            'success'
                                                        )

                                                    })
                                                    setWorks(works.filter((x) => x._id !== work._id))
                                                }
                                            })
                                        }} >Delete</Button>
                                        <Button variant="outline-info"><Link style={{ textDecoration: 'none' }} to={`/admin/work/edit/${work._id}`}>Edit</Link></Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Grid>
                    )
                })}
            </Grid>
        </>

    )
}

export default AdminWorks