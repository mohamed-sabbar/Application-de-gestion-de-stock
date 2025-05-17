import React from "react";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
//<<<<<<< HEAD
//import Home from "./pages/HomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import InventoryManage from "./pages/InventoryManage";

//=======
import Home from "./pages/HomePage";
import HomePage from "./pages/HomePage"; // ✅ Import de la page d'accueil
import LivraisonsList from './pages/LivraisonsList';
import NouvelleLivraison from "./pages/NouvelleLivraison";
import EntreeGestion from "./pages/EntreeGestion";
import AutreSortie from "./pages/AutreSortie";
import ModifierLivraison from "./pages/ModifierLivraison";
//>>>>>>> bea233d08c952d45c0a257d2bcd37ed21f04e241


function App() {
    return (
//<<<<<<< HEAD
      
      
//=======
        <Router>
            <Routes>
            <Route path="/" element={<WelcomePage/>} />

                {/* ✅ Nouvelle route Home */}
                <Route path="/home" element={<HomePage />} />
                <Route path="/Entrepots" element={<InventoryManage/>} />


                {/* Routes Authentification */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/receptions" element={<EntreeGestion/>} />
                <Route path="/livraisons" element={<LivraisonsList />} /> {/* ✅ nouvelle route */}
                <Route path="/nouvelle-livraison" element={<NouvelleLivraison />}/>
                <Route path="/autre-sortie" element={<AutreSortie />} />
                <Route path="/modifier-livraison/:id" element={<ModifierLivraison />} />

            </Routes>
        </Router>
//>>>>>>> bea233d08c952d45c0a257d2bcd37ed21f04e241
    );
}

export default App;
