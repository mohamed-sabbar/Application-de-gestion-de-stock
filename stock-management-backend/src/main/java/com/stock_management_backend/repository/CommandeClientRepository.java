package com.stock_management_backend.repository;

import com.stock_management_backend.entity.CommandeClient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommandeClientRepository extends JpaRepository<CommandeClient, Long>, JpaSpecificationExecutor<CommandeClient> {
    // You can add custom query methods here if needed
    List<CommandeClient> findByStatut(String statut);

    @Query("SELECT cc FROM CommandeClient cc LEFT JOIN FETCH cc.produit")
    List<CommandeClient> findAllWithProduit();

}