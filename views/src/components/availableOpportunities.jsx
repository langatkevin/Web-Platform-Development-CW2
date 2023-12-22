
import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useAuth} from "../AuthContext.jsx";

export default function AvailableOpportunitiesTable() {
    const [opportunities, setOpportunities] = useState([]);
    const { user, isLoggedIn} = useAuth();
    const userId =user._id;

    const handleAttendClick = async (opportunityId) => {
        try {


            const response = await fetch(`http://localhost:3001/api/opportunity/${opportunityId}/addStudent`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ studentId: userId }),
            });

            if (response.ok) {
                console.log('Joined Opportunity');
                alert('Joined Opportunity');
            } else {
                console.error('Failed to join opportunity:', response.statusText);
                alert('Failed to join Opportunity');
            }
        } catch (error) {
            console.error('Error during opportunity join:', error);
            alert('Error during Opportunity join');
        }
    };

    useEffect(() => {
        const fetchOpportunities = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/opportunity/');
                if (response.ok) {
                    const data = await response.json();
                    // Filter opportunities with status 'approved'
                    const approvedOpportunities = data.opportunities.filter(
                        (opportunity) => opportunity.status === 'approved'
                    );
                    setOpportunities(approvedOpportunities);
                } else {
                    console.error('Failed to fetch opportunities:', response.statusText);
                }
            } catch (error) {
                console.error('Error during fetch:', error);
            }
        };

        fetchOpportunities();
    }, []);

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="available opportunities table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="left">Category</TableCell>
                        <TableCell align="left">Mentor</TableCell>
                        <TableCell align="left">Description</TableCell>
                        <TableCell align="left">Attend</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {opportunities.map((opportunity) => (
                        <TableRow
                            key={opportunity._id} // Use a unique identifier from your API response
                            sx={{ '&:last-child td': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {opportunity.title}
                            </TableCell>
                            <TableCell align="left">{opportunity.category}</TableCell>
                            <TableCell align="left">{opportunity.mentor.name}</TableCell>
                            <TableCell align="left">{opportunity.description}</TableCell>
                            <TableCell align="left">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    onClick={() => handleAttendClick(opportunity._id)}
                                >
                                    Attend
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
