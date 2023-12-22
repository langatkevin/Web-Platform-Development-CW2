
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
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const OpportunitiesTable = () => {
    const [opportunities, setOpportunities] = useState([]);
    const [mentors, setMentors] = useState([]);
    const [modifiedOpportunity, setModifiedOpportunity] = useState(null);
    const [newOpportunity, setNewOpportunity] = useState({
        title: '',
        description: '',
        category: '',
        mentor: '',
        status: 'approved',
    });

    useEffect(() => {
        // Fetch opportunities from the API endpoint
        const fetchOpportunities = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/opportunity/');
                if (response.ok) {
                    const data = await response.json();
                    setOpportunities(data.opportunities);
                } else {
                    console.error('Failed to fetch opportunities:', response.statusText);
                }
            } catch (error) {
                console.error('Error during fetch:', error);
            }
        };

        // Fetch mentors from the API endpoint
        const fetchMentors = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/mentor');
                if (response.ok) {
                    const data = await response.json();
                    setMentors(data.mentors);
                } else {
                    console.error('Failed to fetch mentors:', response.statusText);
                }
            } catch (error) {
                console.error('Error during fetch:', error);
            }
        };

        fetchOpportunities();
        fetchMentors();
    }, [opportunities]); // The empty dependency array ensures that the effect runs only once on mount

    const handleModifyClick = (opportunityId) => {
        // Find the opportunity to be modified
        const opportunity = opportunities.find((opp) => opp._id === opportunityId);
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

    const handleStatusChange = (e) => {
        // Update the modified opportunity state when status changes
        setModifiedOpportunity({
            ...modifiedOpportunity,
            status: e.target.value,
        });
    };

    const handleNewOpportunityChange = (e) => {
        // Update the newOpportunity state when input fields change for creating a new opportunity
        setNewOpportunity({
            ...newOpportunity,
            [e.target.name]: e.target.value,
        });
    };

    const handleAddOpportunity = async () => {
        console.log('Adding new opportunity');
        // Implement logic to add a new opportunity
        try {
            const response = await fetch('http://localhost:3001/api/opportunity/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newOpportunity),
            });

            if (response.ok) {
                console.log('Opportunity added successfully');
                // Refresh the opportunities after addition
                setNewOpportunity({
                    title: '',
                    description: '',
                    category: '',
                    mentor: '',
                    status: 'approved',
                });
                fetchOpportunities();
            } else {
                console.error('Failed to add opportunity:', response.statusText);
            }
        } catch (error) {
            console.error('Error during opportunity addition:', error);
        }
    };

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="opportunities table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell align="left">Description</TableCell>
                            <TableCell align="left">Category</TableCell>
                            <TableCell align="left">Mentor</TableCell>
                            <TableCell align="left">Status</TableCell>
                            <TableCell align="left">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {opportunities.map((opportunity) => (
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
                                <TableCell align="left">
                                    {modifiedOpportunity && modifiedOpportunity._id === opportunity._id ? (
                                        <Select
                                            name="category"
                                            value={modifiedOpportunity.category}
                                            onChange={handleInputChange}
                                        >
                                            <MenuItem value="Career Advice">Career Advice</MenuItem>
                                            <MenuItem value="Resume Review">Resume Review</MenuItem>
                                            <MenuItem value="Mock Interview">Mock Interview</MenuItem>
                                        </Select>
                                    ) : (
                                        opportunity.category
                                    )}
                                </TableCell>
                                <TableCell align="left">
                                    {modifiedOpportunity && modifiedOpportunity._id === opportunity._id ? (
                                        <Select
                                            name="mentor"
                                            value={modifiedOpportunity.mentor}
                                            onChange={handleInputChange}
                                        >
                                            {mentors.map((mentor) => (
                                                <MenuItem key={mentor._id} value={mentor._id}>
                                                    {mentor.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    ) : (
                                        opportunity.mentor ? opportunity.mentor.name : <span style={{ color: 'gray' }}>No Mentor Assigned</span>
                                    )}
                                </TableCell>
                                <TableCell align="left">
                                    {modifiedOpportunity && modifiedOpportunity._id === opportunity._id ? (
                                        <TextField
                                            name="status"
                                            value={modifiedOpportunity.status}
                                            onChange={handleStatusChange}
                                        />
                                    ) : (
                                        opportunity.status
                                    )}
                                </TableCell>
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
                                        <>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                size="small"
                                                onClick={() => handleModifyClick(opportunity._id)}
                                            >
                                                Modify
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                size="small"
                                                onClick={() => handleDeleteClick(opportunity._id)}
                                            >
                                                Delete
                                            </Button>
                                        </>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
                <h2>Add Opportunity</h2>
            <div style={{ marginTop: '20px',marginBottom:'2%',display:'flex',flexDirection:'column',gap:'20px',background:'white',padding:'2%'}}>
                <TextField
                    label="Title"
                    name="title"
                    value={newOpportunity.title}
                    onChange={handleNewOpportunityChange}
                />
                <TextField
                    label="Description"
                    name="description"
                    value={newOpportunity.description}
                    onChange={handleNewOpportunityChange}
                />
                <Select
                    label="Category"
                    name="category"
                    value={newOpportunity.category}
                    onChange={handleNewOpportunityChange}
                >
                    <MenuItem value="Career Advice">Career Advice</MenuItem>
                    <MenuItem value="Resume Review">Resume Review</MenuItem>
                    <MenuItem value="Mock Interview">Mock Interview</MenuItem>
                </Select>
                <Select
                    label="Mentor"
                    name="mentor"
                    value={newOpportunity.mentor}
                    onChange={handleNewOpportunityChange}
                >
                    {mentors.map((mentor) => (
                        <MenuItem key={mentor._id} value={mentor._id}>
                            {mentor.name}
                        </MenuItem>
                    ))}
                </Select>
                <Button variant="contained" color="primary" onClick={handleAddOpportunity}>
                    Add Opportunity
                </Button>
            </div>
        </>
    );
};

export default OpportunitiesTable;
