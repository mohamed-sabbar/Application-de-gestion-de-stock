import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './IdependenteReception.css';

function IdependenteReception() {
  const token = localStorage.getItem("token");

  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  };

  const [entrepots, setEntrepots] = useState([]);
  const [produits, setProduits] = useState([]);

  // Champs du formulaire
  const [entrepotNom, setEntrepotNom] = useState('');
  const [produitNom, setProduitNom] = useState('');
  const [quantite, setQuantite] = useState('');
  const [dateReception, setDateReception] = useState('');
  const [fournisseur, setFournisseur] = useState('');

  // Récupérer la liste des entrepôts et produits (avec leurs noms)
  useEffect(() => {
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
        const res = await axios.get("http://localhost:8080/api/produits/getAllProduitsNames", axiosConfig);
        setProduits(res.data);
      } catch (error) {
        console.error("Erreur lors du téléchargement des produits", error);
      }
    };

    fetchEntrepots();
    fetchProduits();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!entrepotNom || !produitNom || !quantite || !dateReception || !fournisseur) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    // Construire les params au format x-www-form-urlencoded
    const params = new URLSearchParams();
    params.append('date', dateReception);
    params.append('quantite', quantite);
    params.append('produit', produitNom);       // nom du produit attendu par le backend
    params.append('entrepotname', entrepotNom); // nom de l'entrepôt attendu par le backend
    params.append('fornisseur', fournisseur);   // orthographe exacte côté backend

    try {
      await axios.post(
        "http://localhost:8080/api/admin/receptions/createRecepetionIndependante",
        params,
        axiosConfig
      );
      alert("Réception ajoutée avec succès !");
      // Reset formulaire
      setEntrepotNom('');
      setProduitNom('');
      setQuantite('');
      setDateReception('');
      setFournisseur('');
    } catch (error) {
      console.error("Erreur lors de l'ajout de la réception", error);
      alert("Erreur lors de l'ajout, veuillez réessayer.");
    }
  };

  return (
    <div className="entree-gestion-container">
      <h1>Ajouter une réception indépendante</h1>
      <form onSubmit={handleSubmit}>

        <label>
          Entrepôt :
          <select value={entrepotNom} onChange={e => setEntrepotNom(e.target.value)} required>
            <option value="">-- Sélectionnez un entrepôt --</option>
            {entrepots.map(entrepot => (
              <option key={entrepot.id} value={entrepot.nom}>
                {entrepot.nom}
              </option>
            ))}
          </select>
        </label>

        <label>
          Produit :
          <select value={produitNom} onChange={e => setProduitNom(e.target.value)} required>
            <option value="">-- Sélectionnez un produit --</option>
            {produits.map(produit => (
              <option key={produit.id} value={produit.nom}>
                {produit.nom}
              </option>
            ))}
          </select>
        </label>

        <label>
          Quantité :
          <input
            type="number"
            min="1"
            value={quantite}
            onChange={e => setQuantite(e.target.value)}
            required
          />
        </label>

        <label>
          Date de réception :
          <input
            type="date"
            value={dateReception}
            onChange={e => setDateReception(e.target.value)}
            required
          />
        </label>

        <label>
          Fournisseur :
          <input
            type="text"
            value={fournisseur}
            onChange={e => setFournisseur(e.target.value)}
            required
            placeholder="Nom du fournisseur"
          />
        </label>

        <button type="submit">Enregistrer</button>
      </form>
    </div>
  );
}

export default IdependenteReception;
