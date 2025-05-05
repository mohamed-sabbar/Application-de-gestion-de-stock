package com.stock_management_backend.service.impl;

import com.stock_management_backend.entity.CommandeClient;
import com.stock_management_backend.repository.CommandeClientRepository;
import com.stock_management_backend.service.CommandeClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CommandeClientServiceImpl implements CommandeClientService {

    private final CommandeClientRepository commandeClientRepository;

    @Autowired
    public CommandeClientServiceImpl(CommandeClientRepository commandeClientRepository) {
        this.commandeClientRepository = commandeClientRepository;
    }

    @Override
    public List<CommandeClient> getAllCommandeClients() {
        return commandeClientRepository.findAll();
    }

    @Override
    public Optional<CommandeClient> getCommandeClientById(Long id) {
        return commandeClientRepository.findById(id);
    }

    @Override
    public CommandeClient saveCommandeClient(CommandeClient commandeClient) {
        return commandeClientRepository.save(commandeClient);
    }
    @Override
    public List<CommandeClient> getCommandesDisponibles() {
        return commandeClientRepository.findByStatut("VALIDÉ"); // ou "PRETE_A_LIVRER"
    }
    @Override

    public List<CommandeClient> getAllCommandeClientsWithProduit() {
        return commandeClientRepository.findAllWithProduit();
    }

    @Override
    public void deleteCommandeClient(Long id) {
        commandeClientRepository.deleteById(id);
    }
}