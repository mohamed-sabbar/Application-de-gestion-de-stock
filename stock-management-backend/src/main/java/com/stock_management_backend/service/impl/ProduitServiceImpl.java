package com.stock_management_backend.service.impl;

import com.stock_management_backend.dto.produitDto;
import com.stock_management_backend.entity.Produit;
import com.stock_management_backend.mapper.Mapper;
import com.stock_management_backend.repository.ProduitRepository;
import com.stock_management_backend.service.ProduitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProduitServiceImpl implements ProduitService {

    private final ProduitRepository produitRepository;
    @Autowired
    private Mapper mapper;
    @Autowired
    public ProduitServiceImpl(ProduitRepository produitRepository) {
        this.produitRepository = produitRepository;
    }

    @Override
    public List<Produit> getAllProduits() {
        return produitRepository.findAll();
    }

    @Override
    public Optional<Produit> getProduitById(Long id) {
        return produitRepository.findById(id);
    }

    @Override
    public Produit saveProduit(Produit produit) {
        return produitRepository.save(produit);
    }

    @Override
    public void deleteProduit(Long id) {
        produitRepository.deleteById(id);
    }
    @Override
    public List<produitDto> getAllProduitsNames(){
        List<Produit> produits=getAllProduits();
        return produits.stream().map(p->mapper.produitDto(p)).collect(Collectors.toList());
    }
}