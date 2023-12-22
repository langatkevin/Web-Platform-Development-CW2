


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
import AddStudentForm from "./addSudentForm.jsx";


export default function StudentsTable() {
    const [students, setStudents] = useState([]);
    const [modifiedStudent, setModifiedStudent] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);

    useEffect(() => {
        // Fetch students from the API endpoint
        const fetchStudents = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/user');
                if (response.ok) {
                    const data = await response.json();
                    setStudents(data.users);
                } else {
                    console.error('Failed to fetch students:', response.statusText);
                }
            } catch (error) {
                console.error('Error during fetch:', error);
            }
        };

        fetchStudents();
    }, [students]);

    const handleModifyClick = (userId) => {
        // Find the student to be modified
        const student = students.find((stu) => stu._id === userId);
        // Set the modified student in the state
        setModifiedStudent(student);
    };

    const handleSaveClick = async () => {
        console.log('Saving updates');
        // Implement logic to save the updates
        try {
            const response = await fetch(`http://localhost:3001/api/user/${modifiedStudent._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(modifiedStudent),
            });

            if (response.ok) {
                console.log('User updated successfully');
                // Refresh the students after update
                setModifiedStudent(null);
                fetchStudents();
            } else {
                console.error('Failed to update user:', response.statusText);
            }
        } catch (error) {
            console.error('Error during user update:', error);
        }
    };

    const handleDeleteClick = async (userId) => {
        console.log(`Deleting user with ID: ${userId}`);
        // Implement logic to delete the student
        try {
            const response = await fetch(`http://localhost:3001/api/user/${userId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                console.log('User deleted successfully');
                // Refresh the students after deletion
                fetchStudents();
            } else {
                console.error('Failed to delete user:', response.statusText);
            }
        } catch (error) {
            console.error('Error during user deletion:', error);
        }
    };

    const handleInputChange = (e) => {
        // Update the modified student state when input fields change
        setModifiedStudent({
            ...modifiedStudent,
            [e.target.name]: e.target.value,
        });
    };

    const handleAddStudent = async (newStudent) => {
        // Implement logic to add the new student
        try {
            const response = await fetch('http://localhost:3001/api/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newStudent),
            });

            if (response.ok) {
                console.log('User added successfully');
                // Refresh the students after addition
                fetchStudents();
                // Hide the add form
                setShowAddForm(false);
            } else {
                console.error('Failed to add user:', response.statusText);
            }
        } catch (error) {
            console.error('Error during user addition:', error);
        }
    };

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="students table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Username</TableCell>
                            <TableCell align="left">Email</TableCell>
                            <TableCell align="left">Role</TableCell>
                            <TableCell align="left">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {students.map((student) => (
                            <TableRow
                                key={student._id}
                                sx={{ '&:last-child td': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {modifiedStudent && modifiedStudent._id === student._id ? (
                                        <TextField
                                            name="username"
                                            value={modifiedStudent.username}
                                            onChange={handleInputChange}
                                        />
                                    ) : (
                                        student.username
                                    )}
                                </TableCell>
                                <TableCell align="left">
                                    {modifiedStudent && modifiedStudent._id === student._id ? (
                                        <TextField
                                            name="email"
                                            value={modifiedStudent.email}
                                            onChange={handleInputChange}
                                        />
                                    ) : (
                                        student.email
                                    )}
                                </TableCell>
                                <TableCell align="left">
                                    {modifiedStudent && modifiedStudent._id === student._id ? (
                                        <TextField
                                            name="role"
                                            value={modifiedStudent.role}
                                            onChange={handleInputChange}
                                        />
                                    ) : (
                                        student.role
                                    )}
                                </TableCell>
                                <TableCell align="left">
                                    {modifiedStudent && modifiedStudent._id === student._id ? (
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
                                                onClick={() => handleModifyClick(student._id)}
                                            >
                                                Modify
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                size="small"
                                                onClick={() => handleDeleteClick(student._id)}
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
                <AddStudentForm onAddStudent={handleAddStudent} />
            ) : (
                <button className='add-btn' onClick={() => setShowAddForm(true)}>Add Student</button>
            )}
        </>
    );
}

