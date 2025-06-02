package com.stock_management_backend.entity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.antlr.v4.runtime.misc.NotNull;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor

public class CommandeAchat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate date;
    private String fournisseur;

    @Column(unique = true)
    private String num_achat;

    private int quantite;

    @ManyToOne
    @JoinColumn(name = "produit_id")
    private Produit produit;
    @OneToMany(mappedBy = "commandeAchat", cascade = CascadeType.ALL)
    private List<Reception> receptions = new ArrayList<>();

    public CommandeAchat(LocalDate date, String fournisseur, String numAchat, int quantite, Produit produit) {
        this.date=date;
        this.fournisseur=fournisseur;
        this.num_achat=numAchat;
        this.quantite=quantite;
        this.produit=produit;

    }
    public CommandeAchat( String fournisseur, String numAchat, int quantite, Produit produit) {

        this.fournisseur=fournisseur;
        this.num_achat=numAchat;
        this.quantite=quantite;
        this.produit=produit;

    }
}