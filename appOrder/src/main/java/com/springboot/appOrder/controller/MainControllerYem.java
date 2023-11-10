package com.springboot.appOrder.controller;

import com.springboot.appOrder.entity.CartRepository;
import com.springboot.appOrder.entity.MemberEntity;
import com.springboot.appOrder.entity.MemberRepository;
import com.springboot.appOrder.entity.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Controller
public class MainControllerYem {
    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private OrderRepository orderRepository;

    @GetMapping("/login")
    public String login(){
        return "login";
    }

    @GetMapping("/main")
    public String main(){
        return "main";
    }

    @GetMapping("/adminMemberList")
    public String adminMemberList(Model model,
                                  MemberEntity memberEntity){

        List<MemberEntity> memberEntities = memberRepository.findAll();
        model.addAttribute("list", memberEntities);
        model.addAttribute("count", memberEntities.size());

        return "adminMemberList";
    }
}
