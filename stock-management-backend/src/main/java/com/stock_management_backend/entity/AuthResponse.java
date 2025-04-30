package com.stock_management_backend.entity;

import lombok.AllArgsConstructor;
import lombok.Data;



public class AuthResponse {
    private String token;

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
    public  AuthResponse(String token) {
        this.token = token;
    }
}
