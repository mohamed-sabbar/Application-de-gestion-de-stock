package com.stock_management_backend.repository;

import com.stock_management_backend.entity.CommandeAchat;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CommandeAchatRepository extends JpaRepository<CommandeAchat,Long> {
    @Query("SELECT c FROM CommandeAchat c WHERE c.num_achat=:num_achat")
    CommandeAchat findBynum_achat(@Param("num_achat") String num_achat);
    @Modifying
    @Query("UPDATE CommandeAchat c SET c.num_achat = :num_achat, c.fournisseur = :fournisseur WHERE c.id = :id")
    void  updatecommande(@Param("num_achat") String num_achat,@Param("fournisseur") String fournisseur,@Param("id")Long id);


}
