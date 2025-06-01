import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import './Layout.css';

function Layout({ nomUtilisateur }) {
    const [showReceptionSubmenu, setShowReceptionSubmenu] = useState(false);
    const [showInventaireSubmenu, setShowInventaireSubmenu] = useState(false);

    const toggleReceptionSubmenu = () => {
        setShowReceptionSubmenu(!showReceptionSubmenu);
    };

    const toggleInventaireSubmenu = () => {
        setShowInventaireSubmenu(!showInventaireSubmenu);
    };

    return (
        <div className="layout">
            <nav className="sidebar">
                <h2 className="logo">
                    <Link to="/" className="logo-link">StockPro</Link>
                </h2>
                <ul className="nav-menu">
                    <li className="nav-item"><Link to="/entrepots">🏢 Entrepôts</Link></li>

                    <li className="nav-item">
                        <div className="nav-link" onClick={toggleReceptionSubmenu}>
                            📦 Réceptions
                        </div>
                        {showReceptionSubmenu && (
                            <ul className="submenu">
                                <li className="submenu-item"><Link to="/receptions/gestion">🔧 Gestion</Link></li>
                                <li className="submenu-item"><Link to="/receptions/ajouter">➕ Ajouter</Link></li>
                                <li className="submenu-item"><Link to="/receptions/supprimer">🗑️ Supprimer</Link></li>
                            </ul>
                        )}
                    </li>

                    <li className="nav-item"><Link to="/livraisons">🚚 Sorties</Link></li>
                    <li className="nav-item"><Link to="/commandes-achat">🛒 Commandes Achat</Link></li>
                    <li className="nav-item"><Link to="/commandes-client">📬 Commandes Client</Link></li>

                    <li className="nav-item">
                        <div className="nav-link" onClick={toggleInventaireSubmenu}>
                            📊 Inventaires
                        </div>
                        {showInventaireSubmenu && (
                            <ul className="submenu">
                                <li className="submenu-item"><Link to="/inventaires/liste">📋 Afficher les inventaires</Link></li>
                                <li className="submenu-item"><Link to="/inventaires/ajouter">➕ Ajouter un inventaire</Link></li>
                            </ul>
                        )}
                    </li>

                    <li className="nav-item"><Link to="/logout">🔓 Déconnexion</Link></li>
                </ul>
                <div className="user-info">👤 Bonjour, {nomUtilisateur}</div>
            </nav>

            <main className="main-content">
                <Outlet />
            </main>
        </div>
    );
}

export default Layout;
