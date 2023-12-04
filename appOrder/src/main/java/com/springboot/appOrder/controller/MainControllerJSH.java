package com.springboot.appOrder.controller;

import com.springboot.appOrder.dto.CartDto;
import com.springboot.appOrder.entity.*;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Controller
@RequiredArgsConstructor
public class MainControllerJSH {
    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private MemberRepository memberRepository;

    @GetMapping("/menu")
    public String menu(Model model){
        List<CartEntity>entities = cartRepository.findAll();
        model.addAttribute("cart",entities.size());


        return "/menu";
    }
    @GetMapping("/more")

    // ( 사용자 ) 더보기 화면
    public String more(HttpServletRequest request,
                       Model model){
        String loginId = (String)request.getSession().getAttribute("loginId");
        if( loginId != null ) {
            List<MemberEntity> list = memberRepository.findByMemberId(loginId);
            if (list.size() > 0) {
                MemberEntity memberEntity = list.get(0);
                model.addAttribute("memberName", memberEntity.getMemberName());
            }
        }

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
    @Autowired
    private Cart2Repository cart2Repository;
    @GetMapping("/order_2")
    public String order2( Model model ){
        List<Cart2Entity>entities = cart2Repository.findAll();
        model.addAttribute("list",entities);
        model.addAttribute("size",entities.size()-1);
        model.addAttribute("first",entities.get(0).getItemName());
        return "order_2";
    }


    @Autowired
    private OrderRepository orderRepository;
    @GetMapping("/pay")
    public String pay( Model model ){
        List<CartEntity>entities = cartRepository.findAll();
        List<OrderEntity>order = orderRepository.findAll();
        model.addAttribute("list",entities);
        model.addAttribute("payType",order.get(0).getOrderPayType());
        model.addAttribute("orderP",order.get(0).getOrderTotalPrice());
        model.addAttribute("orderN",order.get(0).getOrderNumber());
        model.addAttribute("orderD",order.get(0).getOrderDatetime());
        return "/pay";
    }


}
