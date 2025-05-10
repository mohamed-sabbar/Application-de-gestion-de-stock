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
public class CommandeAchat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate date;
    private String fournisseur;
    private String statut;
    @Column(unique = true)
    private String num_achat;

    @OneToMany(mappedBy = "commandeAchat", cascade = CascadeType.ALL)
    private List<Reception> receptions = new ArrayList<>();

}