import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";






function App() {
    return (
        <Router>
            <Routes>
                {/* Redirection automatique de / vers /home */}
                <Route path="/" element={<Navigate to="/HomePage" />} />

                {/* ✅ Nouvelle route Home */}


                {/* Routes Authentification */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
            </Routes>
        </Router>
    );
}

export default App;
