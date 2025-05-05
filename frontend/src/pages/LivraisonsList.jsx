import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './LivraisonsList.css';
import { useNavigate } from "react-router-dom";

function LivraisonsList() {
    const [livraisons, setLivraisons] = useState([]);
    const [dateDebut, setDateDebut] = useState('');
    const [dateFin, setDateFin] = useState('');
    const [produit, setProduit] = useState('');
    const [entrepot, setEntrepot] = useState('');
    const navigate = useNavigate();
    const [originalLivraisons, setOriginalLivraisons] = useState([]); // Nouvel état pour stocker les données originales

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }

        const fetchLivraisons = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/livraisons", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                console.log(response.data)
                setLivraisons(response.data);
                setOriginalLivraisons(response.data); // Sauvegarder les données originales
            } catch (error) {
                console.error("Erreur lors du chargement des livraisons", error);
            }
        };

        fetchLivraisons();
    }, [navigate]);

    const handleFilter = () => {
        const filtres = originalLivraisons.filter(l => { // Filtrer sur les données originales
            const livraisonDate = new Date(l.date);
            const debut = dateDebut ? new Date(dateDebut) : null;
            const fin = dateFin ? new Date(dateFin + 'T23:59:59') : null; // Inclure toute la journée

            return (!debut || livraisonDate >= debut)
                && (!fin || livraisonDate <= fin)
                && (!produit || l.produit?.nom?.toLowerCase().includes(produit.toLowerCase()))
                && (!entrepot || l.entrepot?.nom?.toLowerCase().includes(entrepot.toLowerCase()));
        });

        setLivraisons(filtres);
    };

    return (
        <div className="livraison-container">
            <h2>Livraisons &gt; Liste des livraisons</h2>

            <div className="filters">
                <div className="filter-group">
                    <label>Période :</label>
                    <input type="date" value={dateDebut} onChange={e => setDateDebut(e.target.value)} />
                    <span>à</span>
                    <input type="date" value={dateFin} onChange={e => setDateFin(e.target.value)} />
                </div>
                <div className="filter-group">
                    <input
                        type="text"
                        placeholder="Rechercher par produit"
                        value={produit}
                        onChange={e => setProduit(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Rechercher par entrepôt"
                        value={entrepot}
                        onChange={e => setEntrepot(e.target.value)}
                    />
                </div>
                <div className="filter-actions">
                    <button onClick={handleFilter}>Filtrer</button>
                    <button onClick={() => setLivraisons(originalLivraisons)}>Réinitialiser</button>
                </div>
            </div>

            <table className="livraison-table">
                <thead>
                <tr>
                    <th>Date</th>
                    <th>N° Commande</th>
                    <th>Produit</th>
                    <th>Unité</th>
                    <th>Quantité</th>
                    <th>Client</th>
                    <th>Entrepôt</th>
                    <th>Remarques</th>
                    <th colSpan="2">Actions</th>
                </tr>
                </thead>
                <tbody>
                {livraisons.map((livraison, index) => (
                    <tr key={index}>
                        <td>{new Date(livraison.date).toLocaleDateString()}</td>
                        <td>{livraison.commandeClient?.reference || 'N/A'}</td>
                        <td>{livraison.produit?.nom || 'Produit inconnu'}</td>
                        <td>{livraison.produit?.unite || '—'}</td>
                        <td>{livraison.quantite}</td>
                        <td>{livraison.commandeClient?.client || 'Client non spécifié'}</td>
                        <td>{livraison.entrepot?.nom || 'Entrepôt inconnu'}</td>
                        <td>{livraison.remarque || 'Aucune remarque'}</td>
                        <td>
                            <button className="edit-btn">✏️</button>
                        </td>
                        <td>
                            <button className="delete-btn">🗑️</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {livraisons.length === 0 && (
                <div className="no-results">
                    Aucune livraison trouvée pour les critères sélectionnés
                </div>
            )}

            <div className="actions-footer">
                <button
                    className="new-delivery-btn"
                    onClick={() => navigate('/nouvelle-livraison')}
                >
                    + Nouvelle livraison
                </button>
            </div>
        </div>
    );
}

export default LivraisonsList;