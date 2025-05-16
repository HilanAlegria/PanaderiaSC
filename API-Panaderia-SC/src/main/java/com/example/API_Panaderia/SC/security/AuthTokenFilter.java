package com.example.API_Panaderia.SC.security;

import java.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class AuthTokenFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtils jwtUtils; // Tu clase JwtUtils

    @Autowired
    private UserDetailsServiceImpl userDetailsService; // Tu UserDetailsServiceImpl

    private static final Logger authLogger = LoggerFactory.getLogger(AuthTokenFilter.class);

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        try {
            String jwt = parseJwt(request); // Extrae el token
            if (jwt != null && jwtUtils.validateJwtToken(jwt)) { // Valida el token
                String username = jwtUtils.getUserNameFromJwtToken(jwt); // Obtiene el username del token

                // Carga los detalles del usuario
                UserDetails userDetails = userDetailsService.loadUserByUsername(username);
                // Crea un objeto de autenticación
                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(
                                userDetails,
                                null, // La contraseña no se guarda en el token JWT
                                userDetails.getAuthorities());
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                // Establece la autenticación en el contexto de seguridad
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        } catch (Exception e) {
            authLogger.error("No se pudo establecer la autenticación del usuario: {}", e.getMessage());
        }

        filterChain.doFilter(request, response); // Pasa la solicitud al siguiente filtro
    }

    private String parseJwt(HttpServletRequest request) {
        String headerAuth = request.getHeader("Authorization");

        if (StringUtils.hasText(headerAuth) && headerAuth.startsWith("Bearer ")) {
            return headerAuth.substring(7); // Extrae el token después de "Bearer "
        }
        return null;
    }
}