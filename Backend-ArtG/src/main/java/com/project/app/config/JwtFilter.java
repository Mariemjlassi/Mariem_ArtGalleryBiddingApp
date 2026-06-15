package com.project.app.config;

import com.project.app.service.AuthService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.ArrayList;

@Component

public class JwtFilter extends OncePerRequestFilter {

	private final AuthService authService;

    // Utilisation de @Lazy pour casser la boucle SecurityConfig -> JwtFilter -> AuthService
    public JwtFilter(@Lazy AuthService authService) {
        this.authService = authService;
    }
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            try {
                
                String email = Jwts.parserBuilder()
                        .setSigningKey(authService.getKey()) 
                        .build()
                        .parseClaimsJws(token)
                        .getBody()
                        .getSubject();

                if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                    
                    UsernamePasswordAuthenticationToken authToken = 
                            new UsernamePasswordAuthenticationToken(email, null, new ArrayList<>());
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                }
            } catch (Exception e) {
                
            }
        }
        filterChain.doFilter(request, response);
    }
}