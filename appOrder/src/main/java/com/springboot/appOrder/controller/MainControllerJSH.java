package com.springboot.appOrder.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
@RequiredArgsConstructor
public class MainControllerJSH {
    @GetMapping("/menu")
    public String menu(){
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



}
