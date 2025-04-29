package com.stock_management_backend.configuration;

import com.stock_management_backend.entity.User;
import com.stock_management_backend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AdminInitializer {

    @Bean
    CommandLineRunner initAdmin(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            // Vérifie si l'admin existe déjà par email
            String adminEmail = "admin@example.com";
            if (userRepository.findByEmail(adminEmail).isEmpty()) {
                User admin = new User();
                admin.setEmail(adminEmail); // Utilise l'email
                admin.setMotDePasse(passwordEncoder.encode("admin123")); // Mot de passe chiffré
                admin.setRole("ADMIN"); // Assigne le rôle ADMIN
                userRepository.save(admin); // Sauvegarde l'admin
                System.out.println("✅ Admin créé avec succès : " + adminEmail + "/admin123");
            } else {
                System.out.println("ℹ️ L'administrateur existe déjà avec cet email");
            }
        };
    }
}
