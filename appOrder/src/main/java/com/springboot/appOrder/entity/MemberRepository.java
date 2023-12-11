package com.springboot.appOrder.entity;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;

import java.lang.reflect.Member;
import java.util.List;

public interface MemberRepository extends JpaRepository<MemberEntity, Long> {

    List<MemberEntity> findByMemberIdAndMemberPw ( String memberId, String memberPw);
    List<MemberEntity> findByMemberId ( String memberId );

    @Transactional
    void deleteByMemberId(String memberId);
}
