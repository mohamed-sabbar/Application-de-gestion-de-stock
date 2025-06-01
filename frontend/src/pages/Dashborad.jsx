import React, { useState, useEffect } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import './Dashborad.css'
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);
function Dashboard(){
    const [stats, setStats] = useState({
    totalProducts: 0,
    totalWarehouses: 0,
    lowStockItems: 0
  });

  const [warehouses, setWarehouses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulation de chargement de données
  useEffect(() => {
    setTimeout(() => {
      setStats({
        totalProducts: 1245,
        totalWarehouses: 5,
        lowStockItems: 23
      });

      setWarehouses([
        { id: 1, name: 'Entrepôt Principal', location: 'Casablanca', capacity: 80, products: 650 },
        { id: 2, name: 'Entrepôt Secondaire', location: 'Rabat', capacity: 65, products: 320 },
        { id: 3, name: 'Stockage Froid', location: 'Tanger', capacity: 45, products: 150 },
        { id: 4, name: 'Dépôt Régional', location: 'Marrakech', capacity: 30, products: 125 }
      ]);

      setLoading(false);
    }, 1000);
  }, []);

  // Données pour les graphiques
  const productsData = {
    labels: warehouses.map(wh => wh.name),
    datasets: [{
      label: 'Nombre de produits',
      data: warehouses.map(wh => wh.products),
      backgroundColor: 'rgba(54, 162, 235, 0.7)',
      borderWidth: 1
    }]
  };

  const capacityData = {
    labels: warehouses.map(wh => wh.name),
    datasets: [{
      data: warehouses.map(wh => wh.capacity),
      backgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
        '#4BC0C0'
      ],
      borderWidth: 1
    }]
  };

  if (loading) {
    return <div className="loading-spinner">Chargement...</div>;
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Tableau de Bord Gestion de Stock</h1>
        <p>Aperçu complet de votre inventaire</p>
      </header>

      <div className="stats-cards">
        <div className="stat-card">
          <h3>Produits Totaux</h3>
          <p className="stat-value blue">{stats.totalProducts}</p>
        </div>
        
        <div className="stat-card">
          <h3>Entrepôts</h3>
          <p className="stat-value green">{stats.totalWarehouses}</p>
        </div>
        
        <div className="stat-card">
          <h3>Stocks Faibles</h3>
          <p className="stat-value red">{stats.lowStockItems}</p>
        </div>
      </div>

      <div className="charts-container">
        <div className="chart-wrapper">
          <h2>Produits par Entrepôt</h2>
          <Bar 
            data={productsData} 
            options={{ 
              responsive: true,
              plugins: { legend: { display: false } }
            }} 
          />
        </div>
        
        <div className="chart-wrapper">
          <h2>Capacité des Entrepôts (%)</h2>
          <Pie 
            data={capacityData} 
            options={{ responsive: true }} 
          />
        </div>
      </div>

      <div className="warehouses-table">
        <h2>Liste des Entrepôts</h2>
        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Localisation</th>
              <th>Capacité</th>
              <th>Produits</th>
            </tr>
          </thead>
          <tbody>
            {warehouses.map(warehouse => (
              <tr key={warehouse.id}>
                <td>{warehouse.name}</td>
                <td>{warehouse.location}</td>
                <td>
                  <div className="capacity-bar">
                    <div 
                      className="capacity-fill" 
                      style={{ width: `${warehouse.capacity}%` }}
                    ></div>
                    <span>{warehouse.capacity}%</span>
                  </div>
                </td>
                <td>{warehouse.products}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

}
export default Dashboard;