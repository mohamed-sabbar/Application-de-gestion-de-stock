import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import CreateEntrepot from "./pages/CreateEntrepot";
import EntrepotList from "./pages/EntrepotList";
import EditEntrepot from "./pages/EditEntrepot";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/HomePage";
import HomePage from "./pages/HomePage"; // ✅ Import de la page d'accueil
import LivraisonsList from './pages/LivraisonsList';
import NouvelleLivraison from "./pages/NouvelleLivraison";
import AutreSortie from "./pages/AutreSortie";


function App() {
    return (
        <Router>
            <Routes>
                {/* Redirection automatique de / vers /home */}

                {/* ✅ Nouvelle route Home */}
                <Route path="/home" element={<HomePage />} />


                {/* Routes Authentification */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/create-entrepot" element={<CreateEntrepot />} />
                <Route path="/livraisons" element={<LivraisonsList />} /> {/* ✅ nouvelle route */}
                <Route path="/nouvelle-livraison" element={<NouvelleLivraison />}/>
                <Route path="/autre-sortie" element={<AutreSortie />} />
            </Routes>
        </Router>
    );
}

export default App;
