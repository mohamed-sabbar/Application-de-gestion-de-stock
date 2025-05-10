package com.stock_management_backend.mapper;

import com.stock_management_backend.dto.CommandeAchatDto;
import com.stock_management_backend.dto.EntrepotDto;
import com.stock_management_backend.dto.ReceptionDto;
import com.stock_management_backend.dto.produitDto;
import com.stock_management_backend.entity.CommandeAchat;
import com.stock_management_backend.entity.Produit;
import com.stock_management_backend.entity.Reception;
import org.springframework.stereotype.Component;

@Component
public class Mapper {
    public ReceptionDto receptionDto(Reception reception){
        produitDto produitDto=new produitDto(
                reception.getProduit().getNom(),
                reception.getProduit().getUnite()
        );
        EntrepotDto entrepotDto=new EntrepotDto(
                reception.getEntrepot().getNom()
        );

        CommandeAchatDto commandeAchatDto = new CommandeAchatDto(
                reception.getCommandeAchat().getNum_achat(),
                reception.getCommandeAchat().getFournisseur(),
                reception.getCommandeAchat().getStatut()
        );
        return new ReceptionDto(
                reception.getDate(),
                reception.getQuantite(),
                entrepotDto,
                produitDto,
                commandeAchatDto);



    }
    public produitDto produitDto(Produit produit){
        return new produitDto(produit.getNom());
    }
}
