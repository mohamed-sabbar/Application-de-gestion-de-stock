package com.stock_management_backend.service;

import com.stock_management_backend.entity.CommandeAchat;

public interface CommandeAchatService {
     CommandeAchat findBynum_achat(String num_achat);
}
