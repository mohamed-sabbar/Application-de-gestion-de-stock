package com.stock_management_backend.repository;

import com.stock_management_backend.entity.CommandeAchat;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CommandeAchatRepository extends JpaRepository<CommandeAchat,Long> {
    @Query("SELECT c FROM CommandeAchat c WHERE c.num_achat=:num_achat")
    CommandeAchat findBynum_achat(@Param("num_achat") String num_achat);
    @Modifying
    @Query("UPDATE CommandeAchat c SET c.num_achat = :num_achat, c.fournisseur = :fournisseur ,c.quantite=:quantite,c.produit.id=:produit_id  WHERE c.id = :id")
    void  updatecommande(@Param("num_achat") String num_achat,@Param("fournisseur") String fournisseur,@Param("quantite") int quantite,@Param("produit_id") Long produit_id,@Param("id")Long id);
    @Query("SELECT c FROM CommandeAchat c WHERE c.receptions IS EMPTY")
    List<CommandeAchat>  findCommandeNonAssosie();
    @Query("SELECT c FROM CommandeAchat c JOIN c.produit p WHERE c.num_achat = :numAchat AND p.nom = :nomProduit")
    List<CommandeAchat> findByNumAchatAndProduitNom(@Param("numAchat") String numAchat, @Param("nomProduit") String nomProduit);


}
