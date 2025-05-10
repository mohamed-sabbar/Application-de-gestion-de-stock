import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout'; // Assure-toi du bon chemin
import './HomePage.css';

function HomePage() {
    const [nomUtilisateur, setNomUtilisateur] = useState('Utilisateur');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) navigate('/login');
        else {
           
            setNomUtilisateur("GBC");
        }
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
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default HomePage;
