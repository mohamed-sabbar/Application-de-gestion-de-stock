import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';
import './HomePage.css';

function HomePage() {
    const [nomUtilisateur, setNomUtilisateur] = useState('Utilisateur');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate('/login');
                return;
            }

            try {
                // D'abord valider le token
                const validationResponse = await fetch('http://localhost:8080/api/auth/validate', {
                    method: 'GET',
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (!validationResponse.ok) throw new Error("Token invalide");

                // Ensuite récupérer le nom
                const userResponse = await fetch('http://localhost:8080/api/auth/user-info', {
                    method: 'GET',
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (!userResponse.ok) throw new Error("Erreur utilisateur");

                const userData = await userResponse.json();
                localStorage.setItem("nomUtilisateur",userData.nom ? userData.nom : "Admin")
                setNomUtilisateur(userData.nom ? userData.nom : "Admin");

                // Empêcher de revenir en arrière à la page de login
                window.history.pushState(null, null, window.location.href);
                window.onpopstate = function() {
                    window.history.pushState(null, null, window.location.href);
                };

            } catch (error) {
                localStorage.removeItem("token");
                navigate('/login');
            }
        };

        fetchData();

        // Nettoyage à la désactivation du composant
        return () => {
            window.onpopstate = null;
        };
    }, [navigate]);

    return ;
}

export default HomePage;