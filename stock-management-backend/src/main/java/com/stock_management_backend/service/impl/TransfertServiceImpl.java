package com.stock_management_backend.service.impl;

import com.stock_management_backend.entity.*;
import com.stock_management_backend.repository.*;
import com.stock_management_backend.service.TransfertService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class TransfertServiceImpl implements TransfertService {

    private final TransfertRepository transfertRepository;
    private final EntrepotRepository entrepotRepository;
    private final ProduitRepository produitRepository;

    public TransfertServiceImpl(TransfertRepository transfertRepository,
                                EntrepotRepository entrepotRepository,
                                ProduitRepository produitRepository) {
        this.transfertRepository = transfertRepository;
        this.entrepotRepository = entrepotRepository;
        this.produitRepository = produitRepository;
    }

    @Override
    public Transfert createTransfert(Transfert transfert) {
        System.out.println("Source ID: " + (transfert.getSource() != null ? transfert.getSource().getId() : "null"));
        System.out.println("Destination ID: " + (transfert.getDestination() != null ? transfert.getDestination().getId() : "null"));
        System.out.println("Produit ID: " + (transfert.getProduit() != null ? transfert.getProduit().getId() : "null"));

        Optional<Entrepot> sourceOpt = entrepotRepository.findById(transfert.getSource().getId());
        Optional<Entrepot> destinationOpt = entrepotRepository.findById(transfert.getDestination().getId());
        Optional<Produit> produitOpt = produitRepository.findById(transfert.getProduit().getId());

        if (sourceOpt.isEmpty()) {
            throw new IllegalArgumentException("Entrepot source non trouvé");
        }
        if (destinationOpt.isEmpty()) {
            throw new IllegalArgumentException("Entrepot destination non trouvé");
        }
        if (produitOpt.isEmpty()) {
            throw new IllegalArgumentException("Produit non trouvé");
        }

        transfert.setSource(sourceOpt.get());
        transfert.setDestination(destinationOpt.get());
        transfert.setProduit(produitOpt.get());

        return transfertRepository.save(transfert);
    }


    @Override
    public List<Transfert> getAllTransferts() {
        // Retourne tous les transferts sans filtre
        return transfertRepository.findAll();
    }

    @Override
    public List<Transfert> searchTransferts(LocalDate dateDebut, LocalDate dateFin, Long entrepotId) {
        if (dateDebut != null && dateFin != null && entrepotId != null) {
            return transfertRepository.findByDateBetweenAndEntrepot(dateDebut, dateFin, entrepotId);
        } else if (dateDebut != null && dateFin != null) {
            return transfertRepository.findByDateBetween(dateDebut, dateFin);
        } else if (entrepotId != null) {
            return transfertRepository.findByEntrepotId(entrepotId);
        } else {
            return transfertRepository.findAll();
        }
    }

    @Override
    public Transfert updateTransfert(Long id, Transfert transfertDetails) {
        Optional<Transfert> transfertOpt = transfertRepository.findById(id);
        if (transfertOpt.isEmpty()) {
            throw new IllegalArgumentException("Transfert non trouvé");
        }

        Transfert transfert = transfertOpt.get();
        transfert.setDate(transfertDetails.getDate());
        transfert.setQuantite(transfertDetails.getQuantite());
        transfert.setRemarque(transfertDetails.getRemarque());

        // Mise à jour des relations
        if (transfertDetails.getSource() != null) {
            Optional<Entrepot> sourceOpt = entrepotRepository.findById(transfertDetails.getSource().getId());
            if (sourceOpt.isEmpty()) {
                throw new IllegalArgumentException("Entrepot source non trouvé");
            }
            transfert.setSource(sourceOpt.get());
        }

        if (transfertDetails.getDestination() != null) {
            Optional<Entrepot> destinationOpt = entrepotRepository.findById(transfertDetails.getDestination().getId());
            if (destinationOpt.isEmpty()) {
                throw new IllegalArgumentException("Entrepot destination non trouvé");
            }
            transfert.setDestination(destinationOpt.get());
        }

        if (transfertDetails.getProduit() != null) {
            Optional<Produit> produitOpt = produitRepository.findById(transfertDetails.getProduit().getId());
            if (produitOpt.isEmpty()) {
                throw new IllegalArgumentException("Produit non trouvé");
            }
            transfert.setProduit(produitOpt.get());
        }

        return transfertRepository.save(transfert);
    }

    @Override
    public void deleteTransfert(Long id) {
        Optional<Transfert> transfertOpt = transfertRepository.findById(id);
        if (transfertOpt.isEmpty()) {
            throw new IllegalArgumentException("Transfert non trouvé");
        }
        transfertRepository.delete(transfertOpt.get());
    }
}