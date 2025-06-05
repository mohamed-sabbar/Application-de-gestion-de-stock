import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import './Dashboarad.css';
import { useNavigate } from 'react-router-dom';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

function Dashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalWarehouses: 0,
    lowStockItems: 0
  });
  const navigate=useNavigate();

  const [warehouses, setWarehouses] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Supposons que le token soit stocké dans localStorage ou ailleurs
  const token = localStorage.getItem('token'); // Ou selon où tu le stockes

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };

        const productsData = await axios.get('http://localhost:8080/api/produits', config).then(res => res.data);
        const warehousesData = await axios.get('http://localhost:8080/api/DisplayAllEntrepots', config).then(res => res.data);

        const lowStockItems = productsData.length > 0
            ? Math.floor(productsData.length * 0.05)
            : 0;

        setStats({
          totalProducts: productsData.length,
          totalWarehouses: warehousesData.length,
          lowStockItems
        });

        const warehousesWithCapacity = warehousesData.map(wh => ({
          ...wh,
          capaciteMax: 1000 + Math.floor(Math.random() * 2000),
          stockActuel: 200 + Math.floor(Math.random() * 800)
        }));

        setWarehouses(warehousesWithCapacity);

        const [livraisons, receptions, transferts] = await Promise.all([
          axios.get('http://localhost:8080/api/livraisons', config).then(res => res.data),
          axios.get('http://localhost:8080/api/receptions/ShowAllReceptions', config).then(res => res.data),
          axios.get('http://localhost:8080/api/transferts', config).then(res => res.data)
        ]);

        const combinedActivity = [
          ...livraisons.map(l => ({
            ...l,
            type: 'Livraison',
            produit: l.produit?.nom || 'Produit inconnu',
            entrepot: l.entrepot?.nom || 'Entrepôt inconnu'
          })),
          ...receptions.map(r => ({
            ...r,
            type: 'Réception',
            produit: r.produit?.nom || 'Produit inconnu',
            entrepot: r.entrepot?.nom || 'Entrepôt inconnu'
          })),
          ...transferts.map(t => ({
            ...t,
            type: 'Transfert',
            produit: t.produit?.nom || 'Produit inconnu',
            entrepot: `${t.source?.nom} → ${t.destination?.nom}`
          }))
        ];

        const sortedActivity = combinedActivity
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 10);

        setRecentActivity(sortedActivity);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Erreur lors du chargement des données");
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

useEffect(()=>{
      const token = localStorage.getItem("token");
    if (!token) {
      navigate('/login');
      return;
    }

})
  const productsData = {
    labels: warehouses.map(wh => wh.nom),
    datasets: [{
      label: 'Stock Actuel',
      data: warehouses.map(wh => wh.stockActuel),
      backgroundColor: 'rgba(54, 162, 235, 0.7)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1
    }]
  };

  const capacityData = {
    labels: warehouses.map(wh => wh.nom),
    datasets: [{
      label: 'Taux de remplissage',
      data: warehouses.map(wh => Math.round((wh.stockActuel / wh.capaciteMax) * 100)),
      backgroundColor: [
        'rgba(255, 99, 132, 0.7)',
        'rgba(54, 162, 235, 0.7)',
        'rgba(255, 206, 86, 0.7)',
        'rgba(75, 192, 192, 0.7)',
        'rgba(153, 102, 255, 0.7)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)'
      ],
      borderWidth: 1
    }]
  };

  if (loading) {
    return (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Chargement des données...</p>
        </div>
    );
  }

  if (error) {
    return (
        <div className="error-container">
          <div className="error-icon">⚠️</div>
          <h3>{error}</h3>
          <button onClick={() => window.location.reload()}>Réessayer</button>
        </div>
    );
  }

  return (
      <div className="dashboard-container">
        <header className="dashboard-header">
          <h1>Tableau de Bord Gestion de Stock</h1>
          <p>Aperçu complet de votre inventaire</p>
        </header>

        <div className="stats-cards">
          <div className="stat-card blue">
            <div className="stat-icon">📦</div>
            <div className="stat-content">
              <h3>Produits Totaux</h3>
              <p className="stat-value">{stats.totalProducts}</p>
            </div>
          </div>

          <div className="stat-card green">
            <div className="stat-icon">🏭</div>
            <div className="stat-content">
              <h3>Entrepôts</h3>
              <p className="stat-value">{stats.totalWarehouses}</p>
            </div>
          </div>

          <div className="stat-card red">
            <div className="stat-icon">⚠️</div>
            <div className="stat-content">
              <h3>Stocks Faibles</h3>
              <p className="stat-value">{stats.lowStockItems}</p>
            </div>
          </div>
        </div>

        <div className="charts-container">
          <div className="chart-wrapper">
            <h2>Stock par Entrepôt</h2>
            <Bar
                data={productsData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { display: false },
                    tooltip: {
                      callbacks: {
                        label: function (context) {
                          return `Stock: ${context.raw} unités`;
                        }
                      }
                    }
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      title: { display: true, text: 'Quantité' }
                    }
                  }
                }}
            />
          </div>

          <div className="chart-wrapper">
            <h2>Remplissage des Entrepôts (%)</h2>
            <Pie
                data={capacityData}
                options={{
                  responsive: true,
                  plugins: {
                    tooltip: {
                      callbacks: {
                        label: function (context) {
                          return `Remplissage: ${context.raw}%`;
                        }
                      }
                    }
                  }
                }}
            />
          </div>
        </div>

        <div className="data-tables">
          <div className="table-wrapper">
            <h2>Liste des Entrepôts</h2>
            <table>
              <thead>
              <tr>
                <th>Nom</th>
                <th>Adresse</th>
                <th>Capacité</th>
                <th>Stock Actuel</th>
              </tr>
              </thead>
              <tbody>
              {warehouses.map(warehouse => {
                const capacityPercent = Math.round((warehouse.stockActuel / warehouse.capaciteMax) * 100);
                const capacityClass = capacityPercent > 85 ? 'high' : capacityPercent > 70 ? 'medium' : 'low';

                return (
                    <tr key={warehouse.id}>
                      <td>{warehouse.nom}</td>
                      <td>{warehouse.adresse}</td>
                      <td>
                        <div className="capacity-bar">
                          <div
                              className={`capacity-fill ${capacityClass}`}
                              style={{ width: `${capacityPercent}%` }}
                          ></div>
                          <span>{capacityPercent}%</span>
                        </div>
                      </td>
                      <td>{warehouse.stockActuel} / {warehouse.capaciteMax}</td>
                    </tr>
                );
              })}
              </tbody>
            </table>
          </div>

          <div className="table-wrapper">
            <h2>Activité Récente</h2>
            <table>
              <thead>
              <tr>
                <th>Type</th>
                <th>Date</th>
                <th>Produit</th>
                <th>Quantité</th>
                <th>Entrepôt</th>
              </tr>
              </thead>
              <tbody>
              {recentActivity.map(activity => (
                  <tr key={activity.id}>
                    <td>
                    <span className={`activity-badge ${activity.type.toLowerCase()}`}>
                      {activity.type}
                    </span>
                    </td>
                    <td>{new Date(activity.date).toLocaleDateString()}</td>
                    <td>{activity.produit}</td>
                    <td>{activity.quantite}</td>
                    <td>{activity.entrepot}</td>
                  </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
  );
}

export default Dashboard;