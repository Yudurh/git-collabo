package com.springboot.appOrder.entity;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CartRepository extends JpaRepository<CartEntity, Long> {
    List<CartEntity> findByItemNameAndOptionName3AndOptionName2AndOptionName1 (String itemName,String optionName3,String optionName2,String optionName1  );
    List<CartEntity> findByItemName(String itemName);
}
