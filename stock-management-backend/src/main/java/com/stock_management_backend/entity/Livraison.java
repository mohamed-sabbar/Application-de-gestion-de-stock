package com.stock_management_backend.entity;
import com.fasterxml.jackson.annotation.JsonIgnore;
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
public class Livraison {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate date;
    private int quantite;
    private String remarque;

    // Relations
    @ManyToOne
    @JoinColumn(name = "entrepot_id")
    private Entrepot entrepot;

    @ManyToOne
    @JoinColumn(name = "commande_client_id", nullable = true)  // 0..1
    private CommandeClient commandeClient;

    @ManyToOne
    @JoinColumn(name = "produit_id", nullable = false) //oir
    private Produit produit;

}