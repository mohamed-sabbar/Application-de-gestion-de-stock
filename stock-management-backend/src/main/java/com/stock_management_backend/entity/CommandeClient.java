package com.stock_management_backend.entity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.antlr.v4.runtime.misc.NotNull;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommandeClient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate date;
    private String client;
    private String statut;
    private String reference; // N° doc vente

    private Integer quantite;



    @ManyToOne
    @JoinColumn(name = "produit_id")
    private Produit produit; // <-- Ajout de la relation


    private boolean livree = false; // Nouveau champ
}