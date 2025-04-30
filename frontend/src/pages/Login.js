import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'; // Fichier CSS pour le style
import { useNavigate } from 'react-router-dom'; // Pour la redirection

function Login() {
    const [form, setForm] = useState({ email: '', motDePasse: '' });
    const navigate = useNavigate();

    // Mise à jour de l'état lorsque l'utilisateur saisit des données
    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Soumission du formulaire
    const handleSubmit = async e => {
        e.preventDefault();
        try {
            // Appel API de login (ajuste l'URL selon ton backend)
            const res = await axios.post('http://localhost:8080/api/auth/login', form);

            // Sauvegarde du token JWT
            localStorage.setItem("token", res.data.token);

            // Sauvegarde du nom de l'utilisateur (si retourné par le backend)
            localStorage.setItem("nomUtilisateur", res.data.nom);

            // Affichage pour vérification
            console.log("Token JWT:", res.data.token);
            console.log("Nom:", res.data.nom);

            alert("Connexion réussie !");

            // Redirection vers la page d'accueil
            navigate('/home');
        } catch (err) {
            alert("Email ou mot de passe incorrect !");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="login-form">
            <h2>Connexion</h2>
            <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                required
            />
            <input
                type="password"
                name="motDePasse"
                placeholder="Mot de passe"
                onChange={handleChange}
                required
            />
            <button type="submit">Se connecter</button>
        </form>
    );
}

export default Login;
