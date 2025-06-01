import React, { useEffect, useState } from 'react';
import './TransfertManage.css';
import axios from 'axios';

function TransfertManage() {
    const token = localStorage.getItem("token");
    const [transferts, setTransferts] = useState([]);
    const [entrepots, setEntrepots] = useState([]);
    const [produits, setProduits] = useState([]);
    const [form, setForm] = useState({
        date: new Date().toISOString().split('T')[0],
        quantite: '',
        remarque: '',
        source: '',
        destination: '',
        produit: ''
    });

    // États pour la recherche
    const [searchForm, setSearchForm] = useState({
        dateDebut: new Date().toISOString().split('T')[0],
        dateFin: new Date().toISOString().split('T')[0],
        entrepotId: '' // Changé de 'entrepot' à 'entrepotId'
    });

    const [showModal, setShowModal] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const axiosConfig = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    // Charger les données initiales
    useEffect(() => {
        fetchTransferts();
        fetchEntrepots();
        fetchProduits();
    }, []);

    const fetchTransferts = async () => {
        try {
            const res = await axios.get("http://localhost:8080/api/transferts", axiosConfig);
            setTransferts(res.data);
        } catch (error) {
            console.error("Erreur lors du téléchargement des transferts", error);
        }
    };

    const fetchTransfertsWithFilters = async (filters = {}) => {
        try {
            const params = {
                dateDebut: filters.dateDebut,
                dateFin: filters.dateFin,
                entrepotId: filters.entrepotId
            };

            const res = await axios.get("http://localhost:8080/api/transferts/search", {
                ...axiosConfig,
                params
            });
            setTransferts(res.data);
        } catch (error) {
            console.error("Erreur lors de la recherche des transferts", error);
        }
    };

    const fetchEntrepots = async () => {
        try {
            const res = await axios.get("http://localhost:8080/api/admin/DisplayAllEntrepots", axiosConfig);
            setEntrepots(res.data);
        } catch (error) {
            console.error("Erreur lors du téléchargement des entrepôts", error);
        }
    };

    const fetchProduits = async () => {
        try {
            const res = await axios.get("http://localhost:8080/api/produits", axiosConfig);
            setProduits(res.data);
        } catch (error) {
            console.error("Erreur lors du téléchargement des produits", error);
        }
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSearchChange = (e) => {
        setSearchForm({ ...searchForm, [e.target.name]: e.target.value });
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();

        // Vérifier si au moins un filtre est actif
        const hasFilters = searchForm.dateDebut || searchForm.dateFin || searchForm.entrepotId;

        if (hasFilters) {
            fetchTransfertsWithFilters(searchForm);
        } else {
            fetchTransferts();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const transfertData = {
            date: form.date,
            quantite: parseInt(form.quantite),
            remarque: form.remarque,
            source: { id: parseInt(form.source) },
            destination: { id: parseInt(form.destination) },
            produit: { id: parseInt(form.produit) }
        };

        try {
            await axios.post("http://localhost:8080/api/transferts", transfertData, axiosConfig);
            fetchTransferts();
            resetForm();
        } catch (error) {
            console.error("Erreur lors de la création du transfert", error);
        }
    };

    const handleUpdate = (transfert) => {
        setForm({
            date: new Date(transfert.date).toISOString().split('T')[0],
            quantite: transfert.quantite,
            remarque: transfert.remarque || '',
            source: transfert.source.id,
            destination: transfert.destination.id,
            produit: transfert.produit.id
        });
        setSelectedId(transfert.id);
        setShowModal(true);
    };

    const handleModalSubmit = async (e) => {
        e.preventDefault();

        const transfertData = {
            date: form.date,
            quantite: parseInt(form.quantite),
            remarque: form.remarque,
            source: { id: parseInt(form.source) },
            destination: { id: parseInt(form.destination) },
            produit: { id: parseInt(form.produit) }
        };

        try {
            await axios.put(`http://localhost:8080/api/transferts/${selectedId}`, transfertData, axiosConfig);
            fetchTransferts();
            resetForm();
            setShowModal(false);
        } catch (error) {
            console.error("Erreur lors de la mise à jour du transfert", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/transferts/${id}`, axiosConfig);
            fetchTransferts();
        } catch (error) {
            console.error("Erreur lors de la suppression du transfert", error);
        }
    };

    const resetForm = () => {
        setForm({
            date: new Date().toISOString().split('T')[0],
            quantite: '',
            remarque: '',
            source: '',
            destination: '',
            produit: ''
        });
        setSelectedId(null);
    };

    const resetSearch = () => {
        setSearchForm({
            dateDebut: new Date().toISOString().split('T')[0],
            dateFin: new Date().toISOString().split('T')[0],
            entrepotId: ''
        });
        fetchTransferts();
    };

    return (
        <div className="container">
            <h1>Recherche de transferts</h1>
            <div className="search-container">
                <form onSubmit={handleSearchSubmit}>
                    <div className="search-row">
                        <div className="search-group">
                            <label>Date inventaire</label>
                            <div className="date-range">
                                <div className="date-group">
                                    <span>De:</span>
                                    <input
                                        type="date"
                                        name="dateDebut"
                                        value={searchForm.dateDebut}
                                        onChange={handleSearchChange}
                                    />
                                </div>
                                <div className="date-group">
                                    <span>À:</span>
                                    <input
                                        type="date"
                                        name="dateFin"
                                        value={searchForm.dateFin}
                                        onChange={handleSearchChange}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="search-group">
                            <label>Entrepôt</label>
                            <select
                                name="entrepotId" // Changé de 'entrepot' à 'entrepotId'
                                value={searchForm.entrepotId}
                                onChange={handleSearchChange}
                            >
                                <option value="">Tous les entrepôts</option>
                                {entrepots.map(entrepot => (
                                    <option key={entrepot.id} value={entrepot.id}>
                                        {entrepot.nom}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="search-buttons">
                        <button type="submit" className="btn-search">
                            Chercher
                        </button>
                        <button
                            type="button"
                            className="btn-reset"
                            onClick={resetSearch}
                        >
                            Réinitialiser
                        </button>
                    </div>
                </form>
            </div>

            <h1>Liste des transferts</h1>
            <div className="table-container">
                <table>
                    <thead>
                    <tr>
                        <th>Date</th>
                        <th>Produit</th>
                        <th>Unité</th>
                        <th>Quantité</th>
                        <th>Entrepôt Source</th>
                        <th>Entrepôt Destination</th>
                        <th>Remarque</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {transferts.map(transfert => (
                        <tr key={transfert.id}>
                            <td>{new Date(transfert.date).toLocaleDateString()}</td>
                            <td>{transfert.produit?.nom}</td>
                            <td>{transfert.produit?.unite}</td>
                            <td>{transfert.quantite}</td>
                            <td>{transfert.source?.nom}</td>
                            <td>{transfert.destination?.nom}</td>
                            <td>{transfert.remarque || 'Néant'}</td>
                            <td>
                                <button onClick={() => handleUpdate(transfert)}>Modifier</button>
                                <button className="delete-btn" onClick={() => handleDelete(transfert.id)}>Supprimer</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <h1>Ajouter un transfert</h1>
            <div className='form-container'>
                <form onSubmit={handleSubmit}>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Date:</label>
                            <input
                                type="date"
                                name="date"
                                value={form.date}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Produit:</label>
                            <select
                                name="produit"
                                value={form.produit}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Sélectionner un produit</option>
                                {produits.map(produit => (
                                    <option key={produit.id} value={produit.id}>
                                        {produit.nom} ({produit.unite})
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Quantité:</label>
                            <input
                                type="number"
                                name="quantite"
                                value={form.quantite}
                                onChange={handleChange}
                                min="1"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Entrepôt Source:</label>
                            <select
                                name="source"
                                value={form.source}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Sélectionner un entrepôt</option>
                                {entrepots.map(entrepot => (
                                    <option key={entrepot.id} value={entrepot.id}>
                                        {entrepot.nom}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Entrepôt Destination:</label>
                            <select
                                name="destination"
                                value={form.destination}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Sélectionner un entrepôt</option>
                                {entrepots.map(entrepot => (
                                    <option key={entrepot.id} value={entrepot.id}>
                                        {entrepot.nom}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group full-width">
                            <label>Remarque:</label>
                            <textarea
                                name="remarque"
                                value={form.remarque}
                                onChange={handleChange}
                                rows="3"
                            />
                        </div>
                    </div>

                    <div className="button-group">
                        <button type="submit" className="btn-ajouter">Ajouter</button>
                        <button type="button" className="btn-annuler" onClick={resetForm}>Annuler</button>
                    </div>
                </form>
            </div>

            {showModal && (
                <div className="modal-backdrop">
                    <div className="modal">
                        <h2>Modifier le transfert</h2>
                        <form className="modal-form" onSubmit={handleModalSubmit}>
                            <div className="form-group">
                                <label htmlFor="date">Date :</label>
                                <input
                                    type="date"
                                    id="date"
                                    name="date"
                                    value={form.date}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="produit">Produit :</label>
                                <select
                                    id="produit"
                                    name="produit"
                                    value={form.produit}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Sélectionner un produit</option>
                                    {produits.map(produit => (
                                        <option key={produit.id} value={produit.id}>
                                            {produit.nom} ({produit.unite})
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="quantite">Quantité :</label>
                                <input
                                    type="number"
                                    id="quantite"
                                    name="quantite"
                                    value={form.quantite}
                                    onChange={handleChange}
                                    min="1"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="source">Entrepôt Source :</label>
                                <select
                                    id="source"
                                    name="source"
                                    value={form.source}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Sélectionner un entrepôt</option>
                                    {entrepots.map(entrepot => (
                                        <option key={entrepot.id} value={entrepot.id}>
                                            {entrepot.nom}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="destination">Entrepôt Destination :</label>
                                <select
                                    id="destination"
                                    name="destination"
                                    value={form.destination}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Sélectionner un entrepôt</option>
                                    {entrepots.map(entrepot => (
                                        <option key={entrepot.id} value={entrepot.id}>
                                            {entrepot.nom}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="remarque">Remarque :</label>
                                <textarea
                                    id="remarque"
                                    name="remarque"
                                    value={form.remarque}
                                    onChange={handleChange}
                                    rows="3"
                                />
                            </div>

                            <div className="modal-buttons">
                                <button type="submit" className="btn-ajouter">Enregistrer</button>
                                <button type="button" className="btn-annuler" onClick={() => {
                                    setShowModal(false);
                                    resetForm();
                                }}>Annuler</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default TransfertManage;