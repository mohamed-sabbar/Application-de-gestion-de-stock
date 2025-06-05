package com.stock_management_backend.repository;

import com.stock_management_backend.entity.Inventaire;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface InventaireRepository extends JpaRepository<Inventaire,Long> {
    @Query("SELECT i FROM Inventaire i WHERE i.date = :date AND i.entrepot.nom = :nom")
    List<Inventaire> findByDateAndEntrepotNom(@Param("date") LocalDate date, @Param("nom") String nom);


}
