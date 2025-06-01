package com.stock_management_backend.entity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.antlr.v4.runtime.misc.NotNull;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor

public class Reception {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate date;

    private String Remarque;

    @ManyToOne
    @JoinColumn(name = "entrepot_id")
    private Entrepot entrepot;



    @ManyToOne
    @JoinColumn(name = "commande_achat_id", nullable = true)  // 0..1
    private CommandeAchat commandeAchat;
    @ManyToOne
    @JoinColumn(name = "produit_id")
    private Produit produit;

    public Reception(LocalDate date, String Remarque, Entrepot entrepot, CommandeAchat commandeAchat, Produit produit) {
   this.date=date;
   this.Remarque=Remarque;
   this.entrepot=entrepot;
   this.commandeAchat=commandeAchat;
   this.produit=produit;

    }
}