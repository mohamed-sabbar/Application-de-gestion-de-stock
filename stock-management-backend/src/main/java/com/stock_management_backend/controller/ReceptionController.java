package com.stock_management_backend.controller;

import com.stock_management_backend.dto.CommandeAchatDto;
import com.stock_management_backend.dto.ReceptionDto;
import com.stock_management_backend.entity.CommandeAchat;
import com.stock_management_backend.entity.Reception;
import com.stock_management_backend.service.CommandeAchatService;
import com.stock_management_backend.service.ReceptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;


@RestController
@RequestMapping("/api/receptions")
public class ReceptionController {
    @Autowired
    private ReceptionService receptionService;
    @Autowired
    private CommandeAchatService commandeAchatService;
    @GetMapping("ShowAllReceptions")
    public List<ReceptionDto> ShowAllReceptions(){
        return receptionService.gettAllReception();
    }

    @PostMapping("/create")
    public Reception CrerateReception(@RequestBody ReceptionDto reception,@RequestParam("entrepot") String  entrepot){
        return receptionService.createReception(reception,entrepot);

    }
    @DeleteMapping("/delete/{num_achat}")
    public void  DeleteReception(@PathVariable String num_achat){
           receptionService.deleteReception(num_achat);
    }
    @PostMapping("/search")
    public List<ReceptionDto> SearchReceptions(@RequestParam LocalDate dateStart,
                                            @RequestParam LocalDate dateEnd,
                                            @RequestParam String produitName,
                                            @RequestParam String entrepotName){
        return receptionService.searchRecepetion(dateStart,dateEnd,produitName,entrepotName);
    }
    @PutMapping("/update/{num_achat}")
    public void updateReception(@PathVariable String num_achat, @RequestBody ReceptionDto reception){
        receptionService.updateReception(num_achat, reception);
    }
    @GetMapping("test")
    public List<CommandeAchatDto> getCommandeAchat(){
        return commandeAchatService.getCommandeAchat();
    }
    @PostMapping("/createRecepetionIndependante")
    public void createRecepetionIndependante(@RequestParam("date") LocalDate date,@RequestParam("quantite") int quantite,@RequestParam("produit") String produit,@RequestParam("entrepotname") String entrepotname,@RequestParam("fornisseur") String fornisseur){
        receptionService.createReceptionIndependante(date, quantite, produit, entrepotname, fornisseur);
    }


}
