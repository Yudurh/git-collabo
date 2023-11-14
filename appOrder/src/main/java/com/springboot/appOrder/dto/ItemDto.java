package com.springboot.appOrder.dto;

import com.springboot.appOrder.entity.ItemEntity;
import com.springboot.appOrder.entity.MemberEntity;
import lombok.*;

import java.time.LocalDateTime;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ItemDto {
    private Long itemNo;
    private String itemCode;
    private String itemName;
    private String itemContent;
    private String itemCate;
    private Integer item_recommend;
    private Integer itemPrice;
    private String itemImageUrl;
    private LocalDateTime itemUpdateDatetime;

    public static ItemDto toDto(ItemEntity entity){
        return ItemDto.builder()
                .itemNo(entity.getItemNo())
                .itemCode(entity.getItemCode())
                .itemName(entity.getItemName())
                .itemContent(entity.getItemContent())
                .itemCate(entity.getItemCate())
                .item_recommend(entity.getItemRecommend())
                .itemPrice(entity.getItemPrice())
                .itemImageUrl(entity.getItemImageUrl())
                .itemUpdateDatetime(entity.getItemUpdateDatetime())
                .build();
    }
}
