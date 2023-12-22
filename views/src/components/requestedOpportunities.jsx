//
// import React, { useState, useEffect } from 'react';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import Button from '@mui/material/Button';
// import { useAuth } from '../AuthContext.jsx';
//
// export default function RequestedOpportunitiesTable() {
//     const { user } = useAuth();
//     const [requestedOpportunities, setRequestedOpportunities] = useState([]);
//
//     useEffect(() => {
//         // Fetch opportunities by requestorId from the API endpoint
//         const fetchOpportunities = async () => {
//             try {
//                 const response = await fetch(`http://localhost:3001/api/opportunity/requestor/${user._id}`);
//                 if (response.ok) {
//                     const data = await response.json();
//                     setRequestedOpportunities(data.opportunities);
//                 } else {
//                     console.error('Failed to fetch opportunities:', response.statusText);
//                 }
//             } catch (error) {
//                 console.error('Error during fetch:', error);
//             }
//         };
//
//         if (user) {
//             fetchOpportunities();
//         }
//     }, [user]); // Trigger the effect whenever the user changes
//
//     const handleModifyClick = (opportunityId) => {
//         console.log(`Modifying ${opportunityId}`);
//     };
//
//     const handleDeleteClick = (opportunityId) => {
//         console.log(`Deleting ${opportunityId}`);
//     };
//
//     return (
//         <TableContainer component={Paper}>
//             <Table sx={{ minWidth: 650 }} aria-label="requested opportunities table">
//                 <TableHead>
//                     <TableRow>
//                         <TableCell>Name</TableCell>
//                         <TableCell align="left">Description</TableCell>
//                         <TableCell align="left">Mentor</TableCell>
//                         <TableCell align="left">Category</TableCell>
//                         <TableCell align="left">Status</TableCell>
//                         <TableCell align="left">Modify</TableCell>
//                         <TableCell align="left">Delete</TableCell>
//                     </TableRow>
//                 </TableHead>
//                 <TableBody>
//                     {requestedOpportunities.map((opportunity) => (
//                         <TableRow
//                             key={opportunity._id}
//                             sx={{ '&:last-child td': { border: 0 } }}
//                         >
//                             <TableCell component="th" scope="row">
//                                 {opportunity.title}
//                             </TableCell>
//                             <TableCell align="left">{opportunity.description}</TableCell>
//                             <TableCell align="left">{opportunity.mentor.name}</TableCell>
//                             <TableCell align="left">{opportunity.category}</TableCell>
//                             <TableCell align="left">{opportunity.status}</TableCell>
//                             <TableCell align="left">
//                                 <Button
//                                     variant="contained"
//                                     color="primary"
//                                     size="small"
//                                     onClick={() => handleModifyClick(opportunity._id)}
//                                 >
//                                     Modify
//                                 </Button>
//                             </TableCell>
//                             <TableCell align="left">
//                                 <Button
//                                     variant="contained"
//                                     color="secondary"
//                                     size="small"
//                                     onClick={() => handleDeleteClick(opportunity._id)}
//                                 >
//                                     Delete
//                                 </Button>
//                             </TableCell>
//                         </TableRow>
//                     ))}
//                 </TableBody>
//             </Table>
//         </TableContainer>
//     );
// }
//

//
// import React, { useState, useEffect } from 'react';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import Button from '@mui/material/Button';
// import { useAuth } from '../AuthContext.jsx';
//
// const RequestedOpportunitiesTable = () => {
//     const { user } = useAuth();
//     const [requestedOpportunities, setRequestedOpportunities] = useState([]);
//
//     useEffect(() => {
//         // Fetch opportunities by requestorId from the API endpoint
//         const fetchOpportunities = async () => {
//             try {
//                 const response = await fetch(`http://localhost:3001/api/opportunity/requestor/${user._id}`);
//                 if (response.ok) {
//                     const data = await response.json();
//                     setRequestedOpportunities(data.opportunities);
//                 } else {
//                     console.error('Failed to fetch opportunities:', response.statusText);
//                 }
//             } catch (error) {
//                 console.error('Error during fetch:', error);
//             }
//         };
//
//         if (user) {
//             fetchOpportunities();
//         }
//     }, [user,requestedOpportunities]); // Trigger the effect whenever the user changes
//
//     const handleModifyClick = async (opportunityId) => {
//         console.log(`Modifying ${opportunityId}`);
//         // You can implement logic to open a form for modifying opportunity details
//         // For simplicity, let's just log the opportunity details for now
//         const opportunity = requestedOpportunities.find((opp) => opp._id === opportunityId);
//         console.log('Opportunity details:', opportunity);
//     };
//
//     const handleDeleteClick = async (opportunityId) => {
//         console.log(`Deleting ${opportunityId}`);
//         // Implement logic to delete the opportunity
//         try {
//             const response = await fetch(`http://localhost:3001/api/opportunity/delete/${opportunityId}`, {
//                 method: 'DELETE',
//             });
//
//             if (response.ok) {
//                 console.log('Opportunity deleted successfully');
//                 // Refresh the opportunities after deletion
//                 fetchOpportunities();
//             } else {
//                 console.error('Failed to delete opportunity:', response.statusText);
//             }
//         } catch (error) {
//             console.error('Error during opportunity deletion:', error);
//         }
//     };
//
//     return (
//         <TableContainer component={Paper}>
//             <Table sx={{ minWidth: 650 }} aria-label="requested opportunities table">
//                 <TableHead>
//                     <TableRow>
//                         <TableCell>Name</TableCell>
//                         <TableCell align="left">Description</TableCell>
//                         <TableCell align="left">Mentor</TableCell>
//                         <TableCell align="left">Category</TableCell>
//                         <TableCell align="left">Status</TableCell>
//                         <TableCell align="left">Modify</TableCell>
//                         <TableCell align="left">Delete</TableCell>
//                     </TableRow>
//                 </TableHead>
//                 <TableBody>
//                     {requestedOpportunities.map((opportunity) => (
//                         <TableRow
//                             key={opportunity._id}
//                             sx={{ '&:last-child td': { border: 0 } }}
//                         >
//                             <TableCell component="th" scope="row">
//                                 {opportunity.title}
//                             </TableCell>
//                             <TableCell align="left">{opportunity.description}</TableCell>
//                             <TableCell align="left">{opportunity.mentor.name}</TableCell>
//                             <TableCell align="left">{opportunity.category}</TableCell>
//                             <TableCell align="left">{opportunity.status}</TableCell>
//                             <TableCell align="left">
//                                 <Button
//                                     variant="contained"
//                                     color="primary"
//                                     size="small"
//                                     onClick={() => handleModifyClick(opportunity._id)}
//                                 >
//                                     Modify
//                                 </Button>
//                             </TableCell>
//                             <TableCell align="left">
//                                 <Button
//                                     variant="contained"
//                                     color="secondary"
//                                     size="small"
//                                     onClick={() => handleDeleteClick(opportunity._id)}
//                                 >
//                                     Delete
//                                 </Button>
//                             </TableCell>
//                         </TableRow>
//                     ))}
//                 </TableBody>
//             </Table>
//         </TableContainer>
//     );
// }
//
// export default RequestedOpportunitiesTable;


import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useAuth } from '../AuthContext.jsx';

const RequestedOpportunitiesTable = () => {
    const { user } = useAuth();
    const [requestedOpportunities, setRequestedOpportunities] = useState([]);
    const [modifiedOpportunity, setModifiedOpportunity] = useState(null);

    useEffect(() => {
        // Fetch opportunities by requestorId from the API endpoint
        const fetchOpportunities = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/opportunity/requestor/${user._id}`);
                if (response.ok) {
                    const data = await response.json();
                    setRequestedOpportunities(data.opportunities);
                } else {
                    console.error('Failed to fetch opportunities:', response.statusText);
                }
            } catch (error) {
                console.error('Error during fetch:', error);
            }
        };

        if (user) {
            fetchOpportunities();
        }
    }, [user, requestedOpportunities]); // Trigger the effect whenever the user changes

    const handleModifyClick = (opportunityId) => {
        console.log(`Modifying ${opportunityId}`);
        // Find the opportunity to be modified
        const opportunity = requestedOpportunities.find((opp) => opp._id === opportunityId);
        // Set the modified opportunity in the state
        setModifiedOpportunity(opportunity);
    };

    const handleSaveClick = async () => {
        console.log('Saving updates');
        // Implement logic to save the updates
        try {
            const response = await fetch(`http://localhost:3001/api/opportunity/update/${modifiedOpportunity._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(modifiedOpportunity),
            });

            if (response.ok) {
                console.log('Opportunity updated successfully');
                // Refresh the opportunities after update
                setModifiedOpportunity(null);
                fetchOpportunities();
            } else {
                console.error('Failed to update opportunity:', response.statusText);
            }
        } catch (error) {
            console.error('Error during opportunity update:', error);
        }
    };

    const handleDeleteClick = async (opportunityId) => {
        console.log(`Deleting ${opportunityId}`);
        // Implement logic to delete the opportunity
        try {
            const response = await fetch(`http://localhost:3001/api/opportunity/delete/${opportunityId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                console.log('Opportunity deleted successfully');
                // Refresh the opportunities after deletion
                fetchOpportunities();
            } else {
                console.error('Failed to delete opportunity:', response.statusText);
            }
        } catch (error) {
            console.error('Error during opportunity deletion:', error);
        }
    };

    const handleInputChange = (e) => {
        // Update the modified opportunity state when input fields change
        setModifiedOpportunity({
            ...modifiedOpportunity,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="requested opportunities table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="left">Description</TableCell>
                        <TableCell align="left">Mentor</TableCell>
                        <TableCell align="left">Category</TableCell>
                        <TableCell align="left">Status</TableCell>
                        <TableCell align="left">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {requestedOpportunities.map((opportunity) => (
                        <TableRow key={opportunity._id} sx={{ '&:last-child td': { border: 0 } }}>
                            <TableCell component="th" scope="row">
                                {modifiedOpportunity && modifiedOpportunity._id === opportunity._id ? (
                                    <TextField
                                        name="title"
                                        value={modifiedOpportunity.title}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    opportunity.title
                                )}
                            </TableCell>
                            <TableCell align="left">
                                {modifiedOpportunity && modifiedOpportunity._id === opportunity._id ? (
                                    <TextField
                                        name="description"
                                        value={modifiedOpportunity.description}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    opportunity.description
                                )}
                            </TableCell>
                            <TableCell align="left">{opportunity.mentor.name}</TableCell>
                            <TableCell align="left">
                                {modifiedOpportunity && modifiedOpportunity._id === opportunity._id ? (
                                    <TextField
                                        name="category"
                                        value={modifiedOpportunity.category}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    opportunity.category
                                )}
                            </TableCell>
                            <TableCell align="left">{opportunity.status}</TableCell>
                            <TableCell align="left">
                                {modifiedOpportunity && modifiedOpportunity._id === opportunity._id ? (
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="small"
                                        onClick={handleSaveClick}
                                    >
                                        Save
                                    </Button>
                                ) : (
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="small"
                                        onClick={() => handleModifyClick(opportunity._id)}
                                    >
                                        Modify
                                    </Button>
                                )}
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    size="small"
                                    onClick={() => handleDeleteClick(opportunity._id)}
                                >
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default RequestedOpportunitiesTable;
