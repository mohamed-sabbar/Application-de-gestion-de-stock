import React, { useEffect, useState } from 'react';
import './EntreeGestion.css';
import axios from 'axios';

function EntreeGestion() {
  const token = localStorage.getItem("token");
  const [Entrees, setEntrees] = useState([]);
  const [Form, setForm] = useState({
    dateDebut: '',
    dateFin: '',
    produit: '',
    entrepot: '',
  });
  const [Entrepots, setEntrepots] = useState([]);
  const [Produits, setProduits] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // 1. Charger toutes les réceptions au départ
  const fetchEntrees = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/admin/receptions/ShowAllReceptions",
        axiosConfig
      );
      setEntrees(res.data);
    } catch (error) {
      console.error("Erreur lors du téléchargement des réceptions", error);
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
      const res = await axios.get("http://localhost:8080/api/produits/getAllProduitsNames", axiosConfig);
      setProduits(res.data);
    } catch (error) {
      console.error("Erreur lors du téléchargement des produits", error);
    }
  };

  // 2. Recherche avec filtres
  const handleSearch = async (e) => {
    e.preventDefault();

    // Vérifier que les dates sont valides (optionnel)
    if (Form.dateDebut && Form.dateFin && Form.dateDebut > Form.dateFin) {
      alert("La date de début doit être avant la date de fin.");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:8080/api/admin/receptions/search",
        null,
        {
          params: {
            dateStart: Form.dateDebut,
            dateEnd: Form.dateFin,
            produitName: Form.produit,
            entrepotName: Form.entrepot,
          },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setEntrees(res.data); // afficher seulement résultats filtrés
    } catch (error) {
      console.error("Erreur lors de la recherche :", error);
    }
  };

  // 3. Réinitialiser la recherche et afficher toutes les réceptions
  const handleReset = () => {
    setForm({
      dateDebut: '',
      dateFin: '',
      produit: '',
      entrepot: '',
    });
    fetchEntrees();
  };

  // Reste du code : modification & suppression (pas modifié ici, inchangé)

  const HandleUpdate = (reception) => {
    if (!reception || !reception.entrepot || !reception.commandeAchat || !reception.commandeAchat.produitDto) {
      console.error("Réception invalide :", reception);
      return;
    }

    setForm({
      date: reception.date,
      remarque: reception.remarque,
      entrepot: reception.entrepot.nom,
      num_achat: reception.commandeAchat.num_achat,
      fournisseur: reception.commandeAchat.fournisseur,
      quantite: reception.commandeAchat.quantite,
      produit: reception.commandeAchat.produitDto.nom,
    });

    setSelectedId(reception.commandeAchat.num_achat);
    setShowModal(true);
  };

  const handleModalSubmit = async (e) => {
    e.preventDefault();

    const updatedReception = {
      date: Form.date,
      remarque: Form.remarque,
      entrepot: { nom: Form.entrepot },
      commandeAchat: {
        num_achat: Form.num_achat,
        fournisseur: Form.fournisseur,
        quantite: Form.quantite,
        produitDto: { nom: Form.produit },
      },
    };

    try {
      await axios.put(`http://localhost:8080/api/admin/receptions/update/${selectedId}`, updatedReception, axiosConfig);
      setShowModal(false);
      fetchEntrees();
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
    }
  };

  const HandleDelete = async (num_achat) => {
    try {
      await axios.delete(`http://localhost:8080/api/admin/receptions/delete/${num_achat}`, axiosConfig);
      fetchEntrees();
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    }
  };

  // Charger données initiales
  useEffect(() => {
    fetchEntrees();
    fetchEntrepots();
    fetchProduits();
  }, []);

  return (
    <div className="entree-gestion-container">
      <h1>Liste des réceptions</h1>

      {/* Formulaire de recherche */}
      <form className="entree-gestion-form" onSubmit={handleSearch}>
        <label>
          Date de réception - De :
          <input
            type="date"
            name="dateDebut"
            value={Form.dateDebut}
            onChange={e => setForm({ ...Form, dateDebut: e.target.value })}
          />
        </label>

        <label>
          À :
          <input
            type="date"
            name="dateFin"
            value={Form.dateFin}
            onChange={e => setForm({ ...Form, dateFin: e.target.value })}
          />
        </label>

        <label>
          Produit :
          <select
            name="produit"
            value={Form.produit}
            onChange={e => setForm({ ...Form, produit: e.target.value })}
          >
            <option value="">--Tous--</option>
            {Produits.map((produit, index) => (
              <option key={index} value={produit.nom}>
                {produit.nom}
              </option>
            ))}
          </select>
        </label>

        <label>
          Entrepôt :
          <select
            name="entrepot"
            value={Form.entrepot}
            onChange={e => setForm({ ...Form, entrepot: e.target.value })}
          >
            <option value="">--Tous--</option>
            {Entrepots.map((entrepot, index) => (
              <option key={index} value={entrepot.nom}>
                {entrepot.nom}
              </option>
            ))}
          </select>
        </label>

        <button type="submit">Chercher</button>
        <button type="button" onClick={handleReset} style={{ marginLeft: "10px" }}>
          Réinitialiser
        </button>
      </form>

      {/* Table des résultats */}
      <table className="entree-gestion-table">
        <thead>
          <tr>
            <th>Date de réception</th>
            <th>N° doc d'achat</th>
            <th>Produit</th>
            <th>Unit</th>
            <th>Quantité</th>
            <th>Source</th>
            <th>Entrepôt</th>
            <th>Remarque</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {Entrees.length === 0 ? (
            <tr><td colSpan="10" style={{ textAlign: "center" }}>Aucune réception trouvée</td></tr>
          ) : (
            Entrees.map((entree, index) => (
              <tr key={index}>
                <td>{entree.date}</td>
                <td>{entree.commandeAchat?.num_achat}</td>
                <td>{entree.commandeAchat?.produitDto?.nom}</td>
                <td>{entree.commandeAchat?.produitDto?.unite}</td>
                <td>{entree.commandeAchat?.quantite}</td>
                <td>{entree.commandeAchat?.fournisseur}</td>
                <td>{entree.entrepot?.nom}</td>
                <td>{entree.remarque}</td>
                <td>
                  <button onClick={() => HandleUpdate(entree)}>Modifier</button>
                </td>
                <td>
                  <button onClick={() => HandleDelete(entree.commandeAchat?.num_achat)}>Supprimer</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Modal modification */}
      {showModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <h2>Modifier la réception</h2>
            <form className="modal-form" onSubmit={handleModalSubmit}>
              <div className="form-group">
                <label>Date de réception :</label>
                <input type="date" value={Form.date} onChange={e => setForm({ ...Form, date: e.target.value })} />
              </div>

              <div className="form-group">
                <label>Num d'achat :</label>
                <input type="text" value={Form.num_achat} onChange={e => setForm({ ...Form, num_achat: e.target.value })} />
              </div>

              <div className="form-group">
                <label>Produit :</label>
                <select value={Form.produit} onChange={e => setForm({ ...Form, produit: e.target.value })}>
                  {Produits.map((produit, index) => (
                    <option key={index} value={produit.nom}>{produit.nom}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Entrepôt :</label>
                <select value={Form.entrepot} onChange={e => setForm({ ...Form, entrepot: e.target.value })}>
                  {Entrepots.map((entrepot, index) => (
                    <option key={index} value={entrepot.nom}>{entrepot.nom}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Fournisseur :</label>
                <input type="text" value={Form.fournisseur} onChange={e => setForm({ ...Form, fournisseur: e.target.value })} />
              </div>

              <div className="form-group">
                <label>Quantité :</label>
                <input type="number" value={Form.quantite} onChange={e => setForm({ ...Form, quantite: e.target.value })} />
              </div>

              <div className="form-group">
                <label>Remarque :</label>
                <textarea value={Form.remarque} onChange={e => setForm({ ...Form, remarque: e.target.value })} />
              </div>

              <div className="modal-buttons">
                <button type="submit">Enregistrer</button>
                <button type="button" onClick={() => setShowModal(false)}>Annuler</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default EntreeGestion;
