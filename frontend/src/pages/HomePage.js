import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
    return (
        <div className="home-container">
            <h1>Bienvenue !</h1>
            <p>Veuillez vous connecter ou créer un compte pour continuer</p>
            <div className="home-buttons">
                <Link to="/login" className="btn">Se connecter</Link>
                <Link to="/signup" className="btn">S'inscrire</Link>
            </div>
        </div>
    );
}

export default HomePage;
