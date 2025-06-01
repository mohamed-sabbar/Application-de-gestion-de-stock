package com.stock_management_backend.controller;

import com.stock_management_backend.dto.InventaireDto;
import com.stock_management_backend.service.impl.InventaireServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/test")

public class InventaireController {
    @Autowired
    private InventaireServiceImpl inventaireService;
    @GetMapping("/getInventaire")
    public List<InventaireDto> GetInventaires(@RequestParam("date")LocalDate date, @RequestParam("nom") String nom){
        return inventaireService.DisplayAllIventaire(date,nom);

    }
    @GetMapping(value = "/newInventaire", produces = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
    public ResponseEntity<InputStreamResource> newInventaire(@RequestParam("date") LocalDate date,
                                                             @RequestParam("nom") String nom) {

        ByteArrayInputStream excelFile = inventaireService.generateInventaireExcel(date, nom);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=inventaire_" + date + ".xlsx")
                .contentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
                .body(new InputStreamResource(excelFile));
    }
    @PostMapping("/upload")
    public ResponseEntity<String> uploadInventaireExcel(@RequestParam("fichierExcel") MultipartFile fichierExcel,
                                                        @RequestParam("entrepotName") String entrepotName,
                                                        @RequestParam("effectueur") String effectueur,
                                                        @RequestParam(defaultValue = "Admin") String validateur){


        try{
            inventaireService.saveInventaireFromExcel(fichierExcel,entrepotName,effectueur);
            return ResponseEntity.ok("Inventaire enregistré et stock mis à jour avec succès.");


        }catch (RuntimeException e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erreur : " + e.getMessage());
        }

    }



}
