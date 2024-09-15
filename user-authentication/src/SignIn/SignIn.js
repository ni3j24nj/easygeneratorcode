import React, { useState } from 'react';
import axios from 'axios';
import './Signin.css'; // Import your CSS file for styling

function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
 
    const handleSubmit = async (e) => {
        e.preventDefault();
 
        try {
            const response = await axios.post('http://localhost:3000/auth/signin', { email, password });
            alert('Sign-in successful!');
            window.location.href = '/'; // Redirect to welcome page
        } catch (error) {
            alert('Error during signin: ' + error.message);
        }
    };
 
    return (
<div className="signin-container">
<form className="signin-form" onSubmit={handleSubmit}>
<input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
<input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
<button type="submit">Sign In</button>
</form>
<p>Don't have an account? <a href="signUp.html">Sign Up</a></p>
</div>
    );
}
 
export default SignIn;