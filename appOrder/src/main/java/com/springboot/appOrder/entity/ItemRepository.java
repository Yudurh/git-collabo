package com.springboot.appOrder.entity;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ItemRepository  extends JpaRepository<ItemEntity, Long> {

    List<ItemEntity> findByItemRecommend(int recommend);
    // select * from item where item_cate = ?
    List<ItemEntity> findByItemCate(String category);
}
