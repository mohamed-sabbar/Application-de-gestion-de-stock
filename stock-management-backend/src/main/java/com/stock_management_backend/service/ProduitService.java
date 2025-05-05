package com.stock_management_backend.service;

import com.stock_management_backend.entity.Produit;
import java.util.List;
import java.util.Optional;

public interface ProduitService {
    List<Produit> getAllProduits();
    Optional<Produit> getProduitById(Long id);
    Produit saveProduit(Produit produit);
    void deleteProduit(Long id);
}