package com.springboot.appOrder.entity;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface Cart2Repository extends JpaRepository<Cart2Entity, Long> {
    List<Cart2Entity> findByItemName(String itemName);
    List<Cart2Entity> findByItemNameAndOptionName3AndOptionName2AndOptionName1 (String itemName,String optionName3,String optionName2,String optionName1  );
}
