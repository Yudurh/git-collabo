package com.springboot.appOrder.controller;

import com.springboot.appOrder.dto.ItemDto;
import com.springboot.appOrder.dto.MemberDto;
import com.springboot.appOrder.dto.OptionDto;
import com.springboot.appOrder.dto.ResultDto;
import com.springboot.appOrder.entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@Controller
public class MainControllerYem {
    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private ItemRepository itemRepository;
    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private OptionRepository optionRepository;

    @GetMapping("/login")
    public String login(){
        return "login";
    }

    @GetMapping("/main")
    public String main(){
        return "main";
    }

    // 회원 정보 조회
    @GetMapping("/adminMemberList")
    public String adminMemberList(Model model){

        List<MemberEntity> memberEntities = memberRepository.findAll();
        model.addAttribute("list", memberEntities);
        model.addAttribute("count", memberEntities.size());

        return "adminMemberList";
    }

    // 회원 정보 수정
    @GetMapping("memberUpdate")
    public String memberUpdateForm(@RequestParam String memberNo,
                                   Model model){

        MemberEntity memberEntity = memberRepository.findById(Long.valueOf(memberNo)).get();
        MemberDto memberDto = MemberDto.toDto(memberEntity);

        model.addAttribute("member", memberDto);
        model.addAttribute("memberNo", memberNo);

        return "adminMemberUpdate";
        // 업데이트 페이지 이동

    }

    // 회원 정보 삭제
    @GetMapping("/memberDelete")
    public String  memberDelete (@RequestParam Long memberNo,
                              Model model) {

        memberRepository.deleteById(memberNo);

        return "redirect:/adminMemberList";
    }

    // 상품 정보 조회
    @GetMapping("/itemInfo")
    public String itemInfo(Model model){

        List<ItemEntity> itemEntitiy = itemRepository.findByItemName("왕할메가커피");
        // 메뉴 중복이 없으므로 .get(0)을 하면 원하는 커피 정보를 가져옴
        ItemEntity itemEntity = itemEntitiy.get(0);
        model.addAttribute("itemName", itemEntity.getItemName());

        List<OptionEntity> coffeeOption = optionRepository.findByOptionItemCate("커피");
        model.addAttribute("option", coffeeOption);


        return "itemInfo";
    }


}
