package com.stock_management_backend.security;


import com.stock_management_backend.entity.User;
import com.stock_management_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.*;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    // Cette méthode est utilisée par Spring Security pour charger un utilisateur
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Utilisateur non trouvé"));

        // Convertir le rôle (ex: ADMIN) en autorité Spring Security
        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getMotDePasse()
                , // Remplace "password" par user.getPassword() si tu as l'attribut
                Collections.singleton(new SimpleGrantedAuthority("ROLE_" + user.getRole()))
        );
    }
}

