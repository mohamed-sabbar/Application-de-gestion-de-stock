package com.stock_management_backend.controller;

import com.stock_management_backend.entity.Transfert;
import com.stock_management_backend.service.TransfertService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/transferts")
public class TransfertController {

    private final TransfertService transfertService;

    public TransfertController(TransfertService transfertService) {
        this.transfertService = transfertService;
    }

    // Créer un nouveau transfert
    @PostMapping
    public ResponseEntity<Transfert> createTransfert(@RequestBody Transfert transfert) {
        Transfert newTransfert = transfertService.createTransfert(transfert);
        return new ResponseEntity<>(newTransfert, HttpStatus.CREATED);
    }

    // Récupérer tous les transferts
    @GetMapping
    public ResponseEntity<List<Transfert>> getAllTransferts() {
        List<Transfert> transferts = transfertService.getAllTransferts();
        return ResponseEntity.ok(transferts);
    }

    // Recherche de transferts avec filtres
    @GetMapping("/search")
    public ResponseEntity<List<Transfert>> searchTransferts(
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dateDebut,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dateFin,
            @RequestParam(required = false) Long entrepotId) {

        List<Transfert> transferts = transfertService.searchTransferts(dateDebut, dateFin, entrepotId);
        return ResponseEntity.ok(transferts);
    }


    // Mettre à jour un transfert
    @PutMapping("/{id}")
    public ResponseEntity<Transfert> updateTransfert(
            @PathVariable Long id,
            @RequestBody Transfert transfertDetails) {

        Transfert updatedTransfert = transfertService.updateTransfert(id, transfertDetails);
        return ResponseEntity.ok(updatedTransfert);
    }

    // Supprimer un transfert
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTransfert(@PathVariable Long id) {
        transfertService.deleteTransfert(id);
        return ResponseEntity.noContent().build();
    }
}