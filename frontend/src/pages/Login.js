import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'; // Importation du fichier CSS

function Login() {
    const [form, setForm] = useState({ email: '', motDePasse: '' });

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8080/api/auth/login', form);
            localStorage.setItem("token", res.data.token); // Sauvegarde du token
            alert("Connexion réussie !");
            // Rediriger vers /entrepots par exemple
        } catch (err) {
            alert("Email ou mot de passe incorrect !");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="login-form">
            <h2>Connexion</h2>
            <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
            <input type="password" name="motDePasse" placeholder="Mot de passe" onChange={handleChange} required />
            <button type="submit">Se connecter</button>
        </form>
    );
}

export default Login;
