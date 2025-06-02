package com.stock_management_backend.service;

import com.stock_management_backend.entity.Entrepot;
import com.stock_management_backend.repository.EntrepotRepository;
import com.stock_management_backend.repository.StockRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EntrepotService {

    @Autowired
    private EntrepotRepository entrepotRepository;
    @Autowired
    private StockRepository stockRepository;

    public List<Entrepot> getAllEntrepot() {
        return entrepotRepository.findAll();
    }

    public Entrepot createEntrepot(Entrepot entrepot) {
        return entrepotRepository.save(entrepot);
    }

    public Entrepot updateEntrepot(Long id, Entrepot updated) {
        Entrepot entrepot = entrepotRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Entrepôt non trouvé avec ID : " + id));
        entrepot.setNom(updated.getNom());
        entrepot.setCode(updated.getCode());
        entrepot.setAdresse(updated.getAdresse());
        return entrepotRepository.save(entrepot);
    }

    public void deleteEntrepot(Long id) {


        Entrepot entrepot = entrepotRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Entrepôt non trouvé"));
        entrepotRepository.delete(entrepot); // cascade et orphanRemoval s’occupent de tout
    }
}
