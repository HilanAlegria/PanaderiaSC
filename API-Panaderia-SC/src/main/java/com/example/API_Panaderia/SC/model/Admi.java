// API-Panaderia-SC/src/main/java/com/example/API_Panaderia/model/Admi.java
package com.example.API_Panaderia.SC.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Admis") // Nombre de la colección en MongoDB
public class Admi {
    @Id
    private String id; // Campo ID de MongoDB, suele ser un String para ObjectId
    private String nombre;
    private String email;
    private String password; // ¡Advertencia! Para producción, siempre encripta contraseñas.

    public Admi() {
    }

    public Admi(String id, String nombre, String email, String password) {
        this.id = id;
        this.nombre = nombre;
        this.email = email;
        this.password = password;
    }

    // Getters y Setters
    public String getId() {
        return id;
    }

    public void setId(String id) { // Este es el método setId correcto
        this.id = id; // Asigna el valor del parámetro 'id' al campo 'this.id'
    }

    public String getNombre() {
        return nombre;
    }
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
}