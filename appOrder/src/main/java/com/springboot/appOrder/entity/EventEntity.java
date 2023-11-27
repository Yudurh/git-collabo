package com.springboot.appOrder.entity;

import com.springboot.appOrder.dto.EventDto;
import com.springboot.appOrder.dto.NoticeDto;
import jakarta.persistence.*;
import jdk.jfr.Event;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name="event")
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class EventEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "event_no")
    private Long eventNo;
    @Column(name = "event_user")
    private String eventUser;
    @Column(name = "event_title")
    private String eventTitle;
    @Column(name = "event_content")
    private String eventContent;
    @Column(name = "event_image_url")
    private String eventImage;
    @Column(name = "event_datetime")
    private LocalDateTime eventDatetime;

    public static EventEntity toEventEntity(EventDto dto){
        return EventEntity.builder()
                .eventNo(dto.getEventNo())
                .eventUser(dto.getEventUser())
                .eventTitle(dto.getEventTitle())
                .eventContent(dto.getEventContent())
                .eventImage(dto.getEventImage())
                .eventDatetime(dto.getEventDatetime())
                .build();
    }
}
