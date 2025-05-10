package com.stock_management_backend.dto;

import com.stock_management_backend.entity.CommandeAchat;
import com.stock_management_backend.entity.Entrepot;
import com.stock_management_backend.entity.Produit;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ReceptionDto {

    private LocalDate date;
    private int quantite;
    private EntrepotDto entrepot;
    private produitDto produit;
    private CommandeAchatDto commandeAchat;



}
