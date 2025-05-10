package com.stock_management_backend.repository;

import com.stock_management_backend.dto.ReceptionDto;
import com.stock_management_backend.entity.Entrepot;
import com.stock_management_backend.entity.Produit;
import com.stock_management_backend.entity.Reception;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ReceptionRepository extends JpaRepository<Reception,Long> {
    @Query("SELECT r FROM Reception r WHERE r.date BETWEEN :dateStart AND :dateEnd " +
            "AND r.produit.id IN (SELECT p.id FROM Produit p WHERE p.nom = :produitName) " +
            "AND r.entrepot.id IN (SELECT e.id FROM Entrepot e WHERE e.nom = :entrepotName)")
    List<Reception> searchRecepetion(@Param("dateStart") LocalDate dateStart,
                                        @Param("dateEnd") LocalDate dateEnd,
                                        @Param("produitName") String produitName,
                                        @Param("entrepotName") String entrepotName);
    @Modifying
    @Query("DELETE FROM Reception r WHERE r.commandeAchat.id IN (" +
            "SELECT c.id FROM CommandeAchat c WHERE c.num_achat LIKE %:num_achat%)")
    void deleteBynum_achat(@Param("num_achat") String num_achat);



};

