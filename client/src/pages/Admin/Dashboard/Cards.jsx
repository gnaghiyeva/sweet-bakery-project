import React, { useEffect, useState } from 'react'
import { getAllBlogs, getAllComments, getAllServices, getAllWorks } from '../../../api/requests';
import InventoryIcon from '@mui/icons-material/Inventory';
import BookIcon from '@mui/icons-material/Book';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import SmsIcon from '@mui/icons-material/Sms';
import { Grid } from '@mui/material';
import { Card } from 'antd';
const Cards = () => {
    const [products, setProducts] = useState([])
    const [blogs, setBlogs] = useState([])
    const [services, setServices] = useState([])
    const [comments, setComments] = useState([])

    useEffect(() => {
        getAllWorks().then((res) => {
            setProducts(res.data)
        })
    }, [])

    useEffect(() => {
        getAllBlogs().then((res) => {
            setBlogs(res.data)
        })
    }, [])

    useEffect(() => {
        getAllServices().then((res) => {
            setServices(res.data)
        })
    }, [])

    useEffect(() => {
        getAllComments().then((res) => {
            setComments(res.data)
        })
    }, [])
    return (
        <Grid container spacing={2} style={{ padding: '60px 30px', backgroundColor: 'rgb(98,75,255)' }}>

            <Grid item sm={6} xs={12} md={3} lg={3}>
                <Card
                    
                >
                     <article style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h6>Total Works</h6>
                        <span style={{ padding: '7px', backgroundColor: 'rgb(224,220,254)', marginRight: '5px' }}><InventoryIcon /></span>
                    </article>
                    <br />
                    <h1>{products.length}</h1>
                </Card>
            </Grid>
            <Grid item sm={6} xs={12} md={3} lg={3}>
                <Card
                    
                >
                     <article style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h6>Total Blogs</h6>
                        <span style={{ padding: '7px', backgroundColor: 'rgb(224,220,254)', marginRight: '5px' }}><BookIcon /></span>
                    </article>
                    <br />
                    <h1>{blogs.length}</h1>
                </Card>
            </Grid>

            <Grid item sm={6} xs={12} md={3} lg={3}>
                <Card
                    
                >
                     <article style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h6>Total Services</h6>
                        <span style={{ padding: '7px', backgroundColor: 'rgb(224,220,254)', marginRight: '5px' }}><MiscellaneousServicesIcon /></span>
                    </article>
                    <br />
                    <h1>{services.length}</h1>
                </Card>
            </Grid>
            <Grid item sm={6} xs={12} md={3} lg={3}>
                <Card
                   
                >
                     <article style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h6>Total Comments</h6>
                        <span style={{ padding: '7px', backgroundColor: 'rgb(224,220,254)', marginRight: '5px' }}><SmsIcon /></span>
                    </article>
                    <br />
                    <h1>{comments.length}</h1>
                </Card>
            </Grid>

        </Grid>
    )
}

export default Cards