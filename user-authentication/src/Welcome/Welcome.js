import React from 'react';
import './Welcome.css'; // Import your CSS file for styling

function Welcome() {
    return (
        <div className="welcome-container">
        <h1 className="welcome-message">Welcome to the application!</h1>
        <nav>
        
            <div className="button-container">
                <a className="welcome-button" href="/signUp.html">Sign Up</a>
                <a  className="welcome-button" href="/signIn.html">Sign In</a>
            </div>
        </nav>
        </div>
    );
}
 
export default Welcome;