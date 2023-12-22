import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext.jsx';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const [error, setError] = useState(null);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Make a request to the login endpoint
            const response = await fetch('http://localhost:3001/api/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            // Check if the login was successful (status code 200)
            if (response.status === 200) {
                const data = await response.json();

                if (data.user) {
                    // Call the login function from the context to set the user details
                    login(data.user);

                    console.log('Login successful! User details:', data.user);

                    // Redirect to the home page using useNavigate
                    navigate('/');
                } else {
                    // Set an error state for better error handling
                    setError('User data is missing in the server response.');
                }
            } else {
                // Handle login failure here
                const data = await response.json();
                setError(data.error || 'Login failed');
            }
        } catch (error) {
            console.error('Error during login:', error);
            setError('An unexpected error occurred');
        }
    };

    return (
        <div className="two-column">
            <div className='first-sect'>
                <img
                    src='https://epe.brightspotcdn.com/dims4/default/cb9c6c7/2147483647/strip/true/crop/7062x4792+53+0/resize/840x570!/quality/90/?url=https%3A%2F%2Fepe-brightspot.s3.amazonaws.com%2F47%2Fb8%2F2023b1104c70b2761dcc7856912a%2Fgood-mentor-nurture-11222022-1332554256-01.jpg'
                    alt='Missing'
                    className='img-side'
                />
            </div>
            <div className="sec-sect">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Username"
                        variant="outlined"
                        fullWidth
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        required
                        margin="normal"
                    />

                    <TextField
                        label="Password"
                        variant="outlined"
                        fullWidth
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                        margin="normal"
                    />

                    {error && <p style={{ color: 'red' }}>{error}</p>}

                    <Button type="submit" variant="contained" color="primary">
                        Login
                    </Button>
                </form>

                <p>
                    Don't have an account? <Link to="/register">Sign up here</Link>.
                </p>
            </div>
        </div>
    );
};

export default Login;
