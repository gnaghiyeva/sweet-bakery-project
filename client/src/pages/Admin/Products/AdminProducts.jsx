import React, { useEffect, useState } from 'react'
import { deleteProduct, getAllProducts } from '../../../api/requests';
import Button from '@mui/material/Button';
import Card from 'react-bootstrap/Card';
import productStyle from '../../../style/products.module.css'
import { Grid } from '@mui/material';
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
                </a>
            </nav>

            <Grid container spacing={2} style={{ padding: '50px 140px' }}>
                {products && products.map((product) => {
                    return (
                        <Grid item sm={6} xs={12} md={3}>
                            <Card>
                                <div className={productStyle.product_image_container}>

                                    <Card.Img variant="top" src={product.image} />

                                </div>
                                <Card.Body>
                                    <Card.Title className={productStyle.product_title}>{product.title}</Card.Title>
                                    <Card.Text>
                                        <span>is onSale? {product.onSale ? 'Yes' : 'No'}</span>
                                    </Card.Text>
                                    <Card.Text >
                                        <span>
                                            Price: ${product.price.toFixed(2)}
                                        </span>
                                    </Card.Text>
                                    <Card.Text >
                                        <span style={{ display: product.priceDiscount ? 'block' : 'none' }}>
                                            Discounted price: {product.priceDiscount ? '$' + product.priceDiscount.toFixed(2) : 'no discount'}
                                        </span>
                                    </Card.Text>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Button variant="outlined" color="error" onClick={() => {
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
                                        }}>
                                            Delete
                                        </Button>
                                        <Button variant="contained" color="success">
                                            <Link style={{ color: 'white', textDecoration: 'none' }} to={`/admin/shop/edit/${product._id}`}>Edit</Link>
                                        </Button>
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

export default AdminProducts