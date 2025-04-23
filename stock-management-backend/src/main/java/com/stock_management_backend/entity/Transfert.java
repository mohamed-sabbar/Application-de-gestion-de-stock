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
public class Transfert {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate date;
    private int quantite;

    @ManyToOne
    @JoinColumn(name = "source_id")
    private Entrepot source;

    @ManyToOne
    @JoinColumn(name = "destination_id")
    private Entrepot destination;

    @ManyToOne
    @JoinColumn(name = "produit_id")
    private Produit produit;
}