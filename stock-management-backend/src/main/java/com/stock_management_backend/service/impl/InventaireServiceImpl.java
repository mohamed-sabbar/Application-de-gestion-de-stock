package com.stock_management_backend.service.impl;

import com.stock_management_backend.dto.InventaireDto;
import com.stock_management_backend.dto.StockDto;
import com.stock_management_backend.entity.Inventaire;
import com.stock_management_backend.entity.Produit;
import com.stock_management_backend.entity.Stock;
import com.stock_management_backend.mapper.Mapper;
import com.stock_management_backend.repository.InventaireRepository;
import com.stock_management_backend.repository.ProduitRepository;
import com.stock_management_backend.repository.StockRepository;
import com.stock_management_backend.service.InventaireService;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOError;
import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class InventaireServiceImpl implements InventaireService {
    @Autowired
    private InventaireRepository inventaireRepository;
    @Autowired
    private StockRepository stockRepository;
    @Autowired
    private Mapper mapper;
    @Autowired
    private ProduitRepository produitRepository;
    @Override
    public List<InventaireDto> DisplayIventaire(LocalDate date, String nom){
        List<Inventaire> inventaires=inventaireRepository.findByDateAndEntrepotNom(date,nom);
        return  inventaires.stream().map(inventaire -> mapper.inventaireDto(inventaire) ).collect(Collectors.toList());

    };
    @Override
    public ByteArrayInputStream generateInventaireExcel(LocalDate date, String nom ){

        List<Stock> stocks=stockRepository.findByEntrpotName(nom);
        List<StockDto> stockDtos=stocks.stream().map(mapper::stockDto ).collect(Collectors.toList());
        try(Workbook workbook = new XSSFWorkbook()){
            Sheet sheet=workbook.createSheet("Inventaire"+ date.toString());
            Row header=sheet.createRow(0);
            header.createCell(0).setCellValue("Nom du produit");
            header.createCell(1).setCellValue("Quantité théorique");
            header.createCell(2).setCellValue("Quantité réelle (à remplir)");
            int rowNum=1;
            for (StockDto stockDto : stockDtos){
                Row row=sheet.createRow(rowNum++);
                row.createCell(0).setCellValue(stockDto.getProduitDto().getNom());
                row.createCell(1).setCellValue(stockDto.getQuantite());
                row.createCell(2).setCellValue("");


            }
            for (int i = 0; i < 3; i++) {
                sheet.autoSizeColumn(i);
            }

            ByteArrayOutputStream out = new ByteArrayOutputStream();
            workbook.write(out);
            return new ByteArrayInputStream(out.toByteArray());
        }catch (IOException e){
            throw  new RuntimeException("erreur en generation de excel");


        }




    };
    @Override
    public void  saveInventaireFromExcel(MultipartFile fichierExcel,String Nom_entrepot,String effectueur){
        String orginalFilename=fichierExcel.getOriginalFilename();
        String dateStr = orginalFilename.substring(orginalFilename.indexOf('_') + 1, orginalFilename.lastIndexOf('.'));
        LocalDate dateInventaire = LocalDate.parse(dateStr); // format ISO yyyy-MM-dd

        try(Workbook workbook = new XSSFWorkbook(fichierExcel.getInputStream())){
            Sheet sheet=workbook.getSheetAt(0);
            for(int i=1;i<=sheet.getLastRowNum();i++){
                Row row =sheet.getRow(i);
                if (row==null) continue;
                String nomProduit=row.getCell(0).getStringCellValue();
                int quantiteReelle=(int) row.getCell(2).getNumericCellValue();
                Produit produit = produitRepository.findByNom(nomProduit);
                System.out.println(produit.getNom());
                Stock stock=stockRepository.findByEntrepotNameAndProduitName(Nom_entrepot,produit.getNom());

                stock.setQuantite(quantiteReelle);
                stockRepository.save(stock);
                Inventaire inventaire = new Inventaire();
                inventaire.setDate(dateInventaire);
                inventaire.setEffectueur(effectueur);
                inventaire.setFichierExcel(fichierExcel.getBytes());
                inventaire.setStock(stock);
                inventaire.setValidateur("Admin");

                inventaireRepository.save(inventaire);





            }

        }catch (IOException e) {
            throw new RuntimeException("Erreur lecture fichier Excel", e);
        }

    }
    @Override
    public List<InventaireDto> DisplayAllIventaire(){
        List<Inventaire> inventaires=inventaireRepository.findAll();
        return  inventaires.stream().map(inventaire -> mapper.inventaireDto(inventaire) ).collect(Collectors.toList());}

}
