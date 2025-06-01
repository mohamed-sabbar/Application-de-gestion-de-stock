package com.stock_management_backend.repository;

import com.stock_management_backend.entity.Stock;
import org.springframework.data.domain.Example;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface StockRepository extends JpaRepository<Stock,Long> {
    @Query("SELECT s FROM Stock s WHERE s.entrepot.nom = :nom")
    List<Stock> findByEntrpotName(@Param("nom") String nom);
    @Query("SELECT s FROM Stock s WHERE s.entrepot.nom = :nom_entrepot AND s.produit.nom = :nom_produit")
    Stock findByEntrepotNameAndProduitName(@Param("nom_entrepot") String nom_entrepot,
                                           @Param("nom_produit") String nom_produit);
}
