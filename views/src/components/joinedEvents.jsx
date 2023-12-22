import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useAuth } from '../AuthContext.jsx';

const JoinedOpportunitiesTable = () => {
    const { user, isLoggedIn} = useAuth();
    const studentId = user._id;
    const [joinedOpportunities, setJoinedOpportunities] = useState([]);

    useEffect(() => {
        const fetchJoinedOpportunities = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/opportunity/student/${studentId}/joinedOpportunities`);

                if (response.ok) {
                    const data = await response.json();
                    setJoinedOpportunities(data.opportunities);
                } else {
                    console.error('Failed to fetch joined opportunities:', response.statusText);
                }
            } catch (error) {
                console.error('Error during fetch:', error);
            }
        };

        fetchJoinedOpportunities();
    }, [studentId]); // Fetch opportunities when studentId changes

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="joined opportunities table">
                <TableHead>
                    <TableRow>
                        <TableCell>Title</TableCell>
                        <TableCell align="left">Category</TableCell>
                        <TableCell align="left">Mentor</TableCell>
                        <TableCell align="left">Description</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {joinedOpportunities.map((opportunity) => (
                        <TableRow key={opportunity._id}>
                            <TableCell component="th" scope="row">
                                {opportunity.title}
                            </TableCell>
                            <TableCell align="left">{opportunity.category}</TableCell>
                            <TableCell align="left">{opportunity.mentor.name}</TableCell>
                            <TableCell align="left">{opportunity.description}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default JoinedOpportunitiesTable;
