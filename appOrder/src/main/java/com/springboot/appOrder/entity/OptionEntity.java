package com.springboot.appOrder.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;

@Entity
@Table(name="p_option")
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class OptionEntity {
    @Column(name = "option_no")
    private Long optionNo;
    @Column(name = "option_name")
    private String optionName;
    @Column(name = "option_price")
    private Integer optionPrice;
}
