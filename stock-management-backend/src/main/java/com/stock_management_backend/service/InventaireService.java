package com.stock_management_backend.service;

import com.stock_management_backend.dto.InventaireDto;
import com.stock_management_backend.entity.Inventaire;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.time.LocalDate;
import java.util.List;

public interface InventaireService {
    List<InventaireDto> DisplayIventaire(LocalDate date, String nom);
    ByteArrayInputStream generateInventaireExcel(LocalDate date, String Nom);
    void saveInventaireFromExcel(MultipartFile fichierExcel,String Nom_entrepot,String effecteurt,LocalDate date);
    List<InventaireDto> DisplayAllIventaire();

}
