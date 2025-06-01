package com.stock_management_backend.repository;

import com.stock_management_backend.entity.Transfert;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.time.LocalDate;
import java.util.List;

public interface TransfertRepository extends JpaRepository<Transfert, Long> {

    // Trouver par plage de dates
    List<Transfert> findByDateBetween(LocalDate startDate, LocalDate endDate);

    // Trouver par entrepôt (source ou destination)
    @Query("SELECT t FROM Transfert t WHERE t.source.id = :entrepotId OR t.destination.id = :entrepotId")
    List<Transfert> findByEntrepotId(@Param("entrepotId") Long entrepotId);

    // Trouver par plage de dates et entrepôt
    @Query("SELECT t FROM Transfert t WHERE (t.date BETWEEN :startDate AND :endDate) AND (t.source.id = :entrepotId OR t.destination.id = :entrepotId)")
    List<Transfert> findByDateBetweenAndEntrepot(
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate,
            @Param("entrepotId") Long entrepotId);
}