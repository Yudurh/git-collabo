package com.springboot.appOrder.controller;
import com.springboot.appOrder.dto.JoinDto;
import com.springboot.appOrder.dto.LoginDto;
import com.springboot.appOrder.dto.MemberDto;
import com.springboot.appOrder.dto.ResultDto;
import com.springboot.appOrder.entity.CartRepository;
import com.springboot.appOrder.entity.MemberEntity;
import com.springboot.appOrder.entity.MemberRepository;
import com.springboot.appOrder.entity.OrderRepository;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Order;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ApiControllerYem {
    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private OrderRepository orderRepository;

    // 로그인 폼
    @PostMapping("/loginAction")
    public ResultDto loginAction(@RequestBody LoginDto loginDto, HttpServletRequest request) {

        //로그인 액션 : 아이디, 암호가 DB에 있으면 로그인 성공, 아니면 실패
        List<MemberEntity> list = memberRepository.findByMemberIdAndMemberPw(
                loginDto.getLoginId(),
                loginDto.getLoginPw()
        );

        ResultDto resultDto = null;

        if( list.size() > 0 ) {
            //로그인 성공
            if( loginDto.getLoginId().equals("admin") ){   //관리자로 로그인하면
                resultDto = ResultDto.builder()
                        .status("ok")
                        .result(2)
                        .build();
            }else{ // 일반 회원으로 로그인하면
                resultDto = ResultDto.builder()
                        .status("ok")
                        .result(1)
                        .build();
            }

            request.getSession().setAttribute("loginId", loginDto.getLoginId());
        }else{
            //로그인 실패
            resultDto = ResultDto.builder()
                    .status("ok")
                    .result(0)
                    .build();
        }

        return resultDto;
    }

    // 회원가입 폼
    @PostMapping("/joinAction")
    public ResultDto joinAction(@RequestBody JoinDto joinDto) {
        System.out.println("loginId:"+joinDto.getLoginId());
        System.out.println("loginPw:"+joinDto.getLoginPw());
        System.out.println("loginName:"+joinDto.getLoginName());

        MemberEntity memberJoinEntity = MemberEntity.toJoinEntity( joinDto );
        MemberEntity newEntity = memberRepository.save(memberJoinEntity);

        ResultDto resultDto = null;

        if( newEntity != null  ) {
            //회원가입 성공
            resultDto = ResultDto.builder()
                    .status("ok")
                    .result(1)
                    .build();
        }else{
            //회원가입 실패
            resultDto = ResultDto.builder()
                    .status("ok")
                    .result(0)
                    .build();
        }

        return resultDto;
    }

    // 회원 정보 수정
    @PostMapping("/memberUpdateForm")
    public ResultDto memberUpdateForm(@RequestBody MemberDto memberDto) {
        MemberEntity memberEntity = MemberEntity.toMemberEntity(memberDto);
        MemberEntity newEntity = memberRepository.save(memberEntity);

        ResultDto resultDto = null;

        if( newEntity != null  ) {
            resultDto = ResultDto.builder()
                    .status("ok")
                    .result(1)
                    .build();
        }else{
            resultDto = ResultDto.builder()
                    .status("ok")
                    .result(0)
                    .build();
        }

        return resultDto;
    }







}
