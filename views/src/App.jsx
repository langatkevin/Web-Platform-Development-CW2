
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Register from "./pages/Register.jsx";
import LogIn from "./pages/LogIn.jsx";
import Opportunities from "./pages/Opportunities.jsx";
import Mentors from "./pages/Mentors.jsx";
import './App.css'
import Students from "./pages/Students.jsx";
import StudentDashboard from "./pages/StudentDashboard.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import AvailableOpportunities from "./pages/AvailableOpportunities.jsx";
import RequestOpportunityForm from "./components/requestOpportunityForm.jsx";
import { AuthProvider, useAuth } from "./AuthContext.jsx";

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/about-us" element={<About />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<LogIn />} />
                    <Route path="/mentors" element={<Mentors />} />
                    <Route path="/students" element={<Students />} />

                    <Route path="/studentdash" element={<StudentDashboard />} />
                    <Route path="/admindash" element={<AdminDashboard />} />
                    <Route path="/opportunities" element={<AvailableOpportunities />} />
                    <Route path="/adminops" element={<Opportunities />} />
                    <Route path="/request-opportunity" element={<RequestOpportunityForm />} />

                    {/* Default Route for 404 Not Found */}
                    <Route path="*" element={<div>404 Not Found</div>} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
