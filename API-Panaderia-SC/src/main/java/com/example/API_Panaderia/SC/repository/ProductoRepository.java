package com.example.API_Panaderia.SC.repository;

import com.example.API_Panaderia.SC.model.Producto; 
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ProductoRepository extends MongoRepository<Producto, String> {
   
}