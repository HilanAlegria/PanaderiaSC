package com.example.API_Panaderia.SC.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Usuarios")
public class Usuario {
    @Id
    private String id;
    private String nombre;
    private String username;
    private String email;
    private String password; 
    private String direccion;
    private String telefono;

    public Usuario() {
    }

    public Usuario(String id, String nombre, String email, String password, String direccion, String telefono) {
        this.id = id;
        this.nombre = nombre;
        this.email = email;
        this.password = password;
        this.direccion = direccion;
        this.telefono = telefono;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public String getDireccion() { return direccion; }
    public void setDireccion(String direccion) { this.direccion = direccion; }
    public String getTelefono() { return telefono; }
    public void setTelefono(String telefono) { this.telefono = telefono; }
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
}