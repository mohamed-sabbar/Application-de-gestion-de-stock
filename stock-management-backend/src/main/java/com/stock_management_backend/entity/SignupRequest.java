package com.stock_management_backend.entity;


import lombok.Data;

@Data
public class SignupRequest {
    private String nom;
    private String email;
    private String motDePasse;
    private String role;  // "USER" ou "ADMIN"
}
