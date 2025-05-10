package com.stock_management_backend.dto;

import com.stock_management_backend.entity.Reception;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
@Data
@Getter
@Setter

@NoArgsConstructor
public class CommandeAchatDto {


    private String num_achat;
    private String fournisseur;
    private String statut;
    public CommandeAchatDto(String num_achat,String fournisseur,String statut){
        this.num_achat=num_achat;
        this.fournisseur=fournisseur;
        this.statut=statut;
    }


}
