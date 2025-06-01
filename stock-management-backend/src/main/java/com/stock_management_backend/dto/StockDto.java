package com.stock_management_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StockDto {
produitDto produitDto;
EntrepotDto entrepotDto;
int quantite;

}
