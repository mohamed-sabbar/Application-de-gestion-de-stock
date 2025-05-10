package com.stock_management_backend.dto;

import com.stock_management_backend.entity.Reception;
import jakarta.persistence.*;
import lombok.*;
import org.antlr.v4.runtime.misc.NotNull;

import java.util.ArrayList;
import java.util.List;
@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class produitDto {


    private String nom;

    private String unite;
    public  produitDto(String nom){
        this.nom=nom;
    }

}
