import React, { useState, useEffect }  from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AutreSortie.css';

function AutreSortie() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        date: '',
        produitId: '',
        quantite: '',
        entrepotId: '',
        remarque: ''
    });
    const [produits, setProduits] = useState([]);
    const [entrepots, setEntrepots] = useState([]);

    // Charger les produits et entrepôts
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return navigate('/login');

        const fetchData = async () => {
            try {
                const [prodRes, entRes] = await Promise.all([
                    axios.get("http://localhost:8080/api/produits", {
                        headers: { Authorization: `Bearer ${token}` }
                    }),
                    axios.get("http://localhost:8080/api/entrepots", {
                        headers: { Authorization: `Bearer ${token}` }
                    })
                ]);

                setProduits(prodRes.data);
                setEntrepots(entRes.data);
            } catch (err) {
                alert("Erreur de chargement des données");
            }
        };

        fetchData();
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        if (!token) {
            alert("Veuillez vous connecter !");
            return navigate('/login');
        }

        try {
            await axios.post("http://localhost:8080/api/livraisons", {
                date: formData.date,
                quantite: Number(formData.quantite),
                produit: { id: formData.produitId },
                entrepot: { id: formData.entrepotId },
                remarque: formData.remarque
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            alert("Livraison créée avec succès !");
            navigate("/livraisons");
        } catch (err) {
            alert(`Erreur : ${err.response?.data?.message || err.message}`);
            console.error("Détails de l'erreur :", err.response?.data);
        }
    };

    return (
        <div className="autre-sortie-container">
            <div className="livraison-nav">
                {/* ... (même navigation que NouvelleLivraison) */}
            </div>

            <h2>Autre sortie de stock</h2>

            <div className="form-livraison">
                <form onSubmit={handleSubmit}>
                    <div className="form-grid">
                        <div>
                            <label>Date :</label>
                            <input
                                type="date"
                                value={formData.date}
                                onChange={e => setFormData({ ...formData, date: e.target.value })}
                                required
                            />
                        </div>

                        <div>
                            <label>Produit :</label>
                            <select
                                value={formData.produitId}
                                onChange={e => setFormData({ ...formData, produitId: e.target.value })}
                                required
                            >
                                <option value="">Sélectionner un produit</option>
                                {produits.map(p => (
                                    <option key={p.id} value={p.id}>{p.nom}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label>Quantité :</label>
                            <input
                                type="number"
                                min="1"
                                value={formData.quantite}
                                onChange={e => setFormData({ ...formData, quantite: e.target.value })}
                                required
                            />
                        </div>

                        <div>
                            <label>Entrepôt :</label>
                            <select
                                value={formData.entrepotId}
                                onChange={e => setFormData({ ...formData, entrepotId: e.target.value })}
                                required
                            >
                                <option value="">Sélectionner un entrepôt</option>
                                {entrepots.map(e => (
                                    <option key={e.id} value={e.id}>{e.nom}</option>
                                ))}
                            </select>
                        </div>

                        <div className="full-width">
                            <label>Remarques :</label>
                            <textarea
                                value={formData.remarque}
                                onChange={e => setFormData({ ...formData, remarque: e.target.value })}
                            />
                        </div>

                        <button type="submit" className="submit-btn">
                            Enregistrer la sortie
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AutreSortie;