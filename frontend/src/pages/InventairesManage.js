import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from './Layout';
import './InventairesManage.css';
import { useNavigate } from 'react-router-dom';

function InventairesManage() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [inventaires, setInventaires] = useState([]);
  const [entrepots, setEntrepots] = useState([]);
  const [resultatsFiltres, setResultatsFiltres] = useState([]);

  const [dateDebut, setDateDebut] = useState('');
  const [entrepotFiltre, setEntrepotFiltre] = useState('');

  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const fetchInventaires = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/Inventaire/getAllInventaires", axiosConfig);
      setInventaires(res.data);
      setResultatsFiltres(res.data); // initialisation
    } catch (error) {
      console.error("Erreur lors du téléchargement des inventaires", error);
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

  useEffect(() => {
    fetchInventaires();
    fetchEntrepots();
    const token = localStorage.getItem("token");
        if (!token) {
            navigate('/login');
            return;
        }
  }, []);

  const handleFiltrer = async (e) => {
    e.preventDefault();

    if (!dateDebut || !entrepotFiltre) {
      alert("Veuillez remplir tous les champs de filtrage.");
      return;
    }

    try {
      const res = await axios.get(
        `http://localhost:8080/api/Inventaire/getInventaire?date=${dateDebut}&nom=${entrepotFiltre}`,
        axiosConfig
      );
      setResultatsFiltres(res.data);
    } catch (error) {
      console.error("Erreur lors du filtrage des inventaires", error);
      alert("Une erreur est survenue lors du filtrage.");
    }
  };

  const downloadExcelFromBase64 = (base64String, fileName = "inventaire.xlsx") => {
    const byteCharacters = atob(base64String);
    const byteNumbers = Array.from(byteCharacters, char => char.charCodeAt(0));
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="inventaire-container">
      <h1>Liste des Inventaires</h1>

      <form className="inventaire-form" onSubmit={handleFiltrer}>
        <label>
          Date de l'inventaire :
          <input
            type="date"
            value={dateDebut}
            onChange={(e) => setDateDebut(e.target.value)}
          />
        </label>

        <label>
          Entrepôt :
          <select
            value={entrepotFiltre}
            onChange={(e) => setEntrepotFiltre(e.target.value)}
          >
            <option value="">Tous les entrepôts</option>
            {entrepots.map((entrepot) => (
              <option key={entrepot.id} value={entrepot.nom}>
                {entrepot.nom}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Chercher</button>
      </form>

      <table className="inventaire-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Entrepôt</th>
            <th>Effectué par</th>
            <th>Validé par</th>
            <th>Téléchargement</th>
          </tr>
        </thead>
        <tbody>
          {resultatsFiltres.length > 0 ? (
            resultatsFiltres.map((inv, index) => (
              <tr key={inv.id || index}>
                <td>{inv.date || '-'}</td>
                <td>{inv.entrepotDto?.nom || '-'}</td>
                <td>{inv.effectueur || '-'}</td>
                <td>{inv.validateur || '-'}</td>
                <td>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (inv.fichierExcel) {
                        downloadExcelFromBase64(inv.fichierExcel, `inventaire_${inv.id || index}.xlsx`);
                      } else {
                        alert("Fichier introuvable !");
                      }
                    }}
                  >
                    Télécharger inventaire
                  </a>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center' }}>
                Aucun résultat trouvé.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default InventairesManage;
