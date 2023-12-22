// import React, { useState } from 'react';
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
// import Select from '@mui/material/Select';
// import MenuItem from '@mui/material/MenuItem';
// import InputLabel from '@mui/material/InputLabel';
// import FormControl from '@mui/material/FormControl';
// import {Link} from "react-router-dom";
//
// const RequestOpportunityForm = () => {
//     const [formData, setFormData] = useState({
//         title: '',
//         description: '',
//         category: '',
//         mentor: '',
//         comments: '',
//
//     });
//
//     const handleInputChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value,
//         });
//     };
//
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         // Implement logic to submit the form data (formData) to the server
//         console.log(formData);
//         // Reset the form fields
//         setFormData({
//             title: '',
//             description: '',
//             category: '',
//             mentor: '',
//             comments: '',
//         });
//     };
//
//     return (
//         <>
//             <div className='two-column'>
//                 <div className='first-sect'>
//                     <img
//                         src='https://epe.brightspotcdn.com/dims4/default/cb9c6c7/2147483647/strip/true/crop/7062x4792+53+0/resize/840x570!/quality/90/?url=https%3A%2F%2Fepe-brightspot.s3.amazonaws.com%2F47%2Fb8%2F2023b1104c70b2761dcc7856912a%2Fgood-mentor-nurture-11222022-1332554256-01.jpg'
//                         alt='Photo Missing'
//                         className='img-side'
//                     />
//                 </div>
//                 <div className='sec-sect'>
//
//                         <h2>Request For Coaching/Mentoring Opportunity</h2>
//                         <form onSubmit={handleSubmit}>
//                             <TextField
//                                 label="Title"
//                                 variant="outlined"
//                                 fullWidth
//                                 name="title"
//                                 value={formData.title}
//                                 onChange={handleInputChange}
//                                 required
//                                 className='input'
//                             />
//
//                             <TextField
//                                 label="Description"
//                                 variant="outlined"
//                                 fullWidth
//                                 multiline
//                                 rows={4}
//                                 name="description"
//                                 value={formData.description}
//                                 onChange={handleInputChange}
//                                 required
//                                 className='input'
//                             />
//
//                             <FormControl fullWidth variant="outlined" required>
//                                 <InputLabel>Category</InputLabel>
//                                 <Select
//                                     label="Category"
//                                     name="category"
//                                     value={formData.category}
//                                     onChange={handleInputChange}
//                                     className='input'
//                                 >
//                                     <MenuItem value="Career Advice">Career Advice</MenuItem>
//                                     <MenuItem value="Resume Review">Resume Review</MenuItem>
//                                     <MenuItem value="Mock Interview">Mock Interview</MenuItem>
//                                 </Select>
//                             </FormControl>
//
//                             {/* Assuming you have a list of mentors */}
//                             <TextField
//                                 label="Mentor"
//                                 variant="outlined"
//                                 fullWidth
//                                 name="mentor"
//                                 value={formData.mentor}
//                                 onChange={handleInputChange}
//                                 required
//                                 className='input'
//                             />
//
//                             <TextField
//                                 label="Comments"
//                                 variant="outlined"
//                                 fullWidth
//                                 multiline
//                                 rows={4}
//                                 name="comments"
//                                 value={formData.comments}
//                                 onChange={handleInputChange}
//                                 className='input'
//                             />
//
//                             <Button type="submit" variant="contained" color="primary">
//                                 Submit Request
//                             </Button>
//                         </form>
//                     </div>
//                 </div>
//
//         </>
//
//     );
// };
//
// export default RequestOpportunityForm;


import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { useAuth } from '../AuthContext.jsx';

const RequestOpportunityForm = () => {
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        mentor: '',
        comments: '',
    });

    const [mentors, setMentors] = useState([]);

    useEffect(() => {
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

        fetchMentors();
    }, []); // Trigger the effect once on mount

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Include the requestor ID in the form data
        const requestData = {
            ...formData,
            requestor: user._id,
        };
        console.log(requestData);

        try {
            // Make a request to create a new opportunity
            const response = await fetch('http://localhost:3001/api/opportunity/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });


            if (response.ok) {

                alert('Succesfully sent request')
                // Reset the form fields
                setFormData({
                    title: '',
                    description: '',
                    category: '',
                    mentor: '',
                    comments: '',
                });

            } else {
                console.error('Failed to create opportunity:', response.statusText);
            }
        } catch (error) {
            console.error('Error during form submission:', error);
        }
    };

    return (
        <>
            <div className='two-column'>
                <div className='first-sect'>
                    <img
                        src='https://epe.brightspotcdn.com/dims4/default/cb9c6c7/2147483647/strip/true/crop/7062x4792+53+0/resize/840x570!/quality/90/?url=https%3A%2F%2Fepe-brightspot.s3.amazonaws.com%2F47%2Fb8%2F2023b1104c70b2761dcc7856912a%2Fgood-mentor-nurture-11222022-1332554256-01.jpg'
                        alt='Photo Missing'
                        className='img-side'
                    />
                </div>
                <div className='sec-sect'>
                    <h2>Request For Coaching/Mentoring Opportunity</h2>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Title"
                            variant="outlined"
                            fullWidth
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            required
                            className='input'
                        />

                        <TextField
                            label="Description"
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={4}
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            required
                            className='input'
                        />

                        <FormControl fullWidth variant="outlined" required className='input'>
                            <InputLabel>Category</InputLabel>
                            <Select
                                label="Category"
                                name="category"
                                value={formData.category}
                                onChange={handleInputChange}
                            >
                                <MenuItem value="Career Advice">Career Advice</MenuItem>
                                <MenuItem value="Resume Review">Resume Review</MenuItem>
                                <MenuItem value="Mock Interview">Mock Interview</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl fullWidth variant="outlined" required className='input'>
                            <InputLabel>Mentor</InputLabel>
                            <Select
                                label="Mentor"
                                name="mentor"
                                value={formData.mentor}
                                onChange={handleInputChange}
                            >
                                {mentors.map((mentor) => (
                                    <MenuItem key={mentor._id} value={mentor._id}>
                                        {mentor.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <TextField
                            label="Comments"
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={4}
                            name="comments"
                            value={formData.comments}
                            onChange={handleInputChange}
                            className='input'
                        />

                        <Button type="submit" variant="contained" color="primary">
                            Submit Request
                        </Button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default RequestOpportunityForm;
