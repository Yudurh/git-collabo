package com.springboot.appOrder.entity;

import com.springboot.appOrder.dto.EventDto;
import com.springboot.appOrder.dto.NoticeDto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepository extends JpaRepository<EventEntity, Long> {
}
