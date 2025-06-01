// src/components/Layout.js
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './Layout.css';

function Layout({ nomUtilisateur }) {
    return (
        <div className="layout">
            <nav className="sidebar">
                <h2 className="logo">StockPro</h2>
                <ul>
                    <li><Link to="/entrepots">🏢 Entrepôts</Link></li>
                    <li><Link to="/receptions">📦 Réceptions</Link></li>
                    <li><Link to="/livraisons">🚚 Sorties</Link></li>
                    <li><Link to="/logout">🔓 Deconnexion </Link></li>

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
