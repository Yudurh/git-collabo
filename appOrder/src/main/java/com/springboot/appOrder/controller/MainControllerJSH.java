package com.springboot.appOrder.controller;

import com.springboot.appOrder.entity.MemberEntity;
import com.springboot.appOrder.entity.MemberRepository;
import jakarta.servlet.http.HttpServletRequest;
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
    private MemberRepository memberRepository;

    @GetMapping("/menu")
    public String menu(){
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

}
