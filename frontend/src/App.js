import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import WelcomePage from "./pages/WelcomePage";
import HomePage from "./pages/HomePage";
import InventoryManage from "./pages/InventoryManage";
import LivraisonsList from './pages/LivraisonsList';
import NouvelleLivraison from "./pages/NouvelleLivraison";
import EntreeGestion from "./pages/EntreeGestion";
import AutreSortie from "./pages/AutreSortie";
import ModifierLivraison from "./pages/ModifierLivraison";
import TransfertManafe from "./pages/TransfertManafe";
import Logout from "./pages/logout";
import Layout from "./pages/Layout"; // ✅ Import Layout

function App() {
    const nomUtilisateur = localStorage.getItem("nomUtilisateur")

    return (
        <Router>
            <Routes>
                {/* Public pages (sans Layout) */}
                <Route path="/" element={<WelcomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                {/* Pages principales avec Layout */}
                <Route path="/" element={<Layout nomUtilisateur={nomUtilisateur} />}>
                    <Route path="home" element={<HomePage />} />
                    <Route path="entrepots" element={<InventoryManage />} />
                    <Route path="receptions" element={<EntreeGestion />} />
                    <Route path="livraisons" element={<LivraisonsList />} />
                    <Route path="nouvelle-livraison" element={<NouvelleLivraison />} />
                    <Route path="autre-sortie" element={<AutreSortie />} />
                    <Route path="modifier-livraison/:id" element={<ModifierLivraison />} />
                    <Route path="transfers" element={<TransfertManafe />} />
                    <Route path="logout" element={<Logout />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
