import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getAllProgress } from '../../../api/requests';
import { Progress } from 'antd';
const Skills = () => {
    const [progress, setProgress] = useState([])
    useEffect(() => {
        getAllProgress().then((res) => {
            setProgress(res.data)
        })
    }, [])
    return (
        <>
        <h6 style={{fontFamily:'Lobster', marginTop:'20px'}}>Progresss Table</h6> <br/>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead style={{backgroundColor:'rgb(209,162,255)'}}>
                    <TableRow>
                        <TableCell align="center">Name</TableCell>
                        <TableCell align="center">Progress</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {progress.map((prog) => (
                        <TableRow
                            key={prog._id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                           
                            <TableCell align="center">{prog.progressName}</TableCell>
                            <TableCell align="center"> <Progress percent={prog.progressCount} size="small" /></TableCell>

                            
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        </>
    )
}

export default Skills