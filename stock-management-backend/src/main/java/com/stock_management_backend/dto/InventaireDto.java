package com.stock_management_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class InventaireDto {
  private LocalDate date;
private String effectueur;
private String Validateur;
//private StockDto stockDto;
private EntrepotDto entrepotDto;
  private byte[] fichierExcel;
}
