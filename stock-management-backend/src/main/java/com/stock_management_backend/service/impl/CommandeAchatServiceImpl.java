package com.stock_management_backend.service.impl;

import com.stock_management_backend.entity.CommandeAchat;
import com.stock_management_backend.repository.CommandeAchatRepository;
import com.stock_management_backend.service.CommandeAchatService;
import org.springframework.beans.factory.annotation.Autowired;

public class CommandeAchatServiceImpl  implements CommandeAchatService {
    @Autowired
    CommandeAchatRepository commandeAchatRepository;
    @Override
    public CommandeAchat findBynum_achat(String num_achat){
        return  commandeAchatRepository.findBynum_achat(num_achat);
    }
}
