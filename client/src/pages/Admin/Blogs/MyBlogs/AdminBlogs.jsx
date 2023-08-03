import React, { useEffect, useState } from 'react'
import { deleteBlog, getAllBlogs } from '../../../../api/requests'
import { Link } from 'react-router-dom'
import Swal from "sweetalert2";
import { Divider, Grid, Pagination } from '@mui/material';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
const AdminBlogs = () => {
    const [blogs, setBlogs] = useState([])
    const [pages, setPages] = useState(1);
    const blogsPage = 3;

    useEffect(() => {
        getAllBlogs().then((res) => {
            setBlogs(res.data)
            console.log(res.data)
        })
    }, [blogs])

    const lastBlog = pages * blogsPage;
    const firstBlog = lastBlog - blogsPage;
    const currentBlogs = blogs.slice(firstBlog, lastBlog);

    const handleChangePage = (e, page) => {
        setPages(page);
    };

    // ********************************************************



    return (
        <>
            <nav class="navbar navbar-light bg-light">
                <a class="navbar-brand" href="#" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img src="https://static.thenounproject.com/png/396915-200.png" width="30" height="30" class="d-inline-block align-top" alt="" />
                    <a class="nav-item nav-link active" ><Link style={{ color: 'black', textDecoration: 'none' }} to='/admin/add-blog'>Add Blog</Link> <span class="sr-only"></span></a>
                    <a class="nav-item nav-link active" ><Link style={{ color: 'black', textDecoration: 'none' }} to='/admin/blogs/slider'>Go to Blog Sliders</Link> <span class="sr-only"></span></a>
                </a>
            </nav>

            <Grid container spacing={2} style={{ padding: '0 40px' }}>
                {blogs && blogs.map((blog) => {
                    return (
                        <Grid item sm={6} xs={12} md={3}>
                            

                            <Card>
                                <Card.Img variant="top" src={blog.image} />
                                <Card.Body>
                                    <span>{blog.releaseDate}</span>
                                    <Card.Title><Link to={`/admin/blog/${blog._id}`}>{blog.title}</Link></Card.Title>
                                    <Card.Text>
                                        <p>{blog.description}</p>
                                    </Card.Text>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>

                                        <button type="button" class="btn btn-outline-danger" onClick={() => {
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
                                                    deleteBlog(blog._id).then((res) => {
                                                        Swal.fire(
                                                            'Deleted!',
                                                            'Your file has been deleted.',
                                                            'success'
                                                        )

                                                    })
                                                    setBlogs(blogs.filter((x) => x._id !== blog._id))
                                                }
                                            })
                                        }}>Delete</button>
                                        <button type="button" class="btn btn-outline-info"><Link style={{ textDecoration: 'none' }} to={`/admin/blog/edit/${blog._id}`}>Edit</Link></button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Grid>
                    )
                })}

            </Grid>

            {/* <TableContainer component={Paper}>
                <Table aria-label="simple table" size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <b>Image</b>
                            </TableCell>
                            <TableCell align="center">
                                <b>Title</b>
                            </TableCell>
                            <TableCell align="center">
                                <b>Release Date</b>
                            </TableCell>
                            <TableCell>
                                <b>Description</b>
                            </TableCell>
                            <TableCell align="center">
                                <b>Color</b>
                            </TableCell>
                            <TableCell align="center">
                                <b>Delete</b>
                            </TableCell>
                            <TableCell align="center">
                                <b>Edit</b>
                            </TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentBlogs.map((blog) => (
                            <TableRow key={blog._id}>
                                <TableCell component="th" scope="row">
                                    <img width={200} src={blog.image} alt="logo" />
                                </TableCell>
                                <TableCell align="center" size="small">
                                    {blog.title}
                                </TableCell>
                                <TableCell align="center" size="small">
                                    {blog.releaseDate}
                                </TableCell>
                                <TableCell align="center" size="small">
                                    {blog.description}
                                </TableCell>
                                <TableCell align="center" size="small">
                                    {blog.color}
                                </TableCell>
                                <TableCell align="center" size="small">
                                    <DeleteIcon style={{ color: 'red', fontSize: '33px' }} onClick={() => {
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
                                                deleteBlog(blog._id).then((res) => {
                                                    Swal.fire(
                                                        'Deleted!',
                                                        'Your file has been deleted.',
                                                        'success'
                                                    )

                                                })
                                                setBlogs(blogs.filter((x) => x._id !== blog._id))
                                            }
                                        })
                                    }} />
                                </TableCell>
                                <TableCell align="center"><Link to={`/admin/blog/edit/${blog._id}`}><ModeEditIcon style={{ fontSize: '33px' }} /></Link></TableCell>


                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <Pagination
                    count={Math.ceil(blogs.length / blogsPage)}
                    page={pages}
                    onChange={handleChangePage}
                />
            </TableContainer>
<br/>
<Divider/>
<br/>
            <TableContainer component={Paper}>
                <Table aria-label="simple table" size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <b>Image</b>
                            </TableCell>
                            <TableCell align="center">
                                <b>Title</b>
                            </TableCell>
                            <TableCell align="center">
                                <b>Release Date</b>
                            </TableCell>
                            <TableCell>
                                <b>Description</b>
                            </TableCell>
                            <TableCell align="center">
                                <b>Color</b>
                            </TableCell>
                            <TableCell align="center">
                                <b>Delete</b>
                            </TableCell>
                            <TableCell align="center">
                                <b>Edit</b>
                            </TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentBlogs.map((blog) => (
                            <TableRow key={blog._id}>
                                <TableCell component="th" scope="row">
                                    <img width={200} src={blog.image} alt="logo" />
                                </TableCell>
                                <TableCell align="center" size="small">
                                    {blog.title}
                                </TableCell>
                                <TableCell align="center" size="small">
                                    {blog.releaseDate}
                                </TableCell>
                                <TableCell align="center" size="small">
                                    {blog.description}
                                </TableCell>
                                <TableCell align="center" size="small">
                                    {blog.color}
                                </TableCell>
                                <TableCell align="center" size="small">
                                    <DeleteIcon style={{ color: 'red', fontSize: '33px' }} onClick={() => {
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
                                                deleteBlog(blog._id).then((res) => {
                                                    Swal.fire(
                                                        'Deleted!',
                                                        'Your file has been deleted.',
                                                        'success'
                                                    )

                                                })
                                                setBlogs(blogs.filter((x) => x._id !== blog._id))
                                            }
                                        })
                                    }} />
                                </TableCell>
                                <TableCell align="center"><Link to={`/admin/blog/edit/${blog._id}`}><ModeEditIcon style={{ fontSize: '33px' }} /></Link></TableCell>


                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <Pagination
                    count={Math.ceil(blogs.length / blogsPage)}
                    page={pages}
                    onChange={handleChangePage}
                />
            </TableContainer> */}


        </>
    )
}

export default AdminBlogs