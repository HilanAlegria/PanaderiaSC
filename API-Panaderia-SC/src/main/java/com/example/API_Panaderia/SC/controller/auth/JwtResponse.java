package com.example.API_Panaderia.SC.controller.auth;

import java.util.List;

import com.example.API_Panaderia.SC.model.Usuario;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class JwtResponse {

    private String token;
    private Usuario usuario;

    public JwtResponse() {}

    public JwtResponse(String token, Usuario usuario) {
        this.token = token;
        this.usuario = usuario;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }
}