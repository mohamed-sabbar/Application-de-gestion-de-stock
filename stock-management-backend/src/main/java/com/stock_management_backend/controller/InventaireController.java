package com.stock_management_backend.controller;

import com.stock_management_backend.dto.InventaireDto;
import com.stock_management_backend.service.impl.InventaireServiceImpl;
import io.jsonwebtoken.io.IOException;
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
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/Inventaire")

public class InventaireController {
    @Autowired
    private InventaireServiceImpl inventaireService;
    @GetMapping("/getInventaire")
    public List<InventaireDto> GetInventaires(@RequestParam("date")LocalDate date, @RequestParam("nom") String nom){
        return inventaireService.DisplayIventaire(date,nom);

    }
    @GetMapping("/getAllInventaires")
    public List<InventaireDto> getAllInventaires(){
        return inventaireService.DisplayAllIventaire();

    }
    @GetMapping(value = "/newInventaire", produces = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
    public ResponseEntity<InputStreamResource> newInventaire(@RequestParam("date") LocalDate date,
                                                             @RequestParam("nom") String nom) {

        ByteArrayInputStream excelFile = inventaireService.generateInventaireExcel(date, nom);

        try {
            // Si fichier inexistant ou vide
            if (excelFile == null || excelFile.available() == 0) {
                return ResponseEntity.notFound().build();
            }
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=inventaire_" + date + ".xlsx")
                .contentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
                .body(new InputStreamResource(excelFile));
    }
    @PostMapping("/upload")
    public Map<String, Object> uploadfile(@RequestParam("fichierExcel") MultipartFile fichierExcel) throws IOException {
        Map<String, Object> response = new HashMap<>();
        response.put("nomFichier", fichierExcel.getOriginalFilename());
        response.put("tailleKo", fichierExcel.getSize() / 1024);
        response.put("type", fichierExcel.getContentType());
        // response.put("contenu", new String(fichierExcel.getBytes())); // seulement si c'est du texte
        return response;
    }
    @PostMapping("/save")
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
