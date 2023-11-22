package com.springboot.appOrder.controller;

import com.springboot.appOrder.dto.*;
import com.springboot.appOrder.entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.Banner;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.swing.text.html.Option;
import java.lang.reflect.Member;
import java.security.PublicKey;
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
    @Autowired
    private NoticeRepository noticeRepository;

    @GetMapping("")
    public String first(){
        return "first";
    }

    // ( 사용자 ) 로그인창
    @GetMapping("/login")
    public String login(){
        return "login";
    }
    
    @GetMapping("/main")
    public String main(){
        return "main";
    }

    // ( 관리자 ) 회원 정보 조회
    @GetMapping("/adminMemberList")
    public String adminMemberList(Model model){
        List<MemberEntity> memberEntities = memberRepository.findAll();
        model.addAttribute("list", memberEntities);
        model.addAttribute("count", memberEntities.size());

        return "adminMemberList";
    }

    // ( 관리자 ) 회원 정보 수정
    @GetMapping("/memberUpdate")
    public String memberUpdateForm(@RequestParam String memberNo,
                                   Model model){
        MemberEntity memberEntity = memberRepository.findById(Long.valueOf(memberNo)).get();
        MemberDto memberDto = MemberDto.toDto(memberEntity);

        model.addAttribute("member", memberDto);
        model.addAttribute("memberNo", memberNo);

        // 업데이트 페이지 이동
        return "adminMemberUpdate";


    }

    // ( 관리자 ) 회원 정보 삭제
    @GetMapping("/memberDelete")
    public String  memberDelete (@RequestParam Long memberNo) {
        
        memberRepository.deleteById(memberNo);

        return "redirect:/adminMemberList";
    }

    // ( 관리자 ) 상품 정보 조회
    @GetMapping("/adminItemList")
    public String adminItemList( Model model ){
        List<ItemEntity> itemEntities = itemRepository.findAll();
        model.addAttribute("list", itemEntities);
        model.addAttribute("count", itemEntities.size());


        return "adminItemList";
    }

    // ( 관리자 ) 상품 정보 수정
    @GetMapping("/itemUpdate")
    public String itemUpdate(@RequestParam String itemNo,
                                 Model model){
        ItemEntity itemEntity = itemRepository.findById(Long.valueOf(itemNo)).get();
        ItemDto itemDto = ItemDto.toDto(itemEntity);

        model.addAttribute("item", itemDto);
        model.addAttribute("itemNo", itemNo);

        // 업데이트 페이지 이동
        return "adminItemUpdate";

    }

    // ( 관리자 ) 상품 정보 삭제
    @GetMapping("/itemDelete")
    public String itemDelete(@RequestParam Long itemNo){
        itemRepository.deleteById(itemNo);

        return "redirect:/adminItemList";
    }

    // ( 관리자 ) 주문 정보 조회
    @GetMapping("/adminOrderList")
    public String adminOrderList(Model model){
        List<OrderEntity> orderEntities = orderRepository.findAll();

        model.addAttribute( "list", orderEntities );
        model.addAttribute( "count", orderEntities.size());

        return "adminOrderList";
    }

    // ( 관리자 ) 주문 정보 수정
    @GetMapping("/orderUpdate")
    public String orderUpdate(@RequestParam Long orderNo,
                              Model model){
        OrderEntity orderEntity = orderRepository.findById(orderNo).get();
        OrderDto orderDto = OrderDto.toDto(orderEntity);

        model.addAttribute("order", orderDto);
        model.addAttribute("orderNo", orderNo);

        // 업데이트 페이지 이동
        return "adminOrderUpdate";

    }

    // ( 관리자 ) 주문 정보 삭제
    @GetMapping("/orderDelete")
    public String orderDelete(@RequestParam Long orderNo){
        orderRepository.deleteById(orderNo);

        return "redirect:/adminOrderList";
    }

    // ( 관리자 ) 공지사항 글 조회
    @GetMapping("/adminNoticeList")
    public String adminNoticeList(Model model){
        List<NoticeEntity> noticeEntities = noticeRepository.findAll();
        model.addAttribute("list", noticeEntities);
        return "adminNoticeList";
    }

    // ( 관리자 ) 공지사항 글 수정
    @GetMapping("/noticeUpdate")
    public String noticeUpdate(@RequestParam Long noticeNo,
                               Model model){
        NoticeEntity noticeEntity = noticeRepository.findById(noticeNo).get();
        NoticeDto noticeDto = NoticeDto.toNoticeDto(noticeEntity);

        model.addAttribute("notice", noticeDto);
        model.addAttribute("noticeNo", noticeNo);

        return "adminNoticeUpdate";
    }

    // (사용자) 상품 정보 조회
    @GetMapping("/itemInfo")
    public String itemInfo(@RequestParam String itemName,
                           @RequestParam String itemCate,
                           Model model){

        // 클릭한 아이템의 정보
        List<ItemEntity> itemEntitiy = itemRepository.findByItemName(itemName);
        // 메뉴 중복이 없으므로 .get(0)을 하면 원하는 커피 정보를 가져옴
        ItemEntity itemEntity = itemEntitiy.get(0);
        model.addAttribute("itemName", itemEntity.getItemName());
        model.addAttribute("itemPrice", itemEntity.getItemPrice());
        model.addAttribute("itemContent", itemEntity.getItemContent());

        // 퍼스널 옵션
        List<OptionEntity> coffeeOption = optionRepository.findByOptionItemCate(itemEntitiy.get(0).getItemCate());
        List<OptionEntity> coffeeOption2 = optionRepository.findByOptionItemCate("커피");
        model.addAttribute("option", coffeeOption);
        model.addAttribute("option2", coffeeOption2);

        int n =0;
        int g = 0;
        int t = 0;
        for (int i=0; i< coffeeOption.size(); i++){
            if (coffeeOption.get(i).getOptionCate().equals("농도")){
                n++;
            }else if(coffeeOption.get(i).getOptionCate().equals("꿀 추가")){
                g++;
            } else if (coffeeOption.get(i).getOptionCate().equals("개인 텀블러 사용")) {
                t++;
            }

        }
        model.addAttribute("optionN", n);
        model.addAttribute("optionG", g);
        model.addAttribute("optionT", t);
        
        
        
        // 추천 메뉴 아이템 정보
        List<ItemEntity> itemEntitiy2 = itemRepository.findByItemRecommend(1);
        ItemEntity itemEntity2 = itemEntitiy.get(0);
        model.addAttribute("itemRecomImg", itemEntity2.getItemImageUrl());
        model.addAttribute("ItemRecomName", itemEntity2.getItemName());
        model.addAttribute("ItemRecomPrice", itemEntity2.getItemPrice());


        return "itemInfo";
    }

    // ( 사용자 ) 장바구니 정보 조회
    @GetMapping("/cartInfo")
    public String cartInfo(Model model) {
        List<CartEntity> cartEntities = cartRepository.findAll();
        model.addAttribute("list", cartEntities);
        return "cartInfo";
    }

    // ( 사용자 ) 장바구니 정보 삭제
    @GetMapping("/cartDelete")
    public String cartDelete (@RequestParam Long cartNo) {
        cartRepository.deleteById(cartNo);

        return "redirect:/cartInfo";

    }



}
