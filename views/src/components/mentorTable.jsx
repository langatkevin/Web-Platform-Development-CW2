

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
import AddMentorForm from "./addMentorForm.jsx";


const MentorsTable = () => {
    const [mentors, setMentors] = useState([]);
    const [modifiedMentor, setModifiedMentor] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);

    useEffect(() => {
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

        fetchMentors();
    }, [mentors]); // The empty dependency array ensures that the effect runs only once on mount

    const handleModifyClick = (mentorId) => {
        const mentor = mentors.find((ment) => ment._id === mentorId);
        setModifiedMentor(mentor);
    };

    const handleSaveClick = async () => {
        try {
            const response = await fetch(`http://localhost:3001/api/mentor/update/${modifiedMentor._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(modifiedMentor),
            });

            if (response.ok) {
                console.log('Mentor updated successfully');
                setModifiedMentor(null);
                fetchMentors();
            } else {
                console.error('Failed to update mentor:', response.statusText);
            }
        } catch (error) {
            console.error('Error during mentor update:', error);
        }
    };

    const handleDeleteClick = async (mentorId) => {
        try {
            const response = await fetch(`http://localhost:3001/api/mentor/delete/${mentorId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                console.log('Mentor deleted successfully');
                fetchMentors();
            } else {
                console.error('Failed to delete mentor:', response.statusText);
            }
        } catch (error) {
            console.error('Error during mentor deletion:', error);
        }
    };

    const handleInputChange = (e) => {
        setModifiedMentor({
            ...modifiedMentor,
            [e.target.name]: e.target.value,
        });
    };

    const handleAddMentor = async (newMentor) => {

        try {
            const response = await fetch('http://localhost:3001/api/mentor/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newMentor),
            });

            if (response.ok) {
                console.log('Mentor added successfully');
                fetchMentors();
                setShowAddForm(false);
            } else {
                console.error('Failed to add mentor:', response.statusText);
            }
        } catch (error) {
            console.error('Error during mentor addition:', error);
        }
    };

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="mentors table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="left">Expertise</TableCell>
                            <TableCell align="left">Email</TableCell>
                            <TableCell align="left">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {mentors.map((mentor) => (
                            <TableRow
                                key={mentor._id}
                                sx={{ '&:last-child td': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {modifiedMentor && modifiedMentor._id === mentor._id ? (
                                        <TextField
                                            name="name"
                                            value={modifiedMentor.name}
                                            onChange={handleInputChange}
                                        />
                                    ) : (
                                        mentor.name
                                    )}
                                </TableCell>
                                <TableCell align="left">
                                    {modifiedMentor && modifiedMentor._id === mentor._id ? (
                                        <TextField
                                            name="expertise"
                                            value={modifiedMentor.expertise}
                                            onChange={handleInputChange}
                                        />
                                    ) : (
                                        mentor.expertise
                                    )}
                                </TableCell>
                                <TableCell align="left">
                                    {modifiedMentor && modifiedMentor._id === mentor._id ? (
                                        <TextField
                                            name="email"
                                            value={modifiedMentor.email}
                                            onChange={handleInputChange}
                                        />
                                    ) : (
                                        mentor.email
                                    )}
                                </TableCell>
                                <TableCell align="left">
                                    {modifiedMentor && modifiedMentor._id === mentor._id ? (
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
                                                onClick={() => handleModifyClick(mentor._id)}
                                            >
                                                Modify
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                size="small"
                                                onClick={() => handleDeleteClick(mentor._id)}
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
            {showAddForm ? (
                <AddMentorForm onAddMentor={handleAddMentor} />
            ) : (
                <button className='add-btn' onClick={() => setShowAddForm(true)}>Add Mentor</button>
            )}
        </>
    );
};

export default MentorsTable;



