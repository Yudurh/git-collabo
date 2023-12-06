package com.springboot.appOrder.entity;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface Cart2Repository extends JpaRepository<Cart2Entity, Long> {
    List<CartEntity> findByItemName(String itemName);
}
