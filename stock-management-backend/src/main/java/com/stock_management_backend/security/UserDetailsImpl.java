package com.stock_management_backend.security;


import com.stock_management_backend.entity.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

public class UserDetailsImpl implements UserDetails {

    private final User user;

    public UserDetailsImpl(User user) {
        this.user = user;
    }

    // Définir les rôles (autorités)
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_" + user.getRole()));
    }

    // Retourne le mot de passe de l'utilisateur
    @Override
    public String getPassword() {
        return user.getMotDePasse(); // Assure-toi que ce champ existe dans User
    }

    // Utilisé comme identifiant (ici l'email)
    @Override
    public String getUsername() {
        return user.getEmail();
    }

    // Les méthodes suivantes retournent `true` si tu n'as pas besoin de restrictions supplémentaires
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    // Accès à l'utilisateur original si nécessaire
    public User getUser() {
        return user;
    }

    public String name() {
        return user.getNom();
    }
}
