package com.example.API_Panaderia.SC.security;

// Update the import below to the correct package where Usuario.java is located
import com.example.API_Panaderia.SC.model.Usuario; // Ajusta esto si tu modelo está en otro paquete
// Ajusta el paquete según la ubicación real de UsuarioRepository:
import com.example.API_Panaderia.SC.repository.UsuarioRepository; // Tu repositorio de Usuario
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList; // Para roles, si no usas los de Spring Security

@Service // Esto lo registra como un bean de servicio
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    UsuarioRepository usuarioRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Usuario usuario = usuarioRepository.findByUsername(username);
        if (usuario == null) {
            throw new UsernameNotFoundException("Usuario no encontrado: " + username);
        }
        return new UserDetailsImpl(usuario);
    }

}