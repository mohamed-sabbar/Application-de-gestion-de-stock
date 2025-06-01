import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout'; // Assure-toi du bon chemin
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
                setNomUtilisateur(userData.nom ? userData.nom : "Admin");

            } catch (error) {
                localStorage.removeItem("token");
                navigate('/login');
            }
        };

        fetchData();
    }, [navigate]);

    return (
        <Layout nomUtilisateur={nomUtilisateur}>
            <div className="dashboard">
                <div className="glass-panel">
                    <h1>Bienvenue sur votre tableau de bord</h1>
                    <p className="instruction-text">Sélectionnez une opération à gauche pour commencer.</p>

                    {/* Ajoutez ce bloc pour matcher la maquette */}
                    <div className="task-list">
                        <div className="task-item">☐ Entrepôts</div>
                        <div className="task-item checked">✓ Réceptions</div>
                        <div className="task-item checked">✓ Sorties</div>
                        <div className="task-item">☐ Commandes Achat</div>
                        <div className="task-item">☐ Commandes Client</div>
                        <div className="task-item">☐ logout</div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default HomePage;
