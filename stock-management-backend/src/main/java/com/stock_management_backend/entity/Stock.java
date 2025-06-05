package com.stock_management_backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

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
    @ToString.Exclude
    private Produit produit;
    @ManyToOne
    @JoinColumn(name = "entrepot_id")
    private Entrepot entrepot;
    private int quantite ;



}
