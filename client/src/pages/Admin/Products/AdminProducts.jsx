import React, { useEffect, useState } from 'react'
import { deleteProduct, getAllProducts } from '../../../api/requests';
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
const AdminProducts = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        getAllProducts().then((res) => {
            setProducts(res.data)
        })
    }, [products])
    return (
        <>
            <nav class="navbar navbar-light bg-light" style={{ padding: '0 30px' }}>
                <a class="navbar-brand" href="#" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img src="https://w7.pngwing.com/pngs/415/49/png-transparent-grass-area-symbol-brand-sign-add-logo-grass-desktop-wallpaper.png" width="30" height="30" class="d-inline-block align-top" alt="" />
                    <a class="nav-item nav-link active" ><Link style={{ color: 'black', textDecoration: 'none' }} to='/admin/add-product'>Add Product</Link> <span class="sr-only"></span></a>
                    <a class="nav-item nav-link active" ><Link style={{ color: 'black', textDecoration: 'none' }} to='/admin/product-slider'>Go to Sliders</Link> <span class="sr-only"></span></a>
                </a>



            </nav>

            <TableContainer component={Paper} >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Image</TableCell>
                            <TableCell align="center">Title</TableCell>
                            <TableCell align="center">Is onSale ?</TableCell>
                            <TableCell align="center">Price</TableCell>
                            <TableCell align="center">Price Discount</TableCell>
                            <TableCell align="center">About</TableCell>
                            <TableCell align="center">Delete</TableCell>
                            <TableCell align="center">Edit</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow
                                key={product._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="center" style={{width:'15%'}}>
                                    <img src={product.image} style={{width:'100%'}} />
                                </TableCell>
                                <TableCell align="center">{product.title}</TableCell>
                                <TableCell align="center">{product.onSale ? 'yes' : 'no'}</TableCell>
                                <TableCell align="center">{product.price.toFixed(2)}</TableCell>
                                <TableCell align="center">{product.priceDiscount ? product.priceDiscount.toFixed(2):''}</TableCell>
                                <TableCell align="center">{product.desc}</TableCell>
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
                                            deleteProduct(product._id).then((res) => {
                                                Swal.fire(
                                                    'Deleted!',
                                                    'Your file has been deleted.',
                                                    'success'
                                                )

                                            })
                                            setProducts(products.filter((x) => x._id !== product._id))
                                        }
                                    })
                                }} /></TableCell>
                                <TableCell align="center"> <Link style={{ color: 'white', textDecoration: 'none' }} to={`/admin/shop/edit/${product._id}`}><ModeEditIcon style={{ fontSize: '33px',color: 'blue' }} /></Link></TableCell> 

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default AdminProducts

// <Grid item sm={6} xs={12} md={3}>
                        //     <Card>
                        //         <div className={productStyle.product_image_container}>

                        //             <Card.Img variant="top" src={product.image} />

                        //         </div>
                        //         <Card.Body>
                        //             <Card.Title className={productStyle.product_title}>{product.title}</Card.Title>
                        //             <Card.Text>
                        //                 <span>is onSale? {product.onSale ? 'Yes' : 'No'}</span>
                        //             </Card.Text>
                        //             <Card.Text >
                        //                 <span>
                        //                     Price: ${product.price.toFixed(2)}
                        //                 </span>
                        //             </Card.Text>
                        //             <Card.Text >
                        //                 <span style={{ display: product.priceDiscount ? 'block' : 'none' }}>
                        //                     Discounted price: {product.priceDiscount ? '$' + product.priceDiscount.toFixed(2) : 'no discount'}
                        //                 </span>
                        //             </Card.Text>

                        //             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        //                 <Button variant="outlined" color="error" onClick={() => {
                        //                     Swal.fire({
                        //                         title: 'Are you sure?',
                        //                         text: "You won't be able to revert this!",
                        //                         icon: 'warning',
                        //                         showCancelButton: true,
                        //                         confirmButtonColor: '#3085d6',
                        //                         cancelButtonColor: '#d33',
                        //                         confirmButtonText: 'Yes, delete it!'
                        //                     }).then((result) => {
                        //                         if (result.isConfirmed) {
                        //                             deleteProduct(product._id).then((res) => {
                        //                                 Swal.fire(
                        //                                     'Deleted!',
                        //                                     'Your file has been deleted.',
                        //                                     'success'
                        //                                 )

                        //                             })
                        //                             setProducts(products.filter((x) => x._id !== product._id))
                        //                         }
                        //                     })
                        //                 }}>
                        //                     Delete
                        //                 </Button>
                        //                 <Button variant="contained" color="success">
                        //                     <Link style={{ color: 'white', textDecoration: 'none' }} to={`/admin/shop/edit/${product._id}`}>Edit</Link>
                        //                 </Button>
                        //             </div>
                        //         </Card.Body>
                        //     </Card>


                        // </Grid>