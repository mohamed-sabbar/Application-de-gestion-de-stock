import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import CreateEntrepot from "./pages/CreateEntrepot";
import EntrepotList from "./pages/EntrepotList";
import EditEntrepot from "./pages/EditEntrepot";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/HomePage";
import HomePage from "./pages/HomePage"; // ✅ Import de la page d'accueil




function App() {
    return (
        <Router>
            <Routes>
                {/* Redirection automatique de / vers /home */}
                <Route path="/" element={<Navigate to="/HomePage" />} />

                {/* ✅ Nouvelle route Home */}
                <Route path="/HomePage" element={<Home />} />

                {/* Routes Entrepôt */}
                <Route path="/entrepots" element={<EntrepotList />} />
                <Route path="/create-entrepot" element={<CreateEntrepot />} />
                <Route path="/edit-entrepot/:id" element={<EditEntrepot />} />

                {/* Routes Authentification */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
            </Routes>
        </Router>
    );
}

export default App;
