package com.stock_management_backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.antlr.v4.runtime.misc.NotNull;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Entrepot {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String nom;
   /* public Entrepot(String nom,String code,String adresse){
        this.nom=nom;
        this.code=code;
        this.adresse=adresse;

    }*/
    public List<Transfert> getTransfertsDestination() {
        return transfertsDestination;
    }

    public void setTransfertsDestination(List<Transfert> transfertsDestination) {
        this.transfertsDestination = transfertsDestination;
    }

    public List<Transfert> getTransfertsSource() {
        return transfertsSource;
    }

    public void setTransfertsSource(List<Transfert> transfertsSource) {
        this.transfertsSource = transfertsSource;
    }

    public List<Livraison> getLivraisons() {
        return livraisons;
    }

    public void setLivraisons(List<Livraison> livraisons) {
        this.livraisons = livraisons;
    }

    public List<Reception> getReceptions() {
        return receptions;
    }

    public void setReceptions(List<Reception> receptions) {
        this.receptions = receptions;
    }

    public String getAdresse() {
        return adresse;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Column(unique = true)
    private String code;

    private String adresse;

    @OneToMany(mappedBy = "entrepot", cascade = CascadeType.ALL)
    private List<Reception> receptions = new ArrayList<>();

    @OneToMany(mappedBy = "entrepot", cascade = CascadeType.ALL)
    private List<Livraison> livraisons = new ArrayList<>();

    @OneToMany(mappedBy = "source", cascade = CascadeType.ALL)
    private List<Transfert> transfertsSource = new ArrayList<>();

    @OneToMany(mappedBy = "destination", cascade = CascadeType.ALL)
    private List<Transfert> transfertsDestination = new ArrayList<>();

}