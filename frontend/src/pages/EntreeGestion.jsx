import React from 'react';
import './EntreeGestion.css';
import  { useEffect, useState } from 'react';
import axios from 'axios';
function EntreeGestion() {
    const token = localStorage.getItem("token");
    const [Entrees,setEntrees]=useState([]);
    const [Form, setForm] = useState({ nom: '', code: '', adresse: '' });
    const [Entrepôts,setEntrepots]=useState([])
    const [showModal, setShowModal] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const axiosConfig = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      const fetchEntrees = async () => {
        try {
          const res = await axios.get("http://localhost:8080/api/admin/receptions/ShowAllReceptions", axiosConfig);
          setEntrees(res.data);
        } catch (error) {
          console.error("Erreur lors de téléchargement des entrepôts", error);
        }
      };
  const fetchEntrepots = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/admin/DisplayAllEntrepots", axiosConfig);
      setEntrepots(res.data);
    } catch (error) {
      console.error("Erreur lors de téléchargement des entrepôts", error);
    }
  };
   const HandleUpdate = (entrepot) => {
    setForm({
      nom: entrepot.nom,
      code: entrepot.code,
      adresse: entrepot.adresse,
    });
    setSelectedId(entrepot.id);
    setShowModal(true);
  };

  const handleModalSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8080/api/admin/update/${selectedId}`, Form, axiosConfig);
    setForm({ nom: '', code: '', adresse: '' });
    setSelectedId(null);
    setShowModal(false);
    fetchEntrepots();
  };

 
  const HandleDelete = async (num_achat) => {
    await axios.delete(`http://localhost:8080/api/admin/receptions/delete/${num_achat}`, axiosConfig);
    fetchEntrees();
  };

  useEffect(() => {
    fetchEntrees();
  }, []);
    useEffect(() => {
    fetchEntrepots();
  }, []);
  return (
    <div className="entree-gestion-container">
      <h1>Liste des réceptions</h1>
      
      <form className="entree-gestion-form">
        <label>
          Date de réception - De :
          <input type="date" name="dateDebut" />
        </label>
        
        <label>
          À :
          <input type="date" name="dateFin" />
        </label>
        
        <label>
          Produit :
          <input type="text" name="produit" placeholder="Nom du produit" />
        </label>
        
        <label>
          Entrepôt :
          <select name="entrepot">
            {Entrepôts.map((entrepot,index)=>(
              <option key={index} value={entrepot.nom}>
                {entrepot.nom}
              </option>
            ))

            }
          </select>
        </label>
        
        <button type="submit">Chercher</button>
      </form>

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
        {Entrees.map((entree,index) => (
            <tr key={index}>
              <td>{entree.date}</td>
              <td>{entree.commandeAchat.num_achat}</td>
              <td>{entree.produit.nom}</td>
              <td>{entree.produit.unite}</td>
              <td>{entree.quantite}</td>
              <td>{entree.commandeAchat.fournisseur}</td>
              <td>{entree.entrepot.nom}</td>
              <td>{entree.commandeAchat.statut}</td>
              <td>
                <button onClick={() => HandleUpdate(entree.commandeAchat.num_achat)}>Modifier</button>
              </td>
              <td>
                <button onClick={() => HandleDelete(entree.commandeAchat.num_achat)}>Supprimer</button>
              </td>
            </tr>
          ))}         
        </tbody>
      </table>

            {showModal && (
  <div className="modal-backdrop">
    <div className="modal">
      <h2>Modifier la reception</h2>
      <form className="modal-form" onSubmit={handleModalSubmit}>
        <div className="form-group">
          <label htmlFor="nom">la date de reception :</label>
          <input type="date" name="dateDebut" />
        </div>
        <div className="form-group">
          <label htmlFor="code">Num d'achat</label>
          <input type="text" id="code" name="code" value={Form.code}  />
        </div>
        <div className="form-group">
          <label htmlFor="adresse">Produit :</label>
                    <select name="entrepot">
            {Entrepôts.map((entrepot,index)=>(
              <option key={index} value={entrepot.nom}>
                {entrepot.nom}
              </option>
            ))

            }
          </select>
          <div>
            <label>Fornisseur
                                <select name="entrepot">
            {Entrepôts.map((entrepot,index)=>(
              <option key={index} value={entrepot.nom}>
                {entrepot.nom}
              </option>
            ))

            }
          </select>
          </label>
          <div>
            <label> Remaque
              <input type='text'/>
            </label>
          </div>
          </div>
        </div>
        <div className="modal-buttons">
          <button type="submit" className="btn-ajouter">Enregistrer</button>
          <button type="button" className="btn-annuler" onClick={() => setShowModal(false)}>Annuler</button>
        </div>
      </form>
    </div>
  </div>
)}

    </div>
  );
}

export default EntreeGestion;
