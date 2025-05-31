package com.example.API_Panaderia.SC.controller;

import java.util.List; // Ajustado a la ruta de tu modelo
import java.util.Optional; // Ajustado a la ruta de tu repositorio

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.API_Panaderia.SC.model.Admi;
import com.example.API_Panaderia.SC.repository.AdmiRepository;

@RestController
@RequestMapping("/api/admis") // URL base para operaciones con administradores
public class AdmiController {

    @Autowired
    private AdmiRepository admiRepository;

    // Obtener todos los administradores
    @GetMapping
    public ResponseEntity<List<Admi>> getAllAdmis() {
        List<Admi> admis = admiRepository.findAll();
        return new ResponseEntity<>(admis, HttpStatus.OK);
    }

    @GetMapping("/test")
    public ResponseEntity<String> getExample() {
        return new ResponseEntity<>("HILAN ES UN VENECO", HttpStatus.OK);
    }

    // Obtener un administrador por ID
    @GetMapping("/{id}")
    public ResponseEntity<Admi> getAdmiById(@PathVariable String id) {
        Optional<Admi> admi = admiRepository.findById(id);
        return admi.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                    .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Crear un nuevo administrador
    @PostMapping
    public ResponseEntity<Admi> createAdmi(@RequestBody Admi admi) {
        Admi newAdmi = admiRepository.save(admi);
        return new ResponseEntity<>(newAdmi, HttpStatus.CREATED);
    }

    // Actualizar un administrador existente
    @PutMapping("/{id}")
    public ResponseEntity<Admi> updateAdmi(@PathVariable String id, @RequestBody Admi admi) {
        Optional<Admi> existingAdmi = admiRepository.findById(id);
        if (existingAdmi.isPresent()) {
            admi.setId(id); // Asegúrate de que el ID de la URL se use en el objeto
            Admi updatedAdmi = admiRepository.save(admi);
            return new ResponseEntity<>(updatedAdmi, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Eliminar un administrador por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteAdmi(@PathVariable String id) {
        try {
            admiRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT); // 204 No Content
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR); // 500 Internal Server Error
        }
    }
}