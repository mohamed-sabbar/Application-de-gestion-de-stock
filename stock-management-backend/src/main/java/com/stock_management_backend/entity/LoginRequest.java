package com.stock_management_backend.entity;


import lombok.Data;

@Data
public class LoginRequest {
    private String email;

    public String getMotDePasse() {
        return motDePasse;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setMotDePasse(String motDePasse) {
        this.motDePasse = motDePasse;
    }

    public String getEmail() {
        return email;
    }

    private String motDePasse;
}

