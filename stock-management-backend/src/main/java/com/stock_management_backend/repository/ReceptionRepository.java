package com.stock_management_backend.repository;

import com.stock_management_backend.dto.ReceptionDto;
import com.stock_management_backend.entity.Entrepot;
import com.stock_management_backend.entity.Produit;
import com.stock_management_backend.entity.Reception;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

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
    @Transactional
    @Modifying
    @Query("UPDATE Reception r SET r.date = :date, r.quantite = :quantite, r.entrepot.id = :entrepotId, r.produit.id = :produitId WHERE r.id = :id")
    void updateReception(@Param("date") LocalDate date,
                         @Param("quantite") int quantite,
                         @Param("entrepotId") Long entrepotId,
                         @Param("produitId") Long produitId,
                         @Param("id") Long id);
    @Query("SELECT r FROM Reception r WHERE r.commandeAchat.num_achat = :numAchat")
    Reception findByCommandeAchat_NumAchat(@Param("numAchat") String numAchat);





};

