import React, { useEffect, useState } from 'react'
import { getAllContactSliders } from '../../../../api/requests'
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { Grid } from '@mui/material';
import favicon from '../../../../assets/favicon-logo.png'
import { Helmet } from 'react-helmet';
const AdminContactSliders = () => {
    const [sliders, setSliders] = useState([])
    useEffect(() => {
        getAllContactSliders().then((res) => {
            setSliders(res.data)
            console.log(res.data)
        })
    }, [sliders])
    return (
        <>
            <Helmet>
                <title>Admin Sliders</title>
                <link rel="icon" type="image/x-icon" href={favicon} />
            </Helmet>
            <Grid container spacing={2} style={{ padding: '30px 40px' }}>
                {sliders && sliders.map((slider) => {
                    return (
                        <Grid item sm={6} xs={12} md={3}>
                            <Card style={{ height: '350px' }}>
                                <Card.Img variant="top" src={slider.image} height={200} />
                                <Card.Body>
                                    <Card.Title>{slider.title}</Card.Title>

                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <button type="button" class="btn btn-outline-info"><Link style={{ textDecoration: 'none' }} to={`/admin/contact-slider/edit/${slider._id}`}>Edit</Link></button>
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

export default AdminContactSliders