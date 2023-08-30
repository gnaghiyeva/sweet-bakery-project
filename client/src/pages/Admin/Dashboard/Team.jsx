import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getAllTeam } from '../../../api/requests';
const Team = () => {
    const [teams, setTeams] = useState([])
    useEffect(() => {
        getAllTeam().then((res) => {
            setTeams(res.data)
        })
    }, [])
    return (
        <>
        <br/>
        <TableContainer component={Paper} style={{width:'100%'}}>
            <caption><h3>Teams</h3></caption>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow style={{backgroundColor:'rgb(241,245,249)', color:'gray', fontStyle:'bold'}}>
                        <TableCell align="left">Image</TableCell>
                        <TableCell align="center">Fullname</TableCell>
                        <TableCell align="center">Description</TableCell>
                       

                    </TableRow>
                </TableHead>
                <TableBody>
                    {teams.map((person) => (
                        <TableRow
                            key={person._id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="left" style={{ width: '10%' }}  >
                                <img style={{ width: '60%' }}  src={person.image} />
                            </TableCell>
                            <TableCell align="center">{person.fullname}</TableCell>
                            <TableCell align="center">{person.description}</TableCell>

                           
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        </>
    )
}

export default Team