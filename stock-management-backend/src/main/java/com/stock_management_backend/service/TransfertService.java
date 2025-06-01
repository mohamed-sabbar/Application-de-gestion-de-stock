package com.stock_management_backend.service;

import com.stock_management_backend.entity.Transfert;
import java.time.LocalDate;
import java.util.List;

public interface TransfertService {
    Transfert createTransfert(Transfert transfert);
    List<Transfert> getAllTransferts(); // Méthode sans paramètres
    List<Transfert> searchTransferts(LocalDate dateDebut, LocalDate dateFin, Long entrepotId); // Nouvelle méthode pour la recherche
    Transfert updateTransfert(Long id, Transfert transfert);
    void deleteTransfert(Long id);
}