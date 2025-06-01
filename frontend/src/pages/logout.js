// src/pages/Logout.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
    const navigate = useNavigate();

    useEffect(() => {
        // Suppression des données de session
        localStorage.removeItem('token');
        localStorage.removeItem('nomUtilisateur');

        // Redirection vers la page de connexion
        navigate('/login');
    }, [navigate]);

    return (
        <div>
            <p>Déconnexion en cours...</p>
        </div>
    );
}

export default Logout;
