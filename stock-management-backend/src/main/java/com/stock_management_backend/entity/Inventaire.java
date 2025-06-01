package com.stock_management_backend.entity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Inventaire {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDate date;


    private String effectueur;
    private String Validateur="Admin";
    @Lob
    @Column(name = "fichier_excel", columnDefinition = "LONGBLOB")
    private byte[] fichierExcel;
    @OneToOne
    @JoinColumn(name="stock_id")
    private  Stock stock;






}

