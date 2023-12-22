import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const AddStudentForm = ({ onAddStudent }) => {
    const [newStudent, setNewStudent] = useState({
        username: '',
        email: '',
        role: 'student',
        password: 'abc', // Default password
    });

    const handleInputChange = (e) => {
        setNewStudent({
            ...newStudent,
            [e.target.name]: e.target.value,
        });
    };

    const handleAddClick = () => {
        // Validate input fields before adding the student
        if (newStudent.username && newStudent.email) {
            onAddStudent(newStudent);
            // Reset the form after adding the student
            setNewStudent({
                username: '',
                email: '',
                role: 'student',
                password: 'abc', // Reset to default password
            });
        } else {
            alert('Please fill in the required fields (Username and Email).');
        }
    };

    return (
        <div>
            <h2>Add Student</h2>
            <TextField
                name="username"
                label="Username"
                value={newStudent.username}
                onChange={handleInputChange}
            />
            <TextField
                name="email"
                label="Email"
                value={newStudent.email}
                onChange={handleInputChange}
            />
            <Button
                variant="contained"
                color="primary"
                onClick={handleAddClick}
            >
                Add Student
            </Button>
        </div>
    );
};

export default AddStudentForm;
