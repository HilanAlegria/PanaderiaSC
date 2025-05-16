package com.example.API_Panaderia.SC.controller.auth;

// Si usas roles, necesitarás importar java.util.List
// import java.util.List;

public class JwtResponse {
    private String token;
    private String type = "Bearer"; // Tipo de token, generalmente "Bearer"
    private String id;
    private String username;
    private String email;
    // private List<String> roles; // Opcional: si quieres devolver los roles del usuario

    // Constructor para un inicio de sesión exitoso
    public JwtResponse(String accessToken, String id, String username, String email /*, List<String> roles */) {
        this.token = accessToken;
        this.id = id;
        this.username = username;
        this.email = email;
        // this.roles = roles;
    }

    // Getters y Setters

    public String getAccessToken() {
        return token;
    }

    public void setAccessToken(String accessToken) {
        this.token = accessToken;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    // Si usas roles
    /*
    public List<String> getRoles() {
        return roles;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles;
    }
    */
}