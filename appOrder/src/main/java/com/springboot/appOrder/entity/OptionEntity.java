package com.springboot.appOrder.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name="p_option")
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class OptionEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "option_no")
    private Long optionNo;
    @Column(name = "option_item_cate")
    private String optionItemCate;
    @Column(name = "option_name")
    private String optionName;
    @Column(name = "option_price")
    private Integer optionPrice;
}
