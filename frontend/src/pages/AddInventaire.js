import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import './AddInventaire.css';
import { useNavigate } from 'react-router-dom';
const AddInventaire = () => {
  const token = localStorage.getItem("token");

  const [dateInventaire, setDateInventaire] = useState('');
  const [entrepots, setEntrepots] = useState([]);
  const [entrepot, setEntrepot] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [showUpload, setShowUpload] = useState(false);
  const [inventaireData, setInventaireData] = useState([]);
  const [validerMessage, setValiderMessage] = useState('');
  const [fileToSend, setFileToSend] = useState(null);
  const navigate = useNavigate();

  const axiosConfig = {
    headers: { Authorization: `Bearer ${token}` }
  };

  useEffect(() => {
    const fetchEntrepots = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/DisplayAllEntrepots", axiosConfig);
        setEntrepots(res.data);
      } catch (error) {
        console.error("Erreur lors du téléchargement des entrepôts", error);
      }
    };
    fetchEntrepots();
    const token = localStorage.getItem("token");
        if (!token) {
            navigate('/login');
            return;
        }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setShowUpload(false);
    setInventaireData([]);
    setValiderMessage('');

    if (!dateInventaire || !entrepot) {
      setMessage("Veuillez sélectionner une date et un entrepôt.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:8080/api/Inventaire/newInventaire`,
        {
          params: { date: dateInventaire, nom: entrepot },
          headers: axiosConfig.headers,
          responseType: 'blob',
        }
      );

      if (response.data.size === 0) {
        setMessage("Fichier introuvable.");
        return;
      }

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `inventaire_${dateInventaire}_${entrepot}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();

      setMessage("Fichier téléchargé avec succès.");
      setShowUpload(true);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setMessage("Fichier introuvable.");
      } else {
        setMessage("Erreur lors du téléchargement.");
        console.error(error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFileToSend(file);

    const reader = new FileReader();
    reader.onload = (evt) => {
      const data = new Uint8Array(evt.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(firstSheet);

      const updatedData = jsonData.map(row => ({
        produit: row.produit || row["Nom du produit"] || '',
        quantiteTheorique: row.quantiteTheorique || row["Quantité théorique"] || 0,
        quantiteReelle: row.quantiteReelle || row["Quantité réelle (à remplir)"] || 0
      }));

      setInventaireData(updatedData);
    };
    reader.readAsArrayBuffer(file);
  };

  const handleQuantiteReelleChange = (index, value) => {
    const newData = [...inventaireData];
    newData[index].quantiteReelle = value;
    setInventaireData(newData);
  };

  const handleValider = async () => {
    if (!fileToSend) {
      setValiderMessage("Veuillez sélectionner un fichier à envoyer.");
      return;
    }

    const formData = new FormData();
    formData.append("fichierExcel", fileToSend);
    formData.append("date", dateInventaire);
    formData.append("entrepotName", entrepot);
    formData.append("effectueur", localStorage.getItem("nomUtilisateur"));
    

    try {
      await axios.post("http://localhost:8080/api/Inventaire/save", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        }
      });
      setValiderMessage("Inventaire validé avec succès.");
    } catch (error) {
      setValiderMessage("Erreur lors de la validation.");
      console.error(error);
    }
  };

  return (
    <div className="inventaire-container">
      <h1>Nouveau inventaire</h1>

      <form onSubmit={handleSubmit} className="inventaire-form">
        <label>
          Date inventaire
          <input
            type="date"
            value={dateInventaire}
            onChange={(e) => setDateInventaire(e.target.value)}
            required
          />
        </label>

        <label>
          Entrepôt
          <select value={entrepot} onChange={(e) => setEntrepot(e.target.value)} required>
            <option value="">-- Sélectionner --</option>
            {entrepots.map((e) => (
              <option key={e.id} value={e.nom}>{e.nom}</option>
            ))}
          </select>
        </label>

        <button type="submit" disabled={loading}>
          {loading ? "Chargement..." : "Télécharger"}
        </button>
      </form>

      {message && (
        <div style={{ marginTop: '20px', color: message.includes("succès") ? 'green' : 'red' }}>
          {message}
        </div>
      )}

      {showUpload && (
        <div style={{ marginTop: '30px' }}>
          <h3>Uploader le fichier complété</h3>
          <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
        </div>
      )}

      {inventaireData.length > 0 && (
        <div style={{ marginTop: '30px' }}>
          <h3>Tableau d'inventaire</h3>
          <table>
            <thead>
              <tr>
                <th>Produit</th>
                <th>Quantité théorique</th>
                <th>Quantité réelle</th>
              </tr>
            </thead>
            <tbody>
              {inventaireData.map((row, index) => (
                <tr key={index}>
                  <td>{row.produit}</td>
                  <td>{row.quantiteTheorique}</td>
                  <td>
                    <input
                      type="number"
                      value={row.quantiteReelle}
                      onChange={(e) => handleQuantiteReelleChange(index, e.target.value)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button style={{ marginTop: '20px' }} onClick={handleValider}>Valider</button>
          {validerMessage && (
            <div style={{ marginTop: '10px', color: validerMessage.includes("succès") ? 'green' : 'red' }}>
              {validerMessage}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AddInventaire;
