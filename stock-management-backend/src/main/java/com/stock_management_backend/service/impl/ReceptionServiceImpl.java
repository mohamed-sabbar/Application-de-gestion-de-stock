package com.stock_management_backend.service.impl;

import com.stock_management_backend.dto.ReceptionDto;
import com.stock_management_backend.entity.CommandeAchat;
import com.stock_management_backend.entity.Reception;
import com.stock_management_backend.mapper.Mapper;
import com.stock_management_backend.repository.CommandeAchatRepository;
import com.stock_management_backend.repository.EntrepotRepository;
import com.stock_management_backend.repository.ProduitRepository;
import com.stock_management_backend.repository.ReceptionRepository;
import com.stock_management_backend.service.ReceptionService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ReceptionServiceImpl implements ReceptionService {
    @Autowired
    private ReceptionRepository receptionRepository;
    @Autowired
    private Mapper mapper;
    @Autowired
    private CommandeAchatRepository commandeAchatRepository;
    @Autowired
    private EntrepotRepository entrepotRepository;
    @Autowired
    private ProduitRepository produitRepository;
    @Override
    public List<ReceptionDto> gettAllReception() {
        List<Reception> receptions = receptionRepository.findAll();
        return receptions.stream()
                .map(r -> mapper.receptionDto(r))
                .collect(Collectors.toList());
    }

    @Override
public List<ReceptionDto> searchRecepetion(LocalDate dateStart, LocalDate dateEnd, String produitName, String entrepotName){
        List<Reception> receptions=receptionRepository.searchRecepetion(dateStart,  dateEnd,   produitName,  entrepotName);
        return receptions.stream().map(r->mapper.receptionDto(r)).collect(Collectors.toList());
}


    @Override
    public Reception createReception(Reception reception) {
        return saveReception(reception);
    }

    @Override
    public Optional<Reception> getReceptionById(Long id) {
        return receptionRepository.findById(id);
    }

    @Override
    @Transactional
    public void deleteReception(String num_achat) {
         receptionRepository.deleteBynum_achat(num_achat);

    }

    @Override
    @Transactional
    public Reception saveReception(Reception reception) {
        return receptionRepository.save(reception);
    }

    @Override
    @Transactional
    public void updateReception(String num_achat,ReceptionDto newRecepetion) {
        Long id_reception=receptionRepository.findByCommandeAchat_NumAchat(num_achat).getId();
        CommandeAchat commandeAchat=commandeAchatRepository.findBynum_achat(num_achat);
        Long id_commandeAchat=commandeAchat.getId();
        String Num_achat_commandeAchat=newRecepetion.getCommandeAchat().getNum_achat();;
        String fournisseur_commandeAchat=newRecepetion.getCommandeAchat().getFournisseur();

        commandeAchatRepository.updatecommande(Num_achat_commandeAchat,fournisseur_commandeAchat,id_commandeAchat);
        LocalDate Reception_date=newRecepetion.getDate();
        int Recepetion_quantite=newRecepetion.getQuantite();
        Long id_entrepot= entrepotRepository.findIdByNom(newRecepetion.getEntrepot().getNom());
        Long id_produit= produitRepository.findIdByNom(newRecepetion.getProduit().getNom());

        receptionRepository.updateReception(Reception_date,
                 Recepetion_quantite,
                 id_entrepot,
                 id_produit,
                 id_reception);








    }


    ;
}
