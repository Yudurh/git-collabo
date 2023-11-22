package com.springboot.appOrder.entity;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OptionRepository extends JpaRepository<OptionEntity, Long> {
    List<OptionEntity> findByOptionItemCate ( String optionItemCate);


}
