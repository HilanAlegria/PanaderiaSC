package com.example.API_Panaderia.SC.controller.auth;

// TODO: Update the import below to the correct package where Usuario.java is located, for example:
import com.example.API_Panaderia.SC.model.Usuario;
// import com.panaderiasc.api.panaderia.repository.UsuarioRepository;
import com.example.API_Panaderia.SC.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid; // Para validar el DTO

@RestController
@RequestMapping("/api/auth") // Ruta base para todas las operaciones de autenticación
@CrossOrigin(origins = "https://hilanalegria.github.io/PanaderiaSC/") // <--- ¡MUY IMPORTANTE! Reemplaza XXXX con el puerto de tu frontend
public class AuthController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder; // Necesitarás un PasswordEncoder configurado en Spring Security

    @PostMapping("/register") // Este será tu endpoint para el registro
    public ResponseEntity<?> registerUser(@Valid @RequestBody RegistroRequest registroRequest) {

        // 1. Validar si el nombre de usuario ya existe
        if (usuarioRepository.findByUsername(registroRequest.getUsername()).isPresent()) {
            return new ResponseEntity<>("Error: El nombre de usuario ya está en uso!", HttpStatus.BAD_REQUEST);
        }

        // 2. Validar si el email ya está registrado
        if (usuarioRepository.findByEmail(registroRequest.getEmail()).isPresent()) {
            return new ResponseEntity<>("Error: El email ya está registrado!", HttpStatus.BAD_REQUEST);
        }

        // 3. Crear un nuevo objeto Usuario
        Usuario nuevoUsuario = new Usuario();
        nuevoUsuario.setUsername(registroRequest.getUsername());
        nuevoUsuario.setEmail(registroRequest.getEmail());
        // ¡MUY IMPORTANTE!: Encriptar la contraseña antes de guardarla
        nuevoUsuario.setPassword(passwordEncoder.encode(registroRequest.getPassword()));

        // Opcional: Asignar un rol por defecto (ej. "ROLE_USER") si usas roles
        // Set<String> roles = new HashSet<>();
        // roles.add("ROLE_USER");
        // nuevoUsuario.setRoles(roles); // Asegúrate de que el modelo Usuario tenga un campo 'roles'

        // 4. Guardar el usuario en MongoDB
        usuarioRepository.save(nuevoUsuario);

        return new ResponseEntity<>("¡Usuario registrado exitosamente!", HttpStatus.CREATED); // HttpStatus.CREATED (201) es mejor para creaciones
    }

    // Aquí podrías añadir un endpoint para el login (si usas JWT, aquí generarías el token)
    // @PostMapping("/login")
    // public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) { ... }
}