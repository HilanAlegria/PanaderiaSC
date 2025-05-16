package com.example.API_Panaderia.SC.controller.auth;

import jakarta.validation.constraints.NotBlank; // Para asegurar que los campos no estén vacíos

public class LoginRequest {

    @NotBlank(message = "El nombre de usuario es obligatorio")
    private String username;

    @NotBlank(message = "La contraseña es obligatoria")
    private String password;

    // Constructor vacío (necesario para la deserialización de JSON por Spring)
    public LoginRequest() {
    }

    // Constructor con todos los campos (útil para pruebas o inicialización)
    public LoginRequest(String username, String password) {
        this.username = username;
        this.password = password;
    }

    // Getters y Setters para acceder a los campos

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}