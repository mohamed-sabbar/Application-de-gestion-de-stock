package com.stock_management_backend.service;

import com.stock_management_backend.dto.ReceptionDto;
import com.stock_management_backend.entity.Livraison;
import com.stock_management_backend.entity.Reception;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface ReceptionService {
  public   List<ReceptionDto> gettAllReception();


    List <ReceptionDto> searchRecepetion( LocalDate dateStart, LocalDate dateEnd,  String produitName,  String entrepotName);
    Reception createReception(ReceptionDto newReception,String entrepot);

    Optional<Reception> getReceptionById(Long id);

    void deleteReception(String num_achat);
    Reception saveReception(Reception reception);
    void updateReception(String num_achat,ReceptionDto newReception);
    void createReceptionIndependante(LocalDate date,int qunatite,String produit,String entrepotname,String fornisseur);




}
