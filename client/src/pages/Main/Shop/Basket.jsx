import { Button, Typography } from '@mui/material';
import React from 'react'
import { useBasketContext } from '../../../context/BasketContext';
import Swal from "sweetalert2";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const Basket = () => {
    const { basket, setBasket } = useBasketContext();
    console.log("Basket Data:", basket);

    const getProductCount = (productId) => {
        return basket.reduce((count, product) => {
            if (product._id === productId) {
                return count + 1;
            }
            return count;
        }, 0);
    }

    function handleClearBasket() {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: 'Are you sure to empty favorites?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                setBasket([]);
                swalWithBootstrapButtons.fire(
                    'Deleted!',
                    'Your favorites has been cleared.',
                    'success'
                )
            } else if (
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                    'Cancelled',
                    'Your favorites is safe :)',
                    'error'
                )
            }
        })
    }
    return (

        <>
            <TableContainer component={Paper} style={{ width: '60%', margin: '0 auto' }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center"></TableCell>
                            <TableCell align="center">Title</TableCell>
                            <TableCell align="center">Price</TableCell>
                            <TableCell align="center">Quantity</TableCell>
                            <TableCell align="center">Total</TableCell>


                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Array.from(new Set(basket.map(product => product._id))).map(productId => {
                            const product = basket.find(item => item._id === productId);
                            const productCount = basket.filter(item => item._id === productId).length;

                            return (
                                <TableRow key={productId}>
                                    <TableCell align="left" style={{ width: '10%' }} >
                                        <img style={{ width: '100%' }} src={product.image} alt={product.title} />
                                    </TableCell>
                                    <TableCell align="center">
                                        {`${product.title}`}
                                    </TableCell>
                                    <TableCell align="center">
                                        {product.priceDiscount ? product.priceDiscount.toFixed(2) : product.price.toFixed(2)} $
                                    </TableCell>
                                    <TableCell align="center">{productCount}</TableCell>
                                    <TableCell align="center">{product.priceDiscount ? (product.priceDiscount.toFixed(2) * productCount).toFixed(2) + ' $' : (product.price.toFixed(2) * productCount).toFixed(2) +' $' }</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: "10vh",
                }}
            >
                <div>
                
                    <Button
                        onClick={handleClearBasket}
                      
                        variant="contained"
                        color="warning"
                    >
                        Clear All?
                    </Button>
                </div>
            </div>
        </>
    )
}

export default Basket;
