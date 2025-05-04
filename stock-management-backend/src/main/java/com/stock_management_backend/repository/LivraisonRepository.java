package com.stock_management_backend.repository;

import com.stock_management_backend.entity.Livraison;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.time.LocalDate;
import java.util.List;

public interface LivraisonRepository extends JpaRepository<Livraison, Long> {

    // Recherche existante (à garder)
    @Query("SELECT l FROM Livraison l WHERE " +
            "(:startDate IS NULL OR l.date >= :startDate) AND " +
            "(:endDate IS NULL OR l.date <= :endDate) AND " +
            "(:productName IS NULL OR LOWER(l.produit.nom) LIKE LOWER(CONCAT('%', :productName, '%'))) AND " +
            "(:depotName IS NULL OR LOWER(l.entrepot.nom) LIKE LOWER(CONCAT('%', :depotName, '%')))")
    List<Livraison> searchLivraisons(
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate,
            @Param("productName") String productName,
            @Param("depotName") String depotName
    );

    // Nouvelles méthodes pour remplacer les relations bidirectionnelles
    List<Livraison> findByProduitId(Long produitId);
    List<Livraison> findByCommandeClientId(Long commandeClientId);
    List<Livraison> findByEntrepotId(Long entrepotId);
}