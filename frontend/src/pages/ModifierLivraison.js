import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function ModifierLivraison() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [livraison, setLivraison] = useState({
        date: '',
        quantite: '',
        remarque: '',
        entrepotId: '',
        produitId: ''
    });

    const [entrepots, setEntrepots] = useState([]);
    const [produits, setProduits] = useState([]);

    useEffect(() => {
        const token2 = localStorage.getItem("token");
        if (!token2) {
            navigate('/login');
            return;
        }

        const token = localStorage.getItem("token");
        if (!token) return navigate('/login');

        const fetchData = async () => {
            try {
                const [livRes, entRes, prodRes] = await Promise.all([
                    axios.get(`http://localhost:8080/api/livraisons/${id}`, {
                        headers: { Authorization: `Bearer ${token}` }
                    }),
                    axios.get("http://localhost:8080/api/admin/DisplayAllEntrepots", {
                        headers: { Authorization: `Bearer ${token}` }
                    }),
                    axios.get("http://localhost:8080/api/produits", {
                        headers: { Authorization: `Bearer ${token}` }
                    })
                ]);

                setLivraison(livRes.data);
                setEntrepots(entRes.data);
                setProduits(prodRes.data);
            } catch (err) {
                alert("Erreur de chargement des données");
            }
        };

        fetchData();
    }, [id, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        try {
            await axios.put(`http://localhost:8080/api/livraisons/${id}`, livraison, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });
            alert("Livraison modifiée avec succès !");
            navigate("/livraisons");
        } catch (err) {
            alert(`Erreur : ${err.response?.data?.message || err.message}`);
        }
    };

    return (
        <div className="modification-container">
            <h2>Modifier la livraison</h2>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Date :</label>
                    <input
                        type="date"
                        value={livraison.date}
                        onChange={e => setLivraison({...livraison, date: e.target.value})}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Quantité :</label>
                    <input
                        type="number"
                        value={livraison.quantite}
                        onChange={e => setLivraison({...livraison, quantite: e.target.value})}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Entrepôt :</label>
                    <select
                        value={livraison.entrepotId}
                        onChange={e => setLivraison({...livraison, entrepotId: e.target.value})}
                    >
                        {entrepots.map(ent => (
                            <option key={ent.id} value={ent.id}>{ent.nom}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label>Produit :</label>
                    <select
                        value={livraison.produitId}
                        onChange={e => setLivraison({...livraison, produitId: e.target.value})}
                    >
                        {produits.map(prod => (
                            <option key={prod.id} value={prod.id}>{prod.nom}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label>Remarques :</label>
                    <textarea
                        value={livraison.remarque}
                        onChange={e => setLivraison({...livraison, remarque: e.target.value})}
                    />
                </div>

                <button type="submit" className="submit-btn">Enregistrer</button>
                <button type="button" onClick={() => navigate('/livraisons')} className="cancel-btn">
                    Annuler
                </button>
            </form>
        </div>
    );
}

export default ModifierLivraison;