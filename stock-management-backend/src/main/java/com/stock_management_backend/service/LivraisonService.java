package com.stock_management_backend.service;


import com.stock_management_backend.entity.Livraison;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface LivraisonService {

    // Méthode de recherche dynamique
    List<Livraison> searchLivraisons(
            LocalDate startDate,
            LocalDate endDate,
            String productName,
            String depotName
    );

    // CRUD Standard
    Livraison createLivraison(Livraison livraison);
    List<Livraison> getAllLivraisons();
    Optional<Livraison> getLivraisonById(Long id);
//    List<Livraison> getLivraisonsByEntrepot(Long entrepotId);
    void deleteLivraison(Long id);
    Livraison saveLivraison(Livraison livraison);
    List<Livraison> getLivraisonsByProduit(Long produitId);
    List<Livraison> getLivraisonsByEntrepot(Long entrepotId);
    List<Livraison> getLivraisonsByCommandeClient(Long commandeClientId);
}