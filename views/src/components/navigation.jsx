

import React from 'react';
import { Link } from 'react-router-dom';
import './components.css'
import { useAuth } from '../AuthContext'; // Import your AuthContext

const Navbar = () => {
    const { user, isLoggedIn } = useAuth();

    return (
        <div className="navbar-container">
            <div className="logo">
                <Link to="/">MENTORUP</Link>
            </div>
            <div className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/about-us">About</Link>
                <Link to="/opportunities">Opportunities</Link>

                {isLoggedIn && user ? (
                    <>
                        {user.role === 'student' ? (
                            <Link to="/studentdash">Student Dashboard</Link>
                        ) : user.role === 'admin' ? (
                            <Link to="/admindash">Admin Dashboard</Link>
                        ) : (
                            <Link to="/dashboard">Dashboard</Link>
                        )}
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default Navbar;
