import React, { useEffect, useState } from 'react';
import './InventoryManage.css';
import axios from 'axios';

function InventoryManage() {
  const token = localStorage.getItem("token");
  const [Entrepots, setEntrepots] = useState([]);
  const [Form, setForm] = useState({ nom: '', code: '', adresse: '' });
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${token}`
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

  const handleChange = (e) => {
    setForm({ ...Form, [e.target.name]: e.target.value });
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8080/api/admin/create", Form, axiosConfig);
    fetchEntrepots();
    setForm({ nom: '', code: '', adresse: '' });
  };

  const HandleReset = () => {
    setForm({ nom: '', code: '', adresse: '' });
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

  const HandleDelete = async (id) => {
    await axios.delete(`http://localhost:8080/api/admin/delete/${id}`, axiosConfig);
    fetchEntrepots();
  };

  useEffect(() => {
    fetchEntrepots();
  }, []);

  return (
    <div className="container">
      <h1>Liste des entrepôts</h1>
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Code</th>
            <th>Adresse</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {Entrepots.map(entrepot => (
            <tr key={entrepot.id}>
              <td>{entrepot.nom}</td>
              <td>{entrepot.code}</td>
              <td>{entrepot.adresse}</td>
              <td>
                <button onClick={() => HandleUpdate(entrepot)}>Modifier</button>
              </td>
              <td>
                <button className="delete-btn" onClick={() => HandleDelete(entrepot.id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h1>Ajouter un entrepôt</h1>
      <form onSubmit={HandleSubmit}>
        <label>
          Nom:
          <input type="text" name="nom" value={Form.nom} onChange={handleChange} />
        </label>
        <label>
          Code:
          <input type="text" name="code" value={Form.code} onChange={handleChange} />
        </label>
        <label>
          Adresse:
          <input type="text" name="adresse" value={Form.adresse} onChange={handleChange} />
        </label>
        <div className="button-group">
          <button type="submit" className="btn-ajouter">Ajouter</button>
          <button type="button" className="btn-annuler" onClick={HandleReset}>Annuler</button>
        </div>
      </form>

      {showModal && (
  <div className="modal-backdrop">
    <div className="modal">
      <h2>Modifier l'entrepôt</h2>
      <form className="modal-form" onSubmit={handleModalSubmit}>
        <div className="form-group">
          <label htmlFor="nom">Nom :</label>
          <input type="text" id="nom" name="nom" value={Form.nom} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="code">Code :</label>
          <input type="text" id="code" name="code" value={Form.code} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="adresse">Adresse :</label>
          <input type="text" id="adresse" name="adresse" value={Form.adresse} onChange={handleChange} />
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

export default InventoryManage;
