package com.springboot.appOrder.entity;

import com.springboot.appOrder.dto.JoinDto;
import com.springboot.appOrder.dto.MemberDto;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

@Entity
@Table(name="member")
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MemberEntity {

    @Id  //기본키로 설정
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_no")
    private Long memberNo;
    @Column(name = "member_id")
    private String memberId;
    @Column(name = "member_pw")
    private String memberPw;
    @Column(name = "member_name")
    private String memberName;
    @Column(name = "member_role")
    private String memberRole; //권한 "admin" "user"
    @Column(name = "member_point")
    private Integer memberPoint;
    @Column(name = "member_join_datetime")
    @DateTimeFormat(pattern = "yyyy-MM-ddTHH:mm:ss")
    private LocalDateTime memberJoinDatetime; //가입일 "2023-10-12"

    public static MemberEntity toJoinEntity(JoinDto dto){
        return MemberEntity.builder()
                .memberNo(0L)
                .memberId(dto.getLoginId())
                .memberPw(dto.getLoginPw())
                .memberName(dto.getLoginName())
                .memberRole("ROLE_USER")
                .memberPoint(0)
                .memberJoinDatetime(LocalDateTime.now())
                .build();
    }
    public static MemberEntity toMemberEntity(MemberDto dto){
        return MemberEntity.builder()
                .memberNo(dto.getMemberNo())
                .memberId(dto.getMemberId())
                .memberPw(dto.getMemberPw())
                .memberName(dto.getMemberName())
                .memberRole(dto.getMemberRole())
                .memberPoint(dto.getMemberPoint())
                .memberJoinDatetime(dto.getMemberJoinDatetime())
                .build();
    }

}
