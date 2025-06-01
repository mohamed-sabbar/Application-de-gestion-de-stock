package com.stock_management_backend.controller;

import com.stock_management_backend.entity.Transfert;
import com.stock_management_backend.service.TransfertService;
import org.springframework.format.annotation.DateTimeFormat;
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

    // Endpoint pour tous les transferts
    @GetMapping
    public ResponseEntity<List<Transfert>> getAllTransferts() {
        List<Transfert> transferts = transfertService.getAllTransferts();
        return ResponseEntity.ok(transferts);
    }

    // Endpoint pour la recherche
    @GetMapping("/search")
    public ResponseEntity<List<Transfert>> searchTransferts(
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dateDebut,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dateFin,
            @RequestParam(required = false) Long entrepotId) {

        List<Transfert> transferts = transfertService.searchTransferts(dateDebut, dateFin, entrepotId);
        return ResponseEntity.ok(transferts);
    }

    // Autres méthodes POST, PUT, DELETE...
}