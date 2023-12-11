package com.springboot.appOrder.controller;
import com.springboot.appOrder.dto.*;
import com.springboot.appOrder.entity.*;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Order;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

@RestController
public class ApiControllerYem {
    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private ItemRepository itemRepository;
    @Autowired
    private NoticeRepository noticeRepository;
    @Autowired
    private EventRepository eventRepository;

    // ( 관리자 ) 로그인 폼
    @PostMapping("/loginAction")
    public ResultDto loginAction(@RequestBody LoginDto loginDto, HttpServletRequest request) {

        //로그인 액션 : 아이디, 암호가 DB에 있으면 로그인 성공, 아니면 실패
        List<MemberEntity> list = memberRepository.findByMemberIdAndMemberPw(
                loginDto.getLoginId(),
                loginDto.getLoginPw()
        );

        ResultDto resultDto = null;

        if (list.size() > 0) {
            //로그인 성공
            if (loginDto.getLoginId().equals("admin")) {   //관리자로 로그인하면
                resultDto = ResultDto.builder()
                        .status("ok")
                        .result(2)
                        .build();
            } else { // 일반 회원으로 로그인하면
                resultDto = ResultDto.builder()
                        .status("ok")
                        .result(1)
                        .build();
            }

            request.getSession().setAttribute("loginId", loginDto.getLoginId());
        } else {
            //로그인 실패
            resultDto = ResultDto.builder()
                    .status("ok")
                    .result(0)
                    .build();
        }

        return resultDto;
    }

    // ( 관리자 ) 회원가입 폼
    @PostMapping("/joinAction")
    public ResultDto joinAction(@RequestBody JoinDto joinDto) {
        System.out.println("loginId:" + joinDto.getLoginId());
        System.out.println("loginPw:" + joinDto.getLoginPw());
        System.out.println("loginName:" + joinDto.getLoginName());

        // 수정된 정보 dto -> entity
        MemberEntity memberJoinEntity = MemberEntity.toJoinEntity(joinDto);
        // 수정된 정보  repository에 저장
        MemberEntity newEntity = memberRepository.save(memberJoinEntity);

        ResultDto resultDto = null;

        if (newEntity != null) {
            //회원가입 성공
            resultDto = ResultDto.builder()
                    .status("ok")
                    .result(1)
                    .build();
        } else {
            //회원가입 실패
            resultDto = ResultDto.builder()
                    .status("ok")
                    .result(0)
                    .build();
        }

        return resultDto;
    }

    // ( 관리자 ) 회원 정보 수정 폼
    @PostMapping("/memberUpdateForm")
    public ResultDto memberUpdateForm(@RequestBody MemberDto memberDto) {
        MemberEntity memberEntity = MemberEntity.toMemberEntity(memberDto);
        MemberEntity newEntity = memberRepository.save(memberEntity);

        ResultDto resultDto = null;

        if (newEntity != null) {
            resultDto = ResultDto.builder()
                    .status("ok")
                    .result(1)
                    .build();
        } else {
            resultDto = ResultDto.builder()
                    .status("ok")
                    .result(0)
                    .build();
        }

        return resultDto;
    }

    @PostMapping("/upload")
    public ResultDto upload(@RequestParam MultipartFile file) throws IOException {
        if (file.isEmpty()) {
            // 파일이 비어있을 경우(이미지를 수정하지 않았을 경우)
            ResultDto resultDto = ResultDto.builder()
                    .status("ok")
                    .result(0)
                    .build();

            return resultDto;
        }

        String newFileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
        File newFile = new File(newFileName);
        file.transferTo(newFile);

        ResultDto resultDto = ResultDto.builder()
                .status("ok")
                .result(1)
                .uploadFileName(newFileName)
                .build();

        return resultDto;
    }


    // (관리자) 상품 정보 수정 폼
    @PostMapping("/itemUpdateForm")
    public ResultDto itemUpdateForm(@RequestBody ItemDto itemDto) {
        if (itemDto.getItemImageUrl().startsWith("./upload/")) {
            // 이미지를 수정하지 않았을 경우 기존 이미지를 사용하도록 설정
            itemDto.setItemImageUrl(itemDto.getItemImageUrl().substring(2)); // "./upload/" 제거
        } else {
            // 이미지를 수정했을 경우, 업로드된 새 이미지 경로로 설정
            itemDto.setItemImageUrl("./upload/" + itemDto.getItemImageUrl());
        }

        ItemEntity itemEntity = ItemEntity.toItemEntity(itemDto);
        ItemEntity newEntity = itemRepository.save(itemEntity);

        ResultDto resultDto = (newEntity != null)
                ? ResultDto.builder().status("ok").result(1).build() // 수정 성공
                : ResultDto.builder().status("ok").result(0).build(); // 수정 실패

        return resultDto;
    }

    // (관리자) 상품 등록 폼
    @PostMapping("/itemRegiForm")
    public ResultDto itemRegiForm(@RequestBody ItemDto itemDto) {
        if (itemDto.getItemImageUrl().startsWith("./upload/")) {
            // 이미지를 수정하지 않았을 경우 기존 이미지를 사용하도록 설정
            itemDto.setItemImageUrl(itemDto.getItemImageUrl().substring(2)); // "./upload/" 제거
        } else {
            // 이미지를 수정했을 경우, 업로드된 새 이미지 경로로 설정
            itemDto.setItemImageUrl("./upload/" + itemDto.getItemImageUrl());
        }

        ItemEntity itemEntity = ItemEntity.toItemEntity(itemDto);
        ItemEntity newEntity = itemRepository.save(itemEntity);

        ResultDto resultDto = (newEntity != null)
                ? ResultDto.builder().status("ok").result(1).build() // 수정 성공
                : ResultDto.builder().status("ok").result(0).build(); // 수정 실패

        return resultDto;
    }


    // ( 관리자 ) 주문 정보 수정 폼
    @PostMapping("/orderUpdateForm")
    public ResultDto orderUpdateForm(@RequestBody OrderDto orderDto) {
        OrderEntity orderEntity = OrderEntity.toOrderEntity(orderDto);
        OrderEntity newEntity = orderRepository.save(orderEntity);

        ResultDto resultDto = null;

        resultDto = ResultDto.builder()
                .status("ok")
                .result(1)
                .build();

        return resultDto;
    }

    // ( 관리자 ) 공지 정보 수정 폼
    @PostMapping("/noticeUpdateForm")
    public ResultDto noticeUpdateForm(@RequestBody NoticeDto noticeDto) {
        if (noticeDto.getNoticeImage().startsWith("./upload/")) {
            // 이미지를 수정하지 않았을 경우 기존 이미지를 사용하도록 설정
            noticeDto.setNoticeImage(noticeDto.getNoticeImage().substring(2)); // "./upload/" 제거
        } else {
            // 이미지를 수정했을 경우, 업로드된 새 이미지 경로로 설정
            noticeDto.setNoticeImage("./upload/" + noticeDto.getNoticeImage());
        }

        NoticeEntity noticeEntity = NoticeEntity.toNoticeEntity(noticeDto);
        NoticeEntity newEntity = noticeRepository.save(noticeEntity);

        ResultDto resultDto = (newEntity != null)
                ? ResultDto.builder().status("ok").result(1).build() // 수정 성공
                : ResultDto.builder().status("ok").result(0).build(); // 수정 실패

        return resultDto;
    }

    // ( 관리자 ) 공지사항 등록 폼
    @PostMapping("/noticeRegiForm")
    public ResultDto noticeRegiForm(@RequestBody NoticeDto noticeDto) {
        if (noticeDto.getNoticeImage().startsWith("./upload/")) {
            // 이미지를 수정하지 않았을 경우 기존 이미지를 사용하도록 설정
            noticeDto.setNoticeImage(noticeDto.getNoticeImage().substring(2)); // "./upload/" 제거
        } else {
            // 이미지를 수정했을 경우, 업로드된 새 이미지 경로로 설정
            noticeDto.setNoticeImage("./upload/" + noticeDto.getNoticeImage());
        }

        NoticeEntity noticeEntity = NoticeEntity.toNoticeEntity(noticeDto);
        NoticeEntity newEntity = noticeRepository.save(noticeEntity);

        ResultDto resultDto = (newEntity != null)
                ? ResultDto.builder().status("ok").result(1).build() // 수정 성공
                : ResultDto.builder().status("ok").result(0).build(); // 수정 실패

        return resultDto;
    }

    // ( 관리자 ) 이벤트 정보 수정 폼
    @PostMapping("/eventUpdateForm")
    public ResultDto eventUpdateForm(@RequestBody EventDto eventDto) {
        if (eventDto.getEventImage().startsWith("./upload/")) {
            // 이미지를 수정하지 않았을 경우 기존 이미지를 사용하도록 설정
            eventDto.setEventImage(eventDto.getEventImage().substring(2)); // "./upload/" 제거
        } else {
            // 이미지를 수정했을 경우, 업로드된 새 이미지 경로로 설정
            eventDto.setEventImage("./upload/" + eventDto.getEventImage());
        }

        EventEntity eventEntity = EventEntity.toEventEntity(eventDto);
        EventEntity newEntity = eventRepository.save(eventEntity);

        ResultDto resultDto = (newEntity != null)
                ? ResultDto.builder().status("ok").result(1).build() // 수정 성공
                : ResultDto.builder().status("ok").result(0).build(); // 수정 실패

        return resultDto;
    }

    // ( 관리자 ) 공지사항 등록 폼
    @PostMapping("/eventRegiForm")
    public ResultDto eventRegiForm(@RequestBody EventDto eventDto) {
        if (eventDto.getEventImage().startsWith("./upload/")) {
            // 이미지를 수정하지 않았을 경우 기존 이미지를 사용하도록 설정
            eventDto.setEventImage(eventDto.getEventImage().substring(2)); // "./upload/" 제거
        } else {
            // 이미지를 수정했을 경우, 업로드된 새 이미지 경로로 설정
            eventDto.setEventImage("./upload/" + eventDto.getEventImage());
        }

        EventEntity eventEntity = EventEntity.toEventEntity(eventDto);
        EventEntity newEntity = eventRepository.save(eventEntity);

        ResultDto resultDto = (newEntity != null)
                ? ResultDto.builder().status("ok").result(1).build() // 수정 성공
                : ResultDto.builder().status("ok").result(0).build(); // 수정 실패

        return resultDto;
    }

    // ( 사용자 ) 회원 정보 수정 폼 - 닉네임 변경
    @PostMapping("/manageForm")
    public ResultDto manageForm(@RequestBody MemberDto memberDto,
                                HttpServletRequest request) {
        String loginId = (String) request.getSession().getAttribute("loginId");
        if (loginId != null) {
            List<MemberEntity> list = memberRepository.findByMemberId(loginId);
            if (list.size() > 0) {
                MemberEntity memberEntity = list.get(0);
                // 닉네임 변경
                memberEntity.setMemberName(memberDto.getMemberName());
                MemberEntity newEntity = memberRepository.save(memberEntity);
            }
        }

        ResultDto resultDto = null;

        resultDto = ResultDto.builder()
                .status("ok")
                .result(1)
                .build();

        return resultDto;
    }

    // ( 사용자 ) 로그아웃
    @GetMapping("/logout")
    public ResultDto logout(HttpServletRequest request) {
        // 세션 무효화
        request.getSession().invalidate();

        ResultDto resultDto = ResultDto.builder()
                .status("ok")
                .result(1)
                .build();

        return resultDto;
    }

    // ( 사용자 ) 탈퇴
    @GetMapping("/withdrawalForm")
    public ResultDto withdrawalForm(HttpServletRequest request) {

        String loginId = (String) request.getSession().getAttribute("loginId");

        ResultDto resultDto = null;

        if (loginId != null) {
            System.out.println("Deleting member with ID: " + loginId);  // Add this line

            // 회원 정보 삭제
            memberRepository.deleteByMemberId(loginId);

            // 세션 무효화
            request.getSession().invalidate();

            resultDto = ResultDto.builder()
                    .status("ok")
                    .result(1)
                    .build();
        }
        return resultDto;
    }
}