package com.stock_management_backend.service;

import com.stock_management_backend.entity.CommandeClient;
import java.util.List;
import java.util.Optional;

public interface CommandeClientService {
    List<CommandeClient> getAllCommandeClients();
    Optional<CommandeClient> getCommandeClientById(Long id);
    CommandeClient saveCommandeClient(CommandeClient commandeClient);
    void deleteCommandeClient(Long id);
    List<CommandeClient> getCommandesDisponibles();
    List<CommandeClient> getAllCommandeClientsWithProduit();
}