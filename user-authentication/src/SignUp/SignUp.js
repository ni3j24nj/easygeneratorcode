import React, { useState } from 'react';
import axios from 'axios';
import './Signup.css'; // Import your CSS file for styling

function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
 
    const handleSubmit = async (e) => {
        e.preventDefault();
 
        const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordPattern.test(password)) {
            alert('Password must be at least 8 characters long and contain at least one letter, one number, and one special character.');
            return;
        }
 
        try {
            await axios.post('http://localhost:3000/auth/signup', { name, email, password });
            alert('Signup successful! Redirecting to sign in...');
            window.location.href = '/signin'; // Redirect to Sign In
        } catch (error) {
            alert('Error during signup: ' + error.message);
        }
    };
 
    return (
        <div className="signup-container">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit} className="signup-form">
        <input 
                            type="text" 
                            placeholder="Name" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                            required 
                            className="signup-input" 
                        />
        <input 
                            type="email" 
                            placeholder="Email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                            className="signup-input" 
                        />
        <input 
                            type="password" 
                            placeholder="Password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                            className="signup-input" 
                        />
        <button type="submit" className="signup-button">Sign Up</button>
        </form>
        <p className="signup-footer">
                        Already have an account? <a href="/signin">Sign In</a>
        </p>
        </div>
    );
}
 
export default SignUp;