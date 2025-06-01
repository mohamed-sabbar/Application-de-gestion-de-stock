package com.stock_management_backend.service.impl;

import com.stock_management_backend.dto.CommandeAchatDto;
import com.stock_management_backend.entity.CommandeAchat;
import com.stock_management_backend.mapper.Mapper;
import com.stock_management_backend.repository.CommandeAchatRepository;
import com.stock_management_backend.service.CommandeAchatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
@Service
public class CommandeAchatServiceImpl  implements CommandeAchatService {
    @Autowired
    CommandeAchatRepository commandeAchatRepository;
    @Autowired
    Mapper mapper;
    @Override
    public CommandeAchat findBynum_achat(String num_achat){
        return  commandeAchatRepository.findBynum_achat(num_achat);
    }
    @Override
    public List<CommandeAchatDto>  getCommandeAchat(){
        List<CommandeAchat> commandeAchats=commandeAchatRepository.findCommandeNonAssosie();
        return commandeAchats.stream().map(c->mapper.commandeAchatDto(c)).collect(Collectors.toList());


    }
    @Override
    public List<CommandeAchatDto> Search_Commande(String num_achat,String nom_produit){
        List<CommandeAchat> commandeAchat=commandeAchatRepository.findByNumAchatAndProduitNom(num_achat,nom_produit);
        return commandeAchat.stream().map(c->mapper.commandeAchatDto(c)).collect(Collectors.toList());

    }
}
