package com.example.API_Panaderia.SC.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity; // Para seguridad a nivel de método
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity // Habilita la seguridad web de Spring Security
@EnableMethodSecurity // Habilita seguridad a nivel de método (ej. @PreAuthorize)
public class SecurityConfig {

    @Autowired
    UserDetailsServiceImpl userDetailsService; // Tu servicio de detalles de usuario

    @Autowired
    private AuthEntryPointJwt unauthorizedHandler; // Tu manejador de no autorizado

    @Autowired
    private JwtUtils jwtUtils;

    // Bean para el filtro JWT
    @Bean
    public AuthTokenFilter authenticationJwtTokenFilter() {
        return new AuthTokenFilter(jwtUtils, userDetailsService);
    }

    // Bean para el codificador de contraseñas (BCrypt)
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // Proveedor de autenticación (usa tu UserDetailsService y PasswordEncoder)
    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    // Administrador de autenticación (necesario para el login)
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }

    // Cadena de filtros de seguridad HTTP
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable()) // Deshabilita CSRF para APIs REST
            .exceptionHandling(exception -> exception.authenticationEntryPoint(unauthorizedHandler)) // Maneja errores de autenticación
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // No usa sesiones de estado para JWT
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**").permitAll() // Permite acceso público a rutas de autenticación (registro, login)
                .requestMatchers("/api/test/**").permitAll() // Opcional: si tienes rutas de prueba públicas
                .anyRequest().authenticated() // Todas las demás rutas requieren autenticación
//                            .anyRequest().permitAll()
            );

        http.authenticationProvider(authenticationProvider()); // Usa tu proveedor de autenticación

        // Añade el filtro JWT antes del filtro de autenticación de usuario/contraseña
        http.addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}