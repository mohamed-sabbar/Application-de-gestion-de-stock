package com.stock_management_backend.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor

public class AuthResponse {
    private String token;
    public AuthResponse(){}


}
