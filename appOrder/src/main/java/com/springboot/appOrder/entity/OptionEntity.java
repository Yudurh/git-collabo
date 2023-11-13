package com.springboot.appOrder.entity;

import com.springboot.appOrder.dto.MemberDto;
import com.springboot.appOrder.dto.OptionDto;
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
    @Column(name = "option_cate")
    private String optionCate;
    @Column(name = "option_name")
    private String optionName;
    @Column(name = "option_price")
    private Integer optionPrice;

    public static OptionEntity toOptionEntity(OptionDto dto){
        return OptionEntity.builder()
                .optionNo(dto.getOptionNo())
                .optionItemCate(dto.getOptionCate())
                .optionCate(dto.getOptionCate())
                .optionName(dto.getOptionName())
                .optionPrice(dto.getOptionPrice())
                .build();
    }
}
