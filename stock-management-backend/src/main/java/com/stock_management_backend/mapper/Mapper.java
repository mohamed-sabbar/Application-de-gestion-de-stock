package com.stock_management_backend.mapper;

import com.stock_management_backend.dto.*;
import com.stock_management_backend.entity.*;
import com.stock_management_backend.repository.CommandeAchatRepository;
import com.stock_management_backend.repository.EntrepotRepository;
import com.stock_management_backend.repository.ProduitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
public class Mapper {
    @Autowired
    private ProduitRepository produitRepository;
    @Autowired
    private EntrepotRepository entrepotRepository;
    @Autowired
    private CommandeAchatRepository commandeAchatRepository;
    public ReceptionDto receptionDto(Reception reception) {
        produitDto produitDto = new produitDto(
                reception.getProduit().getNom(),
                reception.getProduit().getUnite()
        );

        EntrepotDto entrepotDto = new EntrepotDto(
                reception.getEntrepot().getNom()
        );

        CommandeAchatDto commandeAchatDto = null;
        if (reception.getCommandeAchat() != null) {
            commandeAchatDto = new CommandeAchatDto(
                    reception.getCommandeAchat().getNum_achat(),
                    reception.getCommandeAchat().getFournisseur(),
                    produitDto.getNom(),
                    produitDto.getUnite(),
                    reception.getCommandeAchat().getQuantite()
            );
        }

        return new ReceptionDto(
                reception.getDate(),
                reception.getRemarque(),
                entrepotDto,
                commandeAchatDto
        );
    }
    public CommandeAchatDto commandeAchatDto(CommandeAchat commandeAchat)
    {
        return  new CommandeAchatDto(
                commandeAchat.getDate(),
                commandeAchat.getNum_achat(),
                commandeAchat.getFournisseur(),

                commandeAchat.getProduit().getNom(),
                commandeAchat.getProduit().getUnite(),

                commandeAchat.getQuantite()
        );

    }

    public CommandeAchat commandeAchat(CommandeAchatDto commandeAchatDto){
        Produit produit=produitRepository.findByNom(commandeAchatDto.getProduitDto().getNom());
           return new CommandeAchat(
             commandeAchatDto.getDate(),
                   commandeAchatDto.getFournisseur(),
                   commandeAchatDto.getNum_achat(),
                   commandeAchatDto.getQuantite(),
                   produit
           );

    }
    public Reception reception(ReceptionDto receptionDto,String entrpot){
        Produit produit=produitRepository.findByNom(receptionDto.getCommandeAchat().getProduitDto().getNom());
        Entrepot entrepot=entrepotRepository.findByNom(entrpot);
        CommandeAchat commandeAchat=commandeAchatRepository.findBynum_achat(receptionDto.getCommandeAchat().getNum_achat());
        System.out.println(commandeAchat);
        LocalDate date=receptionDto.getDate();
        String remarque=receptionDto.getRemarque();
        return new Reception(
                date,
                remarque,
                entrepot,
                commandeAchat,
                produit

        );





    }
    public produitDto produitDto(Produit produit){
        return  new produitDto(produit.getNom(),produit.getUnite());
    }
    public InventaireDto inventaireDto(Inventaire inventaire){
        LocalDate date=inventaire.getDate();
        StockDto stockDto=stockDto(inventaire.getStock());
        String effectueur=inventaire.getEffectueur();
        String validateur=inventaire.getValidateur();
        byte[] fichier_excel=inventaire.getFichierExcel();
        return new InventaireDto(date,effectueur,validateur,stockDto,fichier_excel);

    }
    public StockDto stockDto(Stock stock){
        EntrepotDto entrepotDto=new EntrepotDto(stock.getEntrepot().getNom());
        produitDto produitDto=produitDto(stock.getProduit());
        return new StockDto(produitDto,entrepotDto,stock.getQuantite());
    }
}
