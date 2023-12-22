import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const AddMentorForm = ({ onAddMentor }) => {
    const [newMentor, setNewMentor] = useState({
        name: '',
        expertise: '',
        email: '',
    });

    const handleInputChange = (e) => {
        setNewMentor({
            ...newMentor,
            [e.target.name]: e.target.value,
        });
    };

    const handleAddClick = () => {
        // Validate input fields before adding the mentor
        if (newMentor.name && newMentor.expertise && newMentor.email) {
            onAddMentor(newMentor);
            // Reset the form after adding the mentor
            setNewMentor({
                name: '',
                expertise: '',
                email: '',
            });
        } else {
            alert('Please fill in all the required fields.');
        }
    };

    return (
        <div>
            <h2>Add Mentor</h2>
            <TextField
                name="name"
                label="Name"
                value={newMentor.name}
                onChange={handleInputChange}
            />
            <TextField
                name="expertise"
                label="Expertise"
                value={newMentor.expertise}
                onChange={handleInputChange}
            />
            <TextField
                name="email"
                label="Email"
                value={newMentor.email}
                onChange={handleInputChange}
            />
            <Button
                variant="contained"
                color="primary"
                onClick={handleAddClick}
            >
                Add Mentor
            </Button>
        </div>
    );
};

export default AddMentorForm;
