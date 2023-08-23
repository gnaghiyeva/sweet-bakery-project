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
        <TableContainer component={Paper} style={{width:'60%', margin:'0 auto'}}>
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
        {basket.map((product) => (
                <TableRow
                    key={product._id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    <TableCell align="left" style={{width:'10%'}} >
                        <img style={{width:'100%'}} src={product.image} />
                    </TableCell>
                    <TableCell align="center">{product.title}</TableCell>
                    <TableCell align="center">{product.priceDiscount.toFixed(2)} $</TableCell>
                    <TableCell align="center">{product.length} $</TableCell>
                   
                   
                </TableRow>
             ))}
        </TableBody>
    </Table>
</TableContainer>
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "70vh",
            }}
        >
            <div>
                <Typography align="center">
                    You Have {basket.length} products in your favorites!
                    <ul>
                        {basket.map((product, index) => (
                            <li key={index}>{product.title}</li>
                        ))}
                    </ul>
                </Typography>
                <Button
                    onClick={handleClearBasket}
                    style={{ display: 'block', margin: '20px auto' }}
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
