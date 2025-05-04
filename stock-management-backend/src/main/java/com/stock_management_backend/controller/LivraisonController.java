package com.stock_management_backend.controller;


import com.stock_management_backend.entity.Entrepot;
import com.stock_management_backend.entity.Livraison;
import com.stock_management_backend.service.LivraisonService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/livraisons")
public class LivraisonController {

    private final LivraisonService livraisonService;

    public LivraisonController(LivraisonService livraisonService) {
        this.livraisonService = livraisonService;
    }

    // Nouveau endpoint de recherche
    @GetMapping("/search")
    public ResponseEntity<List<Livraison>> searchLivraisons(
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate,
            @RequestParam(required = false) String productName,
            @RequestParam(required = false) String depotName) {

        return ResponseEntity.ok(
                livraisonService.searchLivraisons(startDate, endDate, productName, depotName)
        );
    }
    @GetMapping
    public List<Livraison> getAllLivraisons() {
        return livraisonService.getAllLivraisons();
    }

    @GetMapping("/{id}")
    public Optional<Livraison> getLivraisonById(@PathVariable Long id) {
        return livraisonService.getLivraisonById(id);
    }

    @PostMapping
    public Livraison createLivraison(@RequestBody Livraison livraison) {
        return livraisonService.createLivraison(livraison);
    }

    @PutMapping("/{id}")
    public Livraison updateLivraison(@PathVariable Long id, @RequestBody Livraison livraison) {
        livraison.setId(id);
        return livraisonService.saveLivraison(livraison);
    }

    @DeleteMapping("/{id}")
    public void deleteLivraison(@PathVariable Long id) {
        livraisonService.deleteLivraison(id);
    }
}



