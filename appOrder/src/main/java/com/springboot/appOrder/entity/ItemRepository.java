package com.springboot.appOrder.entity;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ItemRepository  extends JpaRepository<ItemEntity, Long> {
    List<ItemEntity> findByItemName (String itemName);
    List<ItemEntity> findByItemRecommend(int recommend);
    List<ItemEntity> findByItemCate(String category);
    List<ItemEntity> findByItemNameContaining(String keyword);

}
