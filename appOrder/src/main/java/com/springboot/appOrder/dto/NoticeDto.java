package com.springboot.appOrder.dto;

import com.springboot.appOrder.entity.NoticeEntity;
import lombok.*;

import java.time.LocalDateTime;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class NoticeDto {
    private Long noticeNo;
    private String noticeUser;
    private String noticeTitle;
    private String noticeContent;
    private String noticeImage;
    private LocalDateTime noticeDatetime;

    public static NoticeDto toNoticeDto(NoticeEntity entity){
        return NoticeDto.builder()
                .noticeNo(entity.getNoticeNo())
                .noticeUser(entity.getNoticeUser())
                .noticeTitle(entity.getNoticeTitle())
                .noticeContent(entity.getNoticeContent())
                .noticeDatetime(entity.getNoticeDatetime())
                .noticeImage(entity.getNoticeImage())
                .noticeImage(entity.getNoticeImage())
                .build();
    }
}
