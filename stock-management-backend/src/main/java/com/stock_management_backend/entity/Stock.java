package com.stock_management_backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Stock", uniqueConstraints = @UniqueConstraint(columnNames = {"produit_id", "entrepot_id"}))

public class Stock {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    @ManyToOne
    @JoinColumn(name = "produit_id")
    private Produit produit;
    @ManyToOne
    @JoinColumn(name = "entrepot_id")
    private Entrepot entrepot;
    private int quantite ;
    @OneToOne(mappedBy = "stock")
    private Inventaire inventaire;



}
