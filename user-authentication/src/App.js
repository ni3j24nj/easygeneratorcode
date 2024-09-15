import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './SignUp/SignUp';
import SignIn from './SignIn/SignIn';
import Welcome from './Welcome/Welcome';
 
function App() {
    return (
<Router>
    <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/" element={< Welcome />} />
    </Routes>
</Router>
    );
}
 
export default App;
