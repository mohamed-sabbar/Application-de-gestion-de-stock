package com.stock_management_backend.repository;

import com.stock_management_backend.entity.Produit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ProduitRepository extends JpaRepository<Produit, Long> {
    @Query("SELECT p.id FROM Produit p WHERE p.nom = :nom")
    Long findIdByNom(@Param("nom") String nom);
}