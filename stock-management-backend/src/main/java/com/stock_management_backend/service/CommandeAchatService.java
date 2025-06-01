package com.stock_management_backend.service;

import com.stock_management_backend.dto.CommandeAchatDto;
import com.stock_management_backend.entity.CommandeAchat;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CommandeAchatService {
     CommandeAchat findBynum_achat(String num_achat);
     List<CommandeAchatDto>  getCommandeAchat();
     List<CommandeAchatDto> Search_Commande(String num_achat,String nom_produit);

}
