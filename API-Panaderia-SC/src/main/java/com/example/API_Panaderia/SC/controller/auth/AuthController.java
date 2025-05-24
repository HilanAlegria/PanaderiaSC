package com.example.API_Panaderia.SC.controller.auth;

import com.example.API_Panaderia.SC.model.Usuario;
import com.example.API_Panaderia.SC.repository.UsuarioRepository;
import com.example.API_Panaderia.SC.security.JwtUtils;
import com.example.API_Panaderia.SC.security.UserDetailsImpl;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "https://hilanalegria.github.io/PanaderiaSC/")
@RequiredArgsConstructor
public class AuthController {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody RegistroRequest registroRequest) {
        if (usuarioRepository.findByUsername(registroRequest.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body("Error: El nombre de usuario ya está en uso!");
        }

        if (usuarioRepository.findByEmail(registroRequest.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Error: El email ya está registrado!");
        }

        Usuario nuevoUsuario = new Usuario();
        nuevoUsuario.setUsername(registroRequest.getUsername());
        nuevoUsuario.setEmail(registroRequest.getEmail());
        nuevoUsuario.setPassword(passwordEncoder.encode(registroRequest.getPassword()));
        nuevoUsuario.setRoles(List.of("ROLE_USER")); // Rol por defecto

        usuarioRepository.save(nuevoUsuario);
        
        return ResponseEntity.status(HttpStatus.CREATED)
            .body("¡Usuario registrado exitosamente!");
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    loginRequest.getUsername(),
                    loginRequest.getPassword()
                )
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = jwtUtils.generateJwtToken(authentication);
            
            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
            List<String> roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

            return ResponseEntity.ok(new JwtResponse(
                jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getEmail(),
                roles
            ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body("Error: Credenciales inválidas");
        }
    }
}