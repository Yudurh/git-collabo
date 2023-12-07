package com.springboot.appOrder.controller;

import com.springboot.appOrder.dto.*;
import com.springboot.appOrder.entity.*;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.Banner;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.lang.reflect.Member;
import java.util.List;

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
    @Autowired
    private EventRepository eventRepository;

    @GetMapping("")
    public String first(){
        return "first";
    }

    // ( 사용자 ) 로그인창
    @GetMapping("/login")
    public String login(){
        return "login";
    }
    
    // ( 사용자 ) 메인 화면
    @GetMapping("/main")
    public String main(Model model,
                       HttpServletRequest request){
        // 로그인한 회원 이름, 스탬프 렌더링
        String loginId = (String)request.getSession().getAttribute("loginId");
        if( loginId != null ){
            List<MemberEntity> list = memberRepository.findByMemberId(loginId);
            if( list.size() > 0 ){
                MemberEntity memberEntity = list.get(0);
                model.addAttribute("memberName", memberEntity.getMemberName());
                model.addAttribute("memberPoint", memberEntity.getMemberPoint());
                System.out.println("point: " + memberEntity.getMemberPoint());
                model.addAttribute("coupon", memberEntity.getMemberPoint()/10);
                model.addAttribute("memberPoint", memberEntity.getMemberPoint()%10);
            }
        }

        // 추천 메뉴 렌더링
        List<ItemEntity> itemEntities1 = itemRepository.findByItemName("왕할메가커피");
        List<ItemEntity> itemEntities2 = itemRepository.findByItemName("할메가커피");
        List<ItemEntity> itemEntities3 = itemRepository.findByItemName("디카페인 헤이즐넛 아메리카노");
        List<ItemEntity> itemEntities4 = itemRepository.findByItemName("디카페인 바닐라 아메리카노");
        List<ItemEntity> itemEntities5 = itemRepository.findByItemName("에스프레소");

        model.addAttribute("itemImageUrl1", itemEntities1.get(0).getItemImageUrl());
        model.addAttribute("itemName1", itemEntities1.get(0).getItemName());
        model.addAttribute("itemContent1", itemEntities1.get(0).getItemContent());
//        model.addAttribute("itemNo1", itemEntities1.get(0).getItemNo());

        model.addAttribute("itemImageUrl2", itemEntities2.get(0).getItemImageUrl());
        model.addAttribute("itemName2", itemEntities2.get(0).getItemName());
        model.addAttribute("itemContent2", itemEntities2.get(0).getItemContent());

        model.addAttribute("itemImageUrl3", itemEntities3.get(0).getItemImageUrl());
        model.addAttribute("itemName3", itemEntities3.get(0).getItemName());
        model.addAttribute("itemContent3", itemEntities3.get(0).getItemContent());

        model.addAttribute("itemImageUrl4", itemEntities4.get(0).getItemImageUrl());
        model.addAttribute("itemName4", itemEntities4.get(0).getItemName());
        model.addAttribute("itemContent4", itemEntities4.get(0).getItemContent());

        model.addAttribute("itemImageUrl5", itemEntities5.get(0).getItemImageUrl());
        model.addAttribute("itemName5", itemEntities5.get(0).getItemName());
        model.addAttribute("itemContent5", itemEntities5.get(0).getItemContent());

        // 이벤트 글 렌더링
        List<EventEntity> eventEntities1 = eventRepository.findByEventNo(1L);
        List<EventEntity> eventEntities2 = eventRepository.findByEventNo(2L);
        List<EventEntity> eventEntities3 = eventRepository.findByEventNo(3L);
        List<EventEntity> eventEntities4 = eventRepository.findByEventNo(4L);
        List<EventEntity> eventEntities5 = eventRepository.findByEventNo(5L);

        model.addAttribute("eventImage1", eventEntities1.get(0).getEventImage());
        model.addAttribute("eventTitle1", eventEntities1.get(0).getEventTitle());
        model.addAttribute("eventImage2", eventEntities2.get(0).getEventImage());
        model.addAttribute("eventTitle2", eventEntities2.get(0).getEventTitle());
        model.addAttribute("eventImage3", eventEntities3.get(0).getEventImage());
        model.addAttribute("eventTitle3", eventEntities3.get(0).getEventTitle());
        model.addAttribute("eventImage4", eventEntities4.get(0).getEventImage());
        model.addAttribute("eventTitle4", eventEntities4.get(0).getEventTitle());
        model.addAttribute("eventImage5", eventEntities5.get(0).getEventImage());
        model.addAttribute("eventTitle5", eventEntities5.get(0).getEventTitle());


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

    // ( 관리자 ) 상품 등록
    @GetMapping("/itemRegister")
    public String itemRegister(Model model){
        // 등록 페이지 이동
        return "adminItemRegi";
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
        model.addAttribute("count", noticeEntities.size());

        return "adminNoticeList";
    }

    // ( 관리자 ) 공지사항 등록
    @GetMapping("/noticeRegister")
    public String noticeRegister(Model model){
        // 등록 페이지 이동
        return "adminNoticeRegi";
    }

    // ( 관리자 ) 이벤트 글 등록
    @GetMapping("/eventRegister")
    public String eventRegister(Model model){
        // 등록 페이지 이동
        return "adminEventRegi";
    }

    // ( 관리자 ) 이벤트 글 조회
    @GetMapping("/adminEventList")
    public String adminEventList(Model model){
        List<EventEntity> eventEntities = eventRepository.findAll();
        model.addAttribute("list", eventEntities);
        model.addAttribute("count", eventEntities.size());

        return "adminEventList";
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

    // ( 관리자 ) 공지사항 글 삭제
    @GetMapping("/noticeDelete")
    public String noticeDelete(@RequestParam Long noticeNo){
        noticeRepository.deleteById(noticeNo);

        return "redirect:/adminNoticeList";
    }


    // ( 관리자 ) 이벤트 글 수정
    @GetMapping("/eventUpdate")
    public String eventUpdate(@RequestParam Long eventNo,
                               Model model){

        EventEntity eventEntity = eventRepository.findById(eventNo).get();
        EventDto eventDto = EventDto.toEventDto(eventEntity);

        model.addAttribute("event", eventDto);
        model.addAttribute("eventNo", eventNo);

        return "adminEventUpdate";
    }


    // ( 관리자 ) 이벤트 글 삭제
    @GetMapping("/eventDelete")
    public String eventDelete(@RequestParam Long eventNo){
        eventRepository.deleteById(eventNo);

        return "redirect:/adminEventList";
    }

    // (사용자) 상품 정보 조회
    @GetMapping("/itemInfo")
    public String itemInfo(@RequestParam String itemName,
//                           @RequestParam String itemCate,
                           Model model){

        // 클릭한 아이템의 정보
        List<ItemEntity> itemEntitiy = itemRepository.findByItemName(itemName);
        // 메뉴 중복이 없으므로 .get(0)을 하면 원하는 커피 정보를 가져옴
        ItemEntity itemEntity = itemEntitiy.get(0);

        model.addAttribute("itemName", itemEntity.getItemName());
        model.addAttribute("itemImageUrl", itemEntity.getItemImageUrl());
        model.addAttribute("itemPrice", itemEntity.getItemPrice());
        model.addAttribute("itemContent", itemEntity.getItemContent());
        model.addAttribute("itemCode", itemEntity.getItemCode());

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
        ItemEntity itemEntity2 = itemEntitiy2.get(0);
        model.addAttribute("itemRecomImg", itemEntity2.getItemImageUrl());
        model.addAttribute("ItemRecomName", itemEntity2.getItemName());
        model.addAttribute("ItemRecomPrice", itemEntity2.getItemPrice());

        List<CartEntity> cartEntities = cartRepository.findAll();
        if (cartEntities.size()>0){
        model.addAttribute("cartSize",cartEntities.size());
        }else {
            model.addAttribute("cartSize",0);
        }

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

    // ( 사용자 ) 스탬프
    @GetMapping("/stamp")
    public String stamp(Model model,
                        HttpServletRequest request){
        String loginId = (String)request.getSession().getAttribute("loginId");
        if( loginId != null ){
            List<MemberEntity> list = memberRepository.findByMemberId(loginId);
            if( list.size() > 0 ){
                MemberEntity memberEntity = list.get(0);
                model.addAttribute("stamp", memberEntity.getMemberPoint()%10);
                System.out.println("stamp: " + memberEntity.getMemberPoint()%10);
            }
        }

        return "stamp";
    }

    // ( 사용자 ) 새소식-이벤트
    @GetMapping("/newsEvent")
    public String newsEvent( Model model ){

        List<EventEntity> eventEntity = eventRepository.findAll();
        model.addAttribute("list", eventEntity);

        return "/newsEvent";
    }

    // ( 사용자 ) 새소식-공지사항
    @GetMapping("/newsNotice")
    public String newsNotice( Model model ){

        List<NoticeEntity> noticeEntity = noticeRepository.findAll();
        model.addAttribute("list", noticeEntity);

        return "/newsNotice";
    }

    // ( 사용자 ) 지점
    @GetMapping("/store")
    public String store(@RequestParam(required = false, defaultValue = "") String itemName,
                        Model model){
        model.addAttribute("itemName",itemName);

        return "store";
    }

    // api 테스트
    @GetMapping("/api")
    public String api(){
        return "api";
    }
}
