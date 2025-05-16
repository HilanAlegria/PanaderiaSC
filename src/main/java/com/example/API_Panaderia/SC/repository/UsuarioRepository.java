package com.example.API_Panaderia.SC.repository;

import java.util.Optional; 

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.API_Panaderia.SC.model.Usuario; // Importa Optional

public interface UsuarioRepository extends MongoRepository<Usuario, String> {
    Optional<Usuario> findByEmail(String email); // Añadir para buscar por email
    Boolean existsByEmail(String email); // Añadir para verificar existencia por email
}