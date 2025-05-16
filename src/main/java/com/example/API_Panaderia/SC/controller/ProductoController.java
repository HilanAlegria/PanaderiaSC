package com.example.API_Panaderia.SC.controller;

import com.example.API_Panaderia.SC.model.Producto; 
import com.example.API_Panaderia.SC.repository.ProductoRepository; 

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/productos") // URL base para operaciones con productos
public class ProductoController {

    @Autowired
    private ProductoRepository productoRepository;

    // Obtener todos los productos
    @GetMapping
    public ResponseEntity<List<Producto>> getAllProductos() {
        List<Producto> productos = productoRepository.findAll();
        return new ResponseEntity<>(productos, HttpStatus.OK);
    }

    // Obtener un producto por ID
    @GetMapping("/{id}")
    public ResponseEntity<Producto> getProductoById(@PathVariable String id) {
        Optional<Producto> producto = productoRepository.findById(id);
        return producto.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                       .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Crear un nuevo producto
    @PostMapping
    public ResponseEntity<Producto> createProducto(@RequestBody Producto producto) {
        Producto newProducto = productoRepository.save(producto);
        return new ResponseEntity<>(newProducto, HttpStatus.CREATED);
    }

    // Actualizar un producto existente
    @PutMapping("/{id}")
    public ResponseEntity<Producto> updateProducto(@PathVariable String id, @RequestBody Producto producto) {
        Optional<Producto> existingProducto = productoRepository.findById(id);
        if (existingProducto.isPresent()) {
            producto.setId(id); // Asegúrate de que el ID de la URL se use en el objeto
            Producto updatedProducto = productoRepository.save(producto);
            return new ResponseEntity<>(updatedProducto, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Eliminar un producto por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteProducto(@PathVariable String id) {
        try {
            productoRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}