import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './NouvelleLivraison.css';
import { useNavigate } from 'react-router-dom';

function NouvelleLivraison() {

    const [searchReference, setSearchReference] = useState('');
    const [searchProduit, setSearchProduit] = useState('');

    const [commandes, setCommandes] = useState([]);
    const [commandeReference, setCommandeReference] = useState('');
    const [commande, setCommande] = useState(null);
    const [dateLivraison, setDateLivraison] = useState('');
    const [entrepots, setEntrepots] = useState([]);
    const [selectedEntrepot, setSelectedEntrepot] = useState('');
    const [remarque, setRemarque] = useState('');
    const navigate = useNavigate();
    const [newCommande, setNewCommande] = useState({
        date: '',
        client: '',
        produitId: '',
        quantite: '',
        reference: '',
        livree: false // Nouveau champ
    });
    const [newProduit, setNewProduit] = useState({
        nom: '',
        unite: ''
    });
    const [showProduitForm, setShowProduitForm] = useState(false);
    const [produits, setProduits] = useState([]);

    const getProduitNom = (produitId) => {
        const produit = produits.find(p => p.id === produitId);
        return produit ? produit.nom : 'Non spécifié';
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return navigate('/login');

        const fetchData = async () => {
            try {
                const [cmdRes, entRes, prodRes] = await Promise.all([
                    axios.get("http://localhost:8080/api/commandes-clients", {
                        headers: { Authorization: `Bearer ${token}` }
                    }),
                    axios.get("http://localhost:8080/api/entrepots", {
                        headers: { Authorization: `Bearer ${token}` }
                    }),
                    axios.get("http://localhost:8080/api/produits", {
                        headers: { Authorization: `Bearer ${token}` }
                    })
                ]);

                setCommandes(cmdRes.data);
                setEntrepots(entRes.data);
                setProduits(prodRes.data);

            } catch (err) {
                console.error("Erreur de chargement des données", err);
                alert("Erreur de chargement des données");
            }
        };

        fetchData();
    }, [navigate]);
    const handleSearchCommandes = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.get("http://localhost:8080/api/commandes-clients/search", {
                headers: { Authorization: `Bearer ${token}` },
                params: {
                    reference: searchReference,
                    produitId: searchProduit
                }
            });
            setCommandes(response.data);
        } catch (err) {
            alert("Erreur lors de la recherche");
        }
    };

    const handleSearch = () => {
        const found = commandes.find(c => c.reference === commandeReference);
        if (found) {
            if (found.livree) {
                alert("Cette commande a déjà été livrée !");
                setCommande(null);
            } else {
                setCommande(found);
            }
        } else {
            alert("Commande non trouvée");
        }
    };

    const handleLivraison = async () => {
        const token = localStorage.getItem("token");
        if (!commande || !dateLivraison || !selectedEntrepot) {
            return alert("Veuillez remplir tous les champs obligatoires !");
        }

        try {
            // Création de la livraison
            const payload = {
                date: dateLivraison,
                quantite: commande.quantite,
                commandeClient: { id: commande.id },
                produit: { id: commande.produit.id },
                entrepot: { id: selectedEntrepot },
                remarque
            };

            await axios.post("http://localhost:8080/api/livraisons", payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            // Mise à jour du statut de la commande
            const updatedCommande = { ...commande, livree: true };
            await axios.put(
                `http://localhost:8080/api/commandes-clients/${commande.id}`,
                updatedCommande,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            // Mise à jour de l'état local
            setCommandes(prev =>
                prev.map(c => c.id === commande.id ? updatedCommande : c)
            );

            alert("Livraison enregistrée !");
            navigate("/livraisons");
        } catch (err) {
            alert(`Erreur : ${err.response?.data?.message || err.message}`);
        }
    };

    const handleCreateCommande = async () => {
        const token = localStorage.getItem("token");
        const produitId = Number(newCommande.produitId);

        if (!newCommande.date || !newCommande.client || !produitId || !newCommande.quantite || !newCommande.reference) {
            return alert("Veuillez remplir tous les champs obligatoires !");
        }

        try {
            const payload = {
                ...newCommande,
                quantite: Number(newCommande.quantite),
                produit: { id: produitId },
                livree: false // Initialisation du statut
            };

            const response = await axios.post(
                "http://localhost:8080/api/commandes-clients",
                payload,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setCommandes(prev => [...prev, response.data]);
            setNewCommande({
                date: '',
                client: '',
                produitId: '',
                quantite: '',
                reference: '',
                livree: false
            });
            alert("Commande créée avec succès !");
        } catch (err) {
            alert(`Erreur : ${err.response?.data?.message || "Échec de la création"}`);
        }
    };


    const handleCreateProduit = async () => {
        const token = localStorage.getItem("token");
        if (!newProduit.nom || !newProduit.unite) {
            return alert("Veuillez remplir tous les champs du produit !");
        }

        try {
            const response = await axios.post(
                "http://localhost:8080/api/produits",
                newProduit,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setProduits(prev => [...prev, response.data]);
            setNewProduit({ nom: '', unite: '' });
            setShowProduitForm(false);
            setNewCommande(prev => ({ ...prev, produitId: response.data.id }));
            alert("Produit créé avec succès !");
        } catch (err) {
            alert(`Erreur : ${err.response?.data?.message || "Échec de la création"}`);
        }
    };

    return (
        <div className="nouvelle-livraison-container">
            <div className="livraison-nav">
                <div className="nav-links">
                    <button
                        className="nav-link active"
                        onClick={() => navigate('/nouvelle-livraison')}
                    >
                        Livraisons des commandes
                    </button>
                    <button
                        className="nav-link"
                        onClick={() => navigate('/autre-sortie')}
                    >
                        Autre sortie
                    </button>
                </div>

            </div>

            <div className="search-section">
                <div className="search-group">
                    <input
                        type="text"
                        placeholder="Rechercher par référence"
                        value={searchReference}
                        onChange={(e) => setSearchReference(e.target.value)}
                    />
                    <select
                        value={searchProduit}
                        onChange={(e) => setSearchProduit(e.target.value)}
                    >
                        <option value="">Tous les produits</option>
                        {produits.map(p => (
                            <option key={p.id} value={p.id}>{p.nom}</option>
                        ))}
                    </select>
                    <button onClick={handleSearchCommandes}>Rechercher</button>
                </div>
            </div>

            {/* Liste des commandes */}
            <table className="commande-table">
                <thead>
                <tr>
                    <th>Date commande</th>
                    <th>N° commande</th>
                    <th>Produit</th>
                    <th>Unité</th>
                    <th>Quantité</th>
                    <th>Client</th>
                    <th>Statut</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {commandes.map((cmd, i) => (
                    <tr key={i}>
                        <td>{cmd.date}</td>
                        <td>{cmd.reference}</td>
                        <td>{getProduitNom(cmd.produit?.id)}</td>
                        <td>{produits.find(p => p.id === cmd.produit?.id)?.unite || '—'}</td>
                        <td>{cmd.quantite}</td>
                        <td>{cmd.client}</td>
                        <td>{cmd.livree ? 'Livrée' : 'En attente'}</td>
                        <td>
                            <button
                                onClick={() => setCommande(cmd)}
                                disabled={cmd.livree}
                                className={cmd.livree ? 'disabled-button' : ''}
                            >
                                {cmd.livree ? "Déjà livrée" : "Livrer"}
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* Formulaire de livraison */}
            {commande && (
                <div className="form-livraison">
                    <h3>Détails de la livraison</h3>
                    <div className="form-grid">
                        <div>
                            <label>Date de livraison :</label>
                            <input
                                type="date"
                                value={dateLivraison}
                                onChange={(e) => setDateLivraison(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label>Entrepôt :</label>
                            <select
                                value={selectedEntrepot}
                                onChange={(e) => setSelectedEntrepot(e.target.value)}
                            >
                                <option value="">Sélectionner un entrepôt</option>
                                {entrepots?.map?.(ent => ( // Protection contre undefined
                                    <option key={ent.id} value={ent.id}>{ent.nom}</option>
                                ))}
                            </select>
                        </div>
                        <div className="full-width">
                            <label>Remarques :</label>
                            <textarea
                                value={remarque}
                                onChange={(e) => setRemarque(e.target.value)}
                                placeholder="Notes supplémentaires..."
                            />
                        </div>
                        <button onClick={handleLivraison} className="submit-btn">
                            Confirmer la livraison
                        </button>
                    </div>
                </div>
            )}

            {/* Formulaire de création de commande */}
            <div className="form-commande">
                <h3>Nouvelle commande client</h3>
                <div className="form-grid">
                    <div>
                        <label>Date commande :</label>
                        <input
                            type="date"
                            value={newCommande.date}
                            onChange={(e) => setNewCommande(prev => ({ ...prev, date: e.target.value }))}
                            required
                        />
                    </div>
                    <div>
                        <label>Client :</label>
                        <input
                            type="text"
                            value={newCommande.client}
                            onChange={(e) => setNewCommande(prev => ({ ...prev, client: e.target.value }))}
                            required
                        />
                    </div>
                    <div>
                        <label>Référence :</label>
                        <input
                            type="text"
                            value={newCommande.reference}
                            onChange={(e) => setNewCommande(prev => ({ ...prev, reference: e.target.value }))}
                            required
                        />
                    </div>
                    <div>
                        <label>Produit :</label>
                        <div className="produit-selection">
                            <select
                                value={newCommande.produitId}
                                onChange={(e) => setNewCommande(prev => ({ ...prev, produitId: e.target.value }))}
                                required
                            >
                                <option value="">Sélectionner un produit</option>
                                {produits.map(produit => (
                                    <option key={produit.id} value={produit.id}>
                                        {produit.nom} ({produit.unite})
                                    </option>
                                ))}
                            </select>
                            <button
                                type="button"
                                onClick={() => setShowProduitForm(true)}
                                className="add-btn"
                            >
                                +
                            </button>
                        </div>
                    </div>
                    <div>
                        <label>Quantité :</label>
                        <input
                            type="number"
                            min="1"
                            value={newCommande.quantite}
                            onChange={(e) => setNewCommande(prev => ({ ...prev, quantite: e.target.value }))}
                            required
                        />
                    </div>
                    <button
                        onClick={handleCreateCommande}
                        disabled={!newCommande.date || !newCommande.client || !newCommande.produitId}
                        className="submit-btn"
                    >
                        Créer la commande
                    </button>
                </div>
            </div>

            {/* Formulaire de création de produit */}
            {showProduitForm && (
                <div className="form-produit overlay">
                    <div className="form-content">
                        <h3>Nouveau produit</h3>
                        <div className="form-grid">
                            <div>
                                <label>Nom du produit :</label>
                                <input
                                    type="text"
                                    value={newProduit.nom}
                                    onChange={(e) => setNewProduit(prev => ({ ...prev, nom: e.target.value }))}
                                    required
                                />
                            </div>
                            <div>
                                <label>Unité :</label>
                                <input
                                    type="text"
                                    value={newProduit.unite}
                                    onChange={(e) => setNewProduit(prev => ({ ...prev, unite: e.target.value }))}
                                    required
                                />
                            </div>
                            <div className="button-group">
                                <button onClick={handleCreateProduit} className="submit-btn">
                                    Enregistrer
                                </button>
                                <button
                                    onClick={() => setShowProduitForm(false)}
                                    className="cancel-btn"
                                >
                                    Annuler
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default NouvelleLivraison;