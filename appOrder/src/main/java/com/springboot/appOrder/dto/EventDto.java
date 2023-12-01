package com.springboot.appOrder.dto;

import com.springboot.appOrder.entity.EventEntity;
import com.springboot.appOrder.entity.NoticeEntity;
import lombok.*;

import java.time.LocalDateTime;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class EventDto {
    private Long eventNo;
    private String eventUser;
    private String eventTitle;
    private String eventContent;
    private String eventImage;
    private LocalDateTime eventDatetime;

    public static EventDto toEventDto(EventEntity entity){
        return EventDto.builder()
                .eventNo(entity.getEventNo())
                .eventUser(entity.getEventUser())
                .eventTitle(entity.getEventTitle())
                .eventContent(entity.getEventContent())
                .eventDatetime(entity.getEventDatetime())
                .eventImage(entity.getEventImage())
                .build();
    }
}
