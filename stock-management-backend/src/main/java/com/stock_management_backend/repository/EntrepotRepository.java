package com.stock_management_backend.repository;

import com.stock_management_backend.entity.Entrepot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface EntrepotRepository extends JpaRepository<Entrepot, Long> {
    @Query("SELECT e.id FROM Entrepot e WHERE e.nom = :nom")
    Long findIdByNom(@Param("nom") String nom);

}
