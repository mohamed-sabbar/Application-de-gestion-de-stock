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
    @Column(unique = true)
    private String nom;


    @Column(unique = true)
    private String code;

    private String adresse;
    @JsonIgnore
    @OneToMany(mappedBy = "entrepot", cascade = CascadeType.ALL, orphanRemoval = true)

    List<Stock> stocks=new ArrayList<>();
    @OneToMany(mappedBy = "entrepot", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Reception> receptions = new ArrayList<>();
    @OneToMany(mappedBy = "entrepot", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Livraison> livraisons = new ArrayList<>();


}