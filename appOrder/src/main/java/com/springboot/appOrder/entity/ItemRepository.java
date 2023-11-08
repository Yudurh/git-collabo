package com.springboot.appOrder.entity;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemRepository  extends JpaRepository<ItemEntity, Long> {
}
