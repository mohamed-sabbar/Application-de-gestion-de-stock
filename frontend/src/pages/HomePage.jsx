import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Dashboard from './Dashborad'; // Vérifie bien l'orthographe du fichier ! (Dashborad -> Dashboard ?)
import './HomePage.css';

function HomePage() {
    const [nomUtilisateur, setNomUtilisateur] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate('/login');
                return;
            }

            try {
                const validationResponse = await fetch('http://localhost:8080/api/auth/validate', {
                    method: 'GET',
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (!validationResponse.ok) throw new Error("Token invalide");

                const userResponse = await fetch('http://localhost:8080/api/auth/user-info', {
                    method: 'GET',
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (!userResponse.ok) throw new Error("Erreur utilisateur");

                const userData = await userResponse.json();
                localStorage.setItem("nomUtilisateur", userData.nom || "Admin");
                setNomUtilisateur(userData.nom || "Admin");

                // Bloquer le bouton retour
                window.history.pushState(null, null, window.location.href);
                window.onpopstate = () => {
                    window.history.pushState(null, null, window.location.href);
                };

            } catch (error) {
                localStorage.removeItem("token");
                navigate('/login');
            }
        };

        fetchData();

        return () => {
            window.onpopstate = null;
        };
    }, [navigate]);

    return (
        <div className="homepage-container">
            <Dashboard />
        </div>
    );
}

export default HomePage;
