import React from "react";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
<<<<<<< HEAD
//import Home from "./pages/HomePage";
import WelcomePage from "./pages/WelcomePage";
import InventoryManage from "./pages/InventoryManage";
import { Routes,Route } from "react-router-dom";
=======
import Home from "./pages/HomePage";
import HomePage from "./pages/HomePage"; // ✅ Import de la page d'accueil
import LivraisonsList from './pages/LivraisonsList';
import NouvelleLivraison from "./pages/NouvelleLivraison";
import AutreSortie from "./pages/AutreSortie";
>>>>>>> bea233d08c952d45c0a257d2bcd37ed21f04e241


function App() {
    return (
<<<<<<< HEAD
      <Routes>
      <Route path="/" element={<WelcomePage/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/home" element={<InventoryManage/>} />
      </Routes>
      
=======
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
>>>>>>> bea233d08c952d45c0a257d2bcd37ed21f04e241
    );
}

export default App;
