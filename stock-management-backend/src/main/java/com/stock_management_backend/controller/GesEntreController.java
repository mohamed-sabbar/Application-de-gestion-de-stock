package com.stock_management_backend.controller;

import com.stock_management_backend.entity.Entrepot;
import com.stock_management_backend.service.EntrepotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")

@CrossOrigin("*")
public class GesEntreController {

    @Autowired
    private EntrepotService entrepotService;

    @GetMapping("/DisplayAllEntrepots")
    public List<Entrepot> displayAllEntrepots() {
        return entrepotService.getAllEntrepot();
    }

    @PostMapping("/create")
    public Entrepot createEntrepot(@RequestBody Entrepot entrepot) {
        return entrepotService.createEntrepot(entrepot);
    }

    @PutMapping("/update/{id}")
    public Entrepot updateEntrepot(@PathVariable Long id, @RequestBody Entrepot entrepot) {
        return entrepotService.updateEntrepot(id, entrepot);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteEntrepot(@PathVariable Long id) {
        entrepotService.deleteEntrepot(id);
    }
}
