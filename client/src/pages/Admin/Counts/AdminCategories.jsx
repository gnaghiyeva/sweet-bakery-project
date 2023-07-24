import React, { useEffect, useState } from 'react'
import { deleteCategory, getAllCategories } from '../../../api/requests'
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import { Grid } from '@mui/material';
import Swal from "sweetalert2";

const AdminCategories = () => {
    const [categories, setCategories] = useState([])
    useEffect(() => {
        getAllCategories().then((res) => {
            setCategories(res.data)
        })
    }, [categories])
    return (
        <>
            <nav class="navbar navbar-light bg-light" style={{padding:'0 30px'}}>
                <a class="navbar-brand" href="#" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img src="https://static.thenounproject.com/png/396915-200.png" width="30" height="30" class="d-inline-block align-top" alt="" />
                    <a class="nav-item nav-link active" ><Link style={{ color: 'black', textDecoration: 'none' }} to='/admin/add-category'>Add Category</Link> <span class="sr-only"></span></a>
                </a>
            </nav>

            <Grid container spacing={2} style={{ padding: '30px 40px' }}>
                {categories && categories.map((category) => {
                    return (
                        <Grid item sm={6} xs={12} md={3}>
                            <Card>
                                <Card.Body>
                                    <Card.Title>{category.name}</Card.Title>
                                    
                                    <Card.Text>
                                       count: {category.count}
                                    </Card.Text>
                                    <Card.Link href="#" onClick={() => {
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
                                                    deleteCategory(category._id).then((res) => {
                                                        Swal.fire(
                                                            'Deleted!',
                                                            'Your file has been deleted.',
                                                            'success'
                                                        )

                                                    })
                                                    setCategories(categories.filter((x) => x._id !== category._id))
                                                }
                                            })
                                        }}>Delete</Card.Link>
                                    <Card.Link href="#"><Link to={`/admin/category/edit/${category._id}`}>Edit</Link></Card.Link>
                                </Card.Body>
                            </Card>
                        </Grid>
                    )
                })}

            </Grid>
        </>
    )
}

export default AdminCategories