package com.stock_management_backend.repository;

import com.stock_management_backend.entity.Produit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProduitRepository extends JpaRepository<Produit, Long> {
    // Pas besoin de méthodes supplémentaires si vous utilisez des requêtes personnalisées ailleurs
}