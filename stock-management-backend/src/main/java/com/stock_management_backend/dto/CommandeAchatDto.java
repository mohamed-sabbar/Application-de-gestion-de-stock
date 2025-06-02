package com.stock_management_backend.dto;

import com.stock_management_backend.entity.Produit;
import com.stock_management_backend.entity.Reception;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CommandeAchatDto {

    private LocalDate date;
    private String num_achat;
    private String fournisseur;

    private int quantite;
    private  produitDto produitDto;
    public CommandeAchatDto(LocalDate date,String num_achat,String fournisseur,String Nom,String Unite,int qunatite  ){
        this.date=date;
        this.num_achat=num_achat;
        this.fournisseur=fournisseur;

        this.quantite=qunatite;
        this.produitDto=new produitDto(Nom,Unite);
    }
    public CommandeAchatDto(String num_achat,String fournisseur,String Nom,String Unite,int qunatite  ){

        this.num_achat=num_achat;
        this.fournisseur=fournisseur;

        this.quantite=qunatite;
        this.produitDto=new produitDto(Nom,Unite);
    }



}
