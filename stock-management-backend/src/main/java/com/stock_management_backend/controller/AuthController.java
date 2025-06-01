package com.stock_management_backend.controller;

import com.stock_management_backend.entity.AuthResponse;
import com.stock_management_backend.entity.LoginRequest;
import com.stock_management_backend.entity.SignupRequest;
import com.stock_management_backend.entity.User;
import com.stock_management_backend.repository.UserRepository;
import com.stock_management_backend.security.JwtUtil;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder; // Importer le BCryptPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepository; // Injection du repository

    @Autowired
    private PasswordEncoder passwordEncoder; // Injection du PasswordEncoder

    // Login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getMotDePasse())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtUtil.generateToken(request.getEmail());

        return ResponseEntity.ok(new AuthResponse(token));
    }

    // Signup
    @PostMapping("/signup")
    public ResponseEntity<?> register(@RequestBody SignupRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            return ResponseEntity.badRequest().body("Email déjà utilisé");
        }

        User user = new User();
        user.setNom(request.getNom());
        user.setEmail(request.getEmail());
        user.setRole(request.getRole());
        user.setMotDePasse(passwordEncoder.encode(request.getMotDePasse())); // Utilisation du passwordEncoder

        userRepository.save(user);
        return ResponseEntity.ok("Utilisateur créé");
    }

    @GetMapping("/validate")
    public ResponseEntity<?> validateToken(HttpServletRequest request) {
        String token = request.getHeader("Authorization");

        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7);
            try {
                String email = jwtUtil.getUsernameFromToken(token);
                User user = userRepository.findByEmail(email)
                        .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

                // Créez un objet contenant le statut et le nom
                Map<String, String> response = new HashMap<>();
                response.put("status", "valid");
                response.put("nom", user.getNom());
                System.out.println(user.getNom());


                return ResponseEntity.ok(response);
            } catch (Exception e) {
                // Token invalide ou expiré
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }



    @GetMapping("/user-info")
    public ResponseEntity<?> getUserInfo(HttpServletRequest request) {
        String token = request.getHeader("Authorization");

        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7);
            try {
                String email = jwtUtil.getUsernameFromToken(token);
                User user = userRepository.findByEmail(email)
                        .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

                // Renvoyer le nom de l'utilisateur
                return ResponseEntity.ok(Collections.singletonMap("nom", user.getNom()));
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }



}
