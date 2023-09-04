import React, { useEffect, useState } from 'react'
import { deleteComment, getAllComments } from '../../../../api/requests';
import { Helmet } from 'react-helmet';
import favicon from '../../../../assets/favicon-logo.png'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from "sweetalert2";
const AdminComments = () => {
    const [comments, setComments] = useState([]);
    useEffect(() => {
        getAllComments().then((res) => {
            setComments(res.data)
        })
    }, [comments])
    return (
        <>
            <Helmet>
                <title>Admin Comments</title>
                <link rel="icon" type="image/x-icon" href={favicon} />
            </Helmet>

            <TableContainer component={Paper} >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">ProductID</TableCell>
                            <TableCell align="center">Name</TableCell>
                            <TableCell align="center">Email</TableCell>
                            <TableCell align="center">Rating</TableCell>
                            <TableCell align="center">Review</TableCell>
                            <TableCell align="center">Delete</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {comments.map((comment) => (
                            <TableRow
                                key={comment._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                
                                <TableCell align="center">{comment.productID}</TableCell>
                                <TableCell align="center">{comment.name}</TableCell>
                                <TableCell align="center">{comment.email}</TableCell>
                                <TableCell align="center">{comment.rating}</TableCell>
                                <TableCell align="center">{comment.review}</TableCell>
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
                                            deleteComment(comment._id).then((res) => {
                                                Swal.fire(
                                                    'Deleted!',
                                                    'Your file has been deleted.',
                                                    'success'
                                                )

                                            })
                                            setComments(comments.filter((x) => x._id !== comment._id))
                                        }
                                    })
                                }} /></TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default AdminComments