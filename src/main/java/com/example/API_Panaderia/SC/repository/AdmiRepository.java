package com.example.API_Panaderia.SC.repository;

import com.example.API_Panaderia.SC.model.Admi; 
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional; // Importa Optional

public interface AdmiRepository extends MongoRepository<Admi, String> {
    Optional<Admi> findByEmail(String email); // Añadir para buscar por email
    Boolean existsByEmail(String email); // Añadir para verificar existencia por email
}
