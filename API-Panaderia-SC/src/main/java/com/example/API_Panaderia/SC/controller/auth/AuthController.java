package com.example.API_Panaderia.SC.controller.auth;

import com.example.API_Panaderia.SC.model.Usuario;
import com.example.API_Panaderia.SC.repository.UsuarioRepository;
import com.example.API_Panaderia.SC.security.JwtUtils;
import com.example.API_Panaderia.SC.security.UserDetailsImpl;
import com.example.API_Panaderia.SC.security.UserDetailsServiceImpl;
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
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*") // Permitir solicitudes desde cualquier origen
@RequiredArgsConstructor
public class AuthController {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;
    private final UserDetailsServiceImpl userDetailsServiceImpl;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody RegistroRequest registroRequest) {
        if (usuarioRepository.findByUsername(registroRequest.getUsername())  != null) {
            return ResponseEntity.badRequest().body("Error: El nombree d usuario ya está en uso!");
        }

        if (usuarioRepository.findByEmail(registroRequest.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Error: El email ya está registrado!");
        }

        Usuario nuevoUsuario = new Usuario();
        nuevoUsuario.setUsername(registroRequest.getUsername());
        nuevoUsuario.setEmail(registroRequest.getEmail());
        nuevoUsuario.setPassword(passwordEncoder.encode(registroRequest.getPassword()));
//        nuevoUsuario.setRoles(List.of("ROLE_USER")); // Rol por defecto

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
            System.out.println("Autenticación exitosa para el usuario: " + authentication.getName());

           // SecurityContextHolder.getContext().setAuthentication(authentication);
//           String jwt = jwtUtils.generateJwtToken(authentication);
            
            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
            Usuario usuario = userDetails.getUsuario();
//            System.out.println("Usuario autenticado: " + usuario.getUsername());
//            List<String> roles = userDetails.getAuthorities().stream()
//                .map(GrantedAuthority::getAuthority)
//                .collect(Collectors.toList());
            return ResponseEntity.ok(Map.of(
//                "token", jwt,
                "username", usuario.getUsername(),
                "email", usuario.getEmail(),
                "id", usuario.getId()
                // "roles", roles // Si decides usar roles en el futuro
            ));

        } catch (Exception e) {
            System.out.println("Error de autenticación: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body("Error: Credenciales inválidas");
        }
    }
}