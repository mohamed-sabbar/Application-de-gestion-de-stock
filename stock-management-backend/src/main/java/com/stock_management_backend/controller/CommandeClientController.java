package com.stock_management_backend.controller;

import com.stock_management_backend.entity.CommandeClient;
import com.stock_management_backend.entity.Produit;
import com.stock_management_backend.repository.CommandeClientRepository;
import com.stock_management_backend.service.CommandeClientService;
import com.stock_management_backend.service.ProduitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/commandes-clients")
@CrossOrigin(origins = "http://localhost:3000")
public class CommandeClientController {
    @Autowired
    private CommandeClientRepository commandeClientRepository;

    private final CommandeClientService commandeClientService;
    private final ProduitService produitService;

    @Autowired
    public CommandeClientController(CommandeClientService commandeClientService, ProduitService produitService) {
        this.commandeClientService = commandeClientService;
        this.produitService = produitService;
    }

    // ✅ Récupérer toutes les commandes
    @GetMapping
    public List<CommandeClient> getAllCommandeClients() {
        return commandeClientService.getAllCommandeClientsWithProduit();
    }

    // ✅ Récupérer une commande par ID
    @GetMapping("/{id}")
    public CommandeClient getCommandeClientById(@PathVariable Long id) {
        return commandeClientService.getCommandeClientById(id)
                .orElseThrow(() -> new RuntimeException("Commande non trouvée avec l'id : " + id));
    }

    // ✅ Créer une nouvelle commande client
    @PostMapping
    public CommandeClient createCommandeClient(@RequestBody CommandeClient commandeClient) {
        validateProduit(commandeClient);
        return commandeClientService.saveCommandeClient(commandeClient);
    }

    // ✅ Mettre à jour une commande
    @PutMapping("/{id}")
    public CommandeClient updateCommandeClient(@PathVariable Long id, @RequestBody CommandeClient updatedCommande) {
        CommandeClient existingCommande = commandeClientService.getCommandeClientById(id)
                .orElseThrow(() -> new RuntimeException("Commande non trouvée"));

        validateLivraisonStatus(existingCommande, updatedCommande);
        updateCommandeFields(existingCommande, updatedCommande);

        return commandeClientService.saveCommandeClient(existingCommande);
    }

    // ✅ Supprimer une commande
    @DeleteMapping("/{id}")
    public void deleteCommandeClient(@PathVariable Long id) {
        commandeClientService.deleteCommandeClient(id);
    }

    // ✅ Récupérer les commandes disponibles
    @GetMapping("/disponibles")
    public List<CommandeClient> getCommandesDisponibles() {
        return commandeClientService.getCommandesDisponibles();
    }

    //=== Méthodes utilitaires ===//
    private void validateProduit(CommandeClient commandeClient) {
        if (commandeClient.getProduit() == null || commandeClient.getProduit().getId() == null) {
            throw new RuntimeException("Le produit doit être spécifié");
        }

        Long produitId = commandeClient.getProduit().getId();
        produitService.getProduitById(produitId)
                .orElseThrow(() -> new RuntimeException("Produit non trouvé"));
    }

    private void validateLivraisonStatus(CommandeClient existing, CommandeClient updated) {
        if (existing.isLivree() && updated.isLivree() != existing.isLivree()) {
            throw new RuntimeException("Action interdite : La commande a déjà été livrée");
        }
    }

    private void updateCommandeFields(CommandeClient existing, CommandeClient updated) {
        existing.setClient(updated.getClient());
        existing.setDate(updated.getDate());
        existing.setReference(updated.getReference());
        existing.setStatut(updated.getStatut());

        // Seulement mettre à jour si la commande n'est pas déjà livrée
        if (!existing.isLivree()) {
            existing.setLivree(updated.isLivree());
        }
    }


    @GetMapping("/search")
    public ResponseEntity<List<CommandeClient>> searchCommandes(
            @RequestParam(required = false) String reference,
            @RequestParam(required = false) Long produitId) {

        Specification<CommandeClient> spec = Specification.where(null);

        if (reference != null && !reference.isEmpty()) {
            spec = spec.and((root, query, cb) ->
                    cb.like(root.get("reference"), "%" + reference + "%"));
        }

        if (produitId != null) {
            spec = spec.and((root, query, cb) ->
                    cb.equal(root.get("produit").get("id"), produitId));
        }

        return ResponseEntity.ok(commandeClientRepository.findAll(spec));
    }
}