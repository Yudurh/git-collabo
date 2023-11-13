package com.springboot.appOrder.dto;

import com.springboot.appOrder.entity.ItemEntity;
import com.springboot.appOrder.entity.OptionEntity;
import lombok.*;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class OptionDto {
    private Long optionNo;
    private String optionItemCate;
    private String optionCate;
    private String optionName;
    private Integer optionPrice;

    public static OptionDto toOpionDto(OptionEntity entity){
        return OptionDto.builder()
                .optionNo(entity.getOptionNo())
                .optionItemCate(entity.getOptionItemCate())
                .optionCate(entity.getOptionCate())
                .optionName(entity.getOptionName())
                .optionPrice(entity.getOptionPrice())
                .build();
    }
}
