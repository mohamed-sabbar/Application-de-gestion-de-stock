package com.stock_management_backend.controller;

import com.stock_management_backend.dto.CommandeAchatDto;
import com.stock_management_backend.service.CommandeAchatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/CommmandeAchats")
public class CommandeAchatController {
    @Autowired
    private CommandeAchatService commandeAchatService;
    @GetMapping("DisplayCommandesAchat")
    public List<CommandeAchatDto> GetCommandes(){
        return commandeAchatService.getCommandeAchat();
    }
    @PostMapping("SearchCommandesAchat")
    public List<CommandeAchatDto> SearchCommandes(@RequestParam String num_achat,@RequestParam String Nom_produit){
        return commandeAchatService.Search_Commande(num_achat,Nom_produit);

    }

}
