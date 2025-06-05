import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './TransfertManage.css';

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

    const [searchForm, setSearchForm] = useState({
        dateDebut: new Date().toISOString().split('T')[0],
        dateFin: new Date().toISOString().split('T')[0],
        entrepotId: ''
    });

    const [showModal, setShowModal] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const axiosConfig = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate('/login');
            return;
        }

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
            const res = await axios.get("http://localhost:8080/api/DisplayAllEntrepots", axiosConfig);
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
        <div className="transfert-manage-container">
            <div className="header-section">
                <h1>Recherche de transferts</h1>
                <div className="search-container">
                    <form onSubmit={handleSearchSubmit}>
                            
                            <div className="search-group-first">
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
                                    name="entrepotId"
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
            </div>

            <div className="table-section">
                <div className="table-header">
                    <h1>Liste des transferts</h1>
                    <div className="table-actions">
                        <span>Total: {transferts.length} transferts</span>
                    </div>
                </div>
                <div className="table-container">
                    <table>
                        <thead>
                        <tr>
                            <th>Date</th>
                            <th>Produit</th>
                            <th>Unité</th>
                            <th>Quantité</th>
                            <th>Source</th>
                            <th>Destination</th>
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
                                <td className="quantity-cell">{transfert.quantite}</td>
                                <td>{transfert.source?.nom}</td>
                                <td>{transfert.destination?.nom}</td>
                                <td>{transfert.remarque || 'Néant'}</td>
                                <td className="actions-cell">
                                    <button className="btn-edit" onClick={() => handleUpdate(transfert)}>
                                        <i className="fas fa-edit"></i>
                                    </button>
                                    <button className="btn-delete" onClick={() => handleDelete(transfert.id)}>
                                        <i className="fas fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="form-section">
                <h1>Ajouter un transfert</h1>
                <div className='form-container'>
                    <form onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className='date'>
                                <label>Date:</label>
                                <input
                                    type="date"
                                    name="date"
                                    value={form.date}
                                    onChange={handleChange}
                                    required
                                />
                                </div>
                            

                            
                                <label>Produit:</label>
                                <select
                                    name="produit"
                                    value={form.produit}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Sélectionner un produit</option>
                                    {produits.map((produit,index) => (
                                    <option key={produit.id} value={produit.id}>
  {produit.nom}
</option>
                                    ))}
                                </select>
                            

                            
                                <label>Quantité:</label>
                                <input
                                    type="number"
                                    name="quantite"
                                    value={form.quantite}
                                    onChange={handleChange}
                                    min="1"
                                    required
                                />
                            
                        

                        
                            
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
                            
                        

                        
                            
                              <br/><label>Remarque:</label> 
                                <textarea
                                    name="remarque"
                                    value={form.remarque}
                                    onChange={handleChange}
                                    rows="3"
                                    placeholder="Ajoutez une remarque si nécessaire..."
                                />
                            
                        

                        <div className="button-group">
                            <button type="submit" className="btn-submit">Ajouter</button>
                            <button type="button" className="btn-cancel" onClick={resetForm}>Annuler</button>
                        </div>
                        </div>
                    </form>
                </div>
            </div>

            {showModal && (
                <div className="modal-backdrop">
                    <div className="modal">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h2>Modifier le transfert</h2>
                                <button className="modal-close" onClick={() => setShowModal(false)}>
                                    <i className="fas fa-times"></i>
                                </button>
                            </div>
                            <form className="modal-form" onSubmit={handleModalSubmit}>
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
                                </div>

                                <div className="form-row">
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
                                </div>

                                <div className="form-row">
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

                                    <div className="form-group">
                                        <label>Remarque:</label>
                                        <textarea
                                            name="remarque"
                                            value={form.remarque}
                                            onChange={handleChange}
                                            rows="3"
                                        />
                                    </div>
                                </div>

                                <div className="modal-buttons">
                                    <button type="submit" className="btn-save">Enregistrer</button>
                                    <button type="button" className="btn-cancel" onClick={() => {
                                        setShowModal(false);
                                        resetForm();
                                    }}>Annuler
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default TransfertManage;