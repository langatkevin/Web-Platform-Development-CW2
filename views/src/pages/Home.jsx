import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/navigation.jsx';
import { useAuth } from '../AuthContext.jsx';

export default function Home() {
    const navigate = useNavigate();
    const { user, isLoggedIn} = useAuth();  // Use user instead of userData
    console.log(user)

    const handleGetStarted = () => {
        // Redirect to the sign-up page
        navigate('/register');
    };

    return (
        <div className='home'>
            <div className='nav'>
                <Navbar />
            </div>

            <div className='body-t'>
                <h1 className='body-text'>
                    Connect With <br />Mentors For<br /> Career Development
                </h1>

                <div className='small-text'>
                    {isLoggedIn && user ? (
                        `Welcome, ${user.username}! Empowering students to achieve their goalsss`
                    ) : (
                        `Empowering students to achieve their goals`
                    )}
                </div>

                <button className='add-btn' onClick={handleGetStarted}>
                    Get Started
                </button>
            </div>
        </div>
    );
}
