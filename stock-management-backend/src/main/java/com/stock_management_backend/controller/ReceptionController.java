package com.stock_management_backend.controller;

import com.stock_management_backend.dto.ReceptionDto;
import com.stock_management_backend.entity.Reception;
import com.stock_management_backend.service.ReceptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;


@RestController
@RequestMapping("/api/admin/receptions")
public class ReceptionController {
    @Autowired
    private ReceptionService receptionService;
    @GetMapping("ShowAllReceptions")
    public List<ReceptionDto> ShowAllReceptions(){
        return receptionService.gettAllReception();
    }

    @PostMapping("/create")
    public Reception CrerateReception(@RequestBody Reception reception){
        return receptionService.createReception(reception);

    }
    @DeleteMapping("/delete/{num_achat}")
    public void  DeleteReception(@PathVariable String num_achat){
           receptionService.deleteReception(num_achat);
    }
    @PostMapping("/search")
    public List<ReceptionDto> SearchReceptions(@RequestParam LocalDate dateStart,
                                            @RequestParam LocalDate dateEnd,
                                            @RequestParam String produitName,
                                            @RequestParam String entrepotName){
        return receptionService.searchRecepetion(dateStart,dateEnd,produitName,entrepotName);
    }
    @PutMapping("/update")
    public void UpdateReception(@RequestParam String num_achat,@RequestBody ReceptionDto reception){
        receptionService.updateReception(num_achat,reception);

    }


}
