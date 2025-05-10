package com.stock_management_backend.service.impl;

import com.stock_management_backend.dto.ReceptionDto;
import com.stock_management_backend.entity.Reception;
import com.stock_management_backend.mapper.Mapper;
import com.stock_management_backend.repository.ReceptionRepository;
import com.stock_management_backend.service.ReceptionService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
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
    public void updateReception(String num_achat,Reception newRecepetion) {
        Optional<Reception> receptionexits =receptionRepository.findById(id);
        if(receptionexits.isPresent()){
            Reception reception=receptionexits.get();
            reception.setDate(newRecepetion.getDate());
            reception.setProduit(newRecepetion.getProduit());
            reception.setEntrepot(reception.getEntrepot());

            reception.setQuantite(reception.getQuantite());
            reception.setCommandeAchat(reception.getCommandeAchat());



        }

    }


    ;
}
