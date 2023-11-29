package com.springboot.appOrder.controller;

import com.springboot.appOrder.entity.CartEntity;
import com.springboot.appOrder.entity.CartRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Controller
@RequiredArgsConstructor
public class MainControllerJSH {
    @Autowired
    CartRepository cartRepository;
    @GetMapping("/menu")
    public String menu(Model model){
        List<CartEntity>entities = cartRepository.findAll();
        model.addAttribute("cart",entities.size());


        return "/menu";
    }
    @GetMapping("/more")
    public String more(){
        return "more";
    }



    @GetMapping("/join")
    public String join(){
        return "/join";
    }


    @GetMapping("/order_1")
    public String order( Model model ){
        List<CartEntity>entities = cartRepository.findAll();
        model.addAttribute("list",entities);
        model.addAttribute("size",entities.size()-1);
        model.addAttribute("first",entities.get(0).getItemName());
        return "/order_1";
    }



}
