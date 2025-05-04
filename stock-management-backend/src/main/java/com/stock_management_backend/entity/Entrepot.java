package com.stock_management_backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.antlr.v4.runtime.misc.NotNull;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Entrepot {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String nom;

    @Column(unique = true)
    private String code;

    private String adresse;

    @OneToMany(mappedBy = "entrepot", cascade = CascadeType.ALL)
    private List<Reception> receptions = new ArrayList<>();



    @OneToMany(mappedBy = "source", cascade = CascadeType.ALL)
    private List<Transfert> transfertsSource = new ArrayList<>();

    @OneToMany(mappedBy = "destination", cascade = CascadeType.ALL)
    private List<Transfert> transfertsDestination = new ArrayList<>();
}