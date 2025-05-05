package com.stock_management_backend.service.impl;

import com.stock_management_backend.entity.CommandeClient;
import com.stock_management_backend.entity.Entrepot;
import com.stock_management_backend.entity.Livraison;
import com.stock_management_backend.entity.Produit;
import com.stock_management_backend.repository.CommandeClientRepository;
import com.stock_management_backend.repository.EntrepotRepository;
import com.stock_management_backend.repository.LivraisonRepository;
import com.stock_management_backend.repository.ProduitRepository;
import com.stock_management_backend.service.EntrepotService;
import com.stock_management_backend.service.LivraisonService;
import com.stock_management_backend.service.ProduitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class LivraisonServiceImpl implements LivraisonService {
    @Autowired
    ProduitRepository produitRepository;
    @Autowired
    CommandeClientRepository commandeClientRepository;
    @Autowired
    EntrepotRepository entrepotRepository;

    private final LivraisonRepository livraisonRepository;
    private final ProduitService produitService;
    private final EntrepotService entrepotService;


    public LivraisonServiceImpl(
            LivraisonRepository livraisonRepository,
            ProduitService produitService,
            EntrepotService entrepotService
    ) {
        this.livraisonRepository = livraisonRepository;
        this.produitService = produitService;
        this.entrepotService = entrepotService;
    }

    @Override
    public List<Livraison> searchLivraisons(LocalDate startDate, LocalDate endDate, String productName, String depotName) {
        // Conversion des chaînes vides en null
        String processedProductName = (productName != null && productName.isEmpty()) ? null : productName;
        String processedDepotName = (depotName != null && depotName.isEmpty()) ? null : depotName;

        return livraisonRepository.searchLivraisons(
                startDate,
                endDate,
                processedProductName,
                processedDepotName
        );
    }

    @Override
    public Livraison createLivraison(Livraison livraison) {
        // Valider le produit
        Produit produit = produitRepository.findById(livraison.getProduit().getId())
                .orElseThrow(() -> new RuntimeException("Produit non trouvé"));
        livraison.setProduit(produit);

        // Valider l'entrepôt
        Entrepot entrepot = entrepotRepository.findById(livraison.getEntrepot().getId())
                .orElseThrow(() -> new RuntimeException("Entrepot non trouvé"));
        livraison.setEntrepot(entrepot);

        // Valider la commande client (si présente)
        if (livraison.getCommandeClient() != null) {
            CommandeClient commandeClient = commandeClientRepository.findById(livraison.getCommandeClient().getId())
                    .orElseThrow(() -> new RuntimeException("Commande client non trouvée"));
            livraison.setCommandeClient(commandeClient);
        }

        return livraisonRepository.save(livraison);
    }


    @Override
    public List<Livraison> getAllLivraisons() {
        return livraisonRepository.findAll();
    }

    @Override
    public Optional<Livraison> getLivraisonById(Long id) {
        return livraisonRepository.findById(id);
//                .orElseThrow(() -> new EntityNotFoundException("Livraison non trouvée"));
    }

//    @Override
//    public List<Livraison> getLivraisonsByEntrepot(Long entrepotId) {
//        return livraisonRepository.findByEntrepotId(entrepotId);
//    }

    @Override
    public void deleteLivraison(Long id) {
        livraisonRepository.deleteById(id);
    }

    @Override
    public Livraison saveLivraison(Livraison livraison) {
        return livraisonRepository.save(livraison);
    }


    @Override
    public List<Livraison> getLivraisonsByProduit(Long produitId) {
        return livraisonRepository.findByProduitId(produitId); // 👈 Utilisation du repository
    }

    @Override
    public List<Livraison> getLivraisonsByEntrepot(Long entrepotId) {
        return livraisonRepository.findByEntrepotId(entrepotId);
    }

    @Override
    public List<Livraison> getLivraisonsByCommandeClient(Long commandeClientId) {
        return livraisonRepository.findByCommandeClientId(commandeClientId);
    }
}