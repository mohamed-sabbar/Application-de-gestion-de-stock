import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import './Layout.css';

function Layout({ nomUtilisateur ,children }) {
    const [showReceptionSubmenu, setShowReceptionSubmenu] = useState(false);

    const toggleReceptionSubmenu = () => {
        setShowReceptionSubmenu(!showReceptionSubmenu);
    };

    return (
        <div className="layout">
            <nav className="sidebar">
<<<<<<< HEAD
                <h2 className="logo">StockPro</h2>
                <ul>
                    <li><Link to="/entrepots">🏢 Entrepôts</Link></li>
                    <li><Link to="/receptions">📦 Réceptions</Link></li>
                    <li><Link to="/livraisons">🚚 Sorties</Link></li>
                    <li><Link to="/Transfers">🔁 Transferts</Link></li>
                    <li><Link to="/logout">🔓 Deconnexion </Link></li>

=======
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
>>>>>>> 3adfa3c (my last commit)
                </ul>
                <div className="user-info">👤 Bonjour, {nomUtilisateur}</div>
            </nav>
            <main className="main-content">
                {children}
            </main>


        </div>
    );
}

export default Layout;