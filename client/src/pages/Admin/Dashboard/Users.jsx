import React, { useEffect, useState } from 'react'
import { getUsers } from '../../../api/requests'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
const Users = () => {
    const [users, setUsers] = useState([])
    useEffect(() => {
        getUsers().then((userArray) => {
          // Kullanıcıları state'e ayarla
          setUsers(userArray);
        });
      }, []);
    return (
        <>
            <TableContainer component={Paper} style={{ width: '100%' }}>
                <caption><h3>Registered users</h3></caption>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow style={{ backgroundColor: 'rgb(241,245,249)', color: 'gray', fontStyle: 'bold' }}>
                            <TableCell align="left">Image</TableCell>
                            <TableCell align="center">Name</TableCell>
                            <TableCell align="center">Email</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow
                                key={user._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="left" style={{ width: '10%' }}  >
                                    <img style={{ width: '60%' }} src={user.image} alt='personImage' />
                                </TableCell>
                                <TableCell align="center">{user.username}</TableCell>
                                <TableCell align="center">{user.email}</TableCell>                               

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default Users