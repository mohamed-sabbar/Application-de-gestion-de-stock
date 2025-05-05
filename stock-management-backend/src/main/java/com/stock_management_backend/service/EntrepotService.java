package com.stock_management_backend.service;

import com.stock_management_backend.entity.Entrepot;
import com.stock_management_backend.repository.EntrepotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EntrepotService {

    @Autowired
    private EntrepotRepository entrepotRepository;

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
        entrepotRepository.deleteById(id);
    }
}
