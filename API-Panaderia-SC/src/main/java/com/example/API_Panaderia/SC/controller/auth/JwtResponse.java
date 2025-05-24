package com.example.API_Panaderia.SC.controller.auth;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class JwtResponse {
    private String token;
    private String type = "Bearer";
    private String id;
    private String username;
    private String email;
    private List<String> roles; // Ahora incluido como campo opcional

    // Constructor alternativo sin roles (para compatibilidad)
    public JwtResponse(String accessToken, String id, String username, String email) {
        this.token = accessToken;
        this.id = id;
        this.username = username;
        this.email = email;
    }
}