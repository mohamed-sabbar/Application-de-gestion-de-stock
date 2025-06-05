import React, { useState, useEffect } from "react";
import axios from "axios";
import './NouvelledepEntree.css';
import { useNavigate } from "react-router-dom";
function NouvelledepEntree() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const axiosConfig = {
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
  };

  const [commandes, setCommandes] = useState([]);
  const [numAchatRecherche, setNumAchatRecherche] = useState("");
  const [produitRecherche, setProduitRecherche] = useState("");

  const [receptionEnCours, setReceptionEnCours] = useState(null);
  const [dateReception, setDateReception] = useState("");
  const [entrepotNom, setEntrepotNom] = useState("");

  const [entrepots, setEntrepots] = useState([]);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const fetchEntrepots = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:8080/api/DisplayAllEntrepots", axiosConfig);
      setEntrepots(res.data);
      if (res.data.length > 0) {
        setEntrepotNom(res.data[0].nom); // valeur par défaut
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setErrorMessage("Erreur lors du chargement des entrepôts");
      console.error(error);
    }
  };

  const fetchCommandes = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "http://localhost:8080/api/CommmandeAchats/DisplayCommandesAchat",
        axiosConfig
      );
      setCommandes(res.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setErrorMessage("Erreur lors du chargement des commandes");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCommandes();
    fetchEntrepots();
    
        const token = localStorage.getItem("token");
        if (!token) {
            navigate('/login');
            return;
        }

    
  }, []);

  const handleRecherche = async () => {
    setErrorMessage("");
    setSuccessMessage("");
    if (!numAchatRecherche && !produitRecherche) {
      setErrorMessage("Veuillez saisir au moins un critère de recherche");
      return;
    }
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (numAchatRecherche) params.append("num_achat", numAchatRecherche);
      if (produitRecherche) params.append("Nom_produit", produitRecherche);

      const res = await axios.post(
        "http://localhost:8080/api/CommmandeAchats/SearchCommandesAchat",
        params,
        axiosConfig
      );
      setCommandes(res.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setErrorMessage("Erreur lors de la recherche");
      console.error(error);
    }
  };

  const handleReceptionClick = (commande) => {
    setErrorMessage("");
    setSuccessMessage("");
    setReceptionEnCours(commande);
    setDateReception("");
    if (entrepots.length > 0) {
      setEntrepotNom(entrepots[0].nom);
    } else {
      setEntrepotNom("");
    }
  };

  const handleValiderReception = async () => {
    setErrorMessage("");
    setSuccessMessage("");

    if (!dateReception) {
      setErrorMessage("Veuillez renseigner la date de réception");
      return;
    }
    if (!entrepotNom) {
      setErrorMessage("Veuillez sélectionner un entrepôt");
      return;
    }
    if (!receptionEnCours) {
      setErrorMessage("Veuillez sélectionner une commande");
      return;
    }

    const receptionDto = {
      date: dateReception,
      remarque: receptionEnCours.remarque || "",
      entrepot: {
        nom: entrepotNom,
        code: null,
        adresse: null
      },
      commandeAchat: {
        date: receptionEnCours.date || null,
        num_achat: receptionEnCours.num_achat,
        fournisseur: receptionEnCours.fournisseur,
        quantite: receptionEnCours.quantite,
        produitDto: {
          nom: receptionEnCours.produitDto.nom,
          unite: receptionEnCours.produitDto.unite
        }
      }
    };

    try {
      setLoading(true);
      await axios.post(
        `http://localhost:8080/api/receptions/create?entrepot=${encodeURIComponent(entrepotNom)}`,
        receptionDto,
        axiosConfig
      );
      setSuccessMessage("Réception enregistrée avec succès !");
      setReceptionEnCours(null);
      setDateReception("");
      setEntrepotNom("");
      setLoading(false);
      fetchCommandes();
    } catch (error) {
      setLoading(false);
      setErrorMessage("Erreur lors de l'enregistrement de la réception.");
      console.error(error);
    }
  };

  return (
    <div className="nouvelledep-container">
      <h2 className="title">Nouvelle Dépôt d'Entrée</h2>

      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}

      <div className="search-bar">
        <input
          className="input-field"
          placeholder="Numéro d'achat"
          value={numAchatRecherche}
          onChange={(e) => setNumAchatRecherche(e.target.value)}
          disabled={loading}
        />
        <input
          className="input-field"
          placeholder="Nom du produit"
          value={produitRecherche}
          onChange={(e) => setProduitRecherche(e.target.value)}
          disabled={loading}
        />
        <button className="btn-primary" onClick={handleRecherche} disabled={loading}>
          {loading ? "Recherche..." : "Rechercher"}
        </button>
      </div>

      <table className="commandes-table">
        <thead>
          <tr>
            <th>Date de commande</th>
            <th>Numéro d'achat</th>
            <th>Fournisseur</th>
            <th>Produit</th>
            <th>Quantité</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {commandes.map((commande) => (
            <tr key={commande.num_achat}>
              <td>{commande.date}</td>
              <td>{commande.num_achat}</td>
              <td>{commande.fournisseur}</td>
              <td>{commande.produitDto.nom}</td>
              <td>{commande.quantite}</td>
              <td>
                <button onClick={() => handleReceptionClick(commande)} disabled={loading}>
                  Réceptionner
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {receptionEnCours && (
        <div className="reception-form">
          <h3>Réception de la commande {receptionEnCours.num_achat}</h3>

          <label>
            Entrepôt :
            <select value={entrepotNom} onChange={(e) => setEntrepotNom(e.target.value)} disabled={loading}>
              {entrepots.map((e) => (
                <option key={e.nom} value={e.nom}>
                  {e.nom}
                </option>
              ))}
            </select>
          </label>

          <label>
            Date de réception :
            <input type="date" value={dateReception} onChange={(e) => setDateReception(e.target.value)} disabled={loading} />
          </label>

          <button onClick={handleValiderReception} disabled={loading}>
            {loading ? "Enregistrement..." : "Valider la Réception"}
          </button>
        </div>
      )}
    </div>
  );
}

export default NouvelledepEntree;
