package com.springboot.appOrder.dto;

import com.springboot.appOrder.entity.MemberEntity;
import lombok.*;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class JoinDto {
    private String loginId;
    private String loginPw;
    private String loginName;

    public static JoinDto toJoinDto(MemberEntity entity){
        return JoinDto.builder()
            .loginId(entity.getMemberId())
            .loginPw(entity.getMemberPw())
            .loginName(entity.getMemberName())
            .build();
    }
}
