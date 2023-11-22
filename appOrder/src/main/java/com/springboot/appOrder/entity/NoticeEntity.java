package com.springboot.appOrder.entity;

import com.springboot.appOrder.dto.NoticeDto;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name="notice")
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class NoticeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "notice_no")
    private Long noticeNo;
    @Column(name = "notice_cate")
    private Integer noticeCate;
    @Column(name = "notice_user")
    private String noticeUser;
    @Column(name = "notice_title")
    private String noticeTitle;
    @Column(name = "notice_content")
    private String noticeContent;
    @Column(name = "notice_image_url")
    private String noticeImage;
    @Column(name = "notice_datetime")
    private LocalDateTime noticeDatetime;

    public static NoticeEntity toNoticeEntity(NoticeDto dto){
        return NoticeEntity.builder()
                .noticeNo(dto.getNoticeNo())
                .noticeCate(dto.getNoticeCate())
                .noticeUser(dto.getNoticeUser())
                .noticeTitle(dto.getNoticeTitle())
                .noticeContent(dto.getNoticeContent())
                .noticeImage(dto.getNoticeImage())
                .noticeDatetime(dto.getNoticeDatetime())
                .build();
    }
}
