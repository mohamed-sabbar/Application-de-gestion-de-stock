// src/pages/Signup.js
import React, { useState } from 'react';
import axios from 'axios';

function Signup() {
    const [form, setForm] = useState({ nom: '', email: '', motDePasse: '', role: 'USER' });

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/api/auth/signup', form);
            alert("Utilisateur créé avec succès !");
        } catch (err) {
            alert("Erreur d'inscription !");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Créer un compte</h2>
            <input type="text" name="nom" placeholder="Nom" onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
            <input type="password" name="motDePasse" placeholder="Mot de passe" onChange={handleChange} required />
            <button type="submit">S'inscrire</button>
        </form>
    );
}

export default Signup;
