package com.springboot.appOrder.entity;

import com.springboot.appOrder.dto.ItemDto;
import com.springboot.appOrder.dto.MemberDto;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

@Entity
@Table(name="item")
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ItemEntity {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Column(name = "item_no")
        private Long itemNo;
        @Column(name = "item_code")
        private String itemCode;
        @Column(name = "item_name")
        private String itemName;
        @Column(name = "item_content")
        private String itemContent;
        @Column(name = "item_cate")
        private String itemCate;
        @Column(name = "item_recommend")
        private Integer itemRecommend;
        @Column(name = "item_price")
        private Integer itemPrice;
        @Column(name = "item_image_url")
        private String itemImageUrl;
        @Column(name = "item_update_datetime")
        @DateTimeFormat(pattern = "yyyy-MM-ddTHH:mm:ss")
        private LocalDateTime itemUpdateDatetime;

        public static ItemEntity toItemEntity(ItemDto itemDto){
                return ItemEntity.builder()
                        .itemNo(itemDto.getItemNo())
                        .itemCode(itemDto.getItemCode())
                        .itemName(itemDto.getItemName())
                        .itemContent(itemDto.getItemContent())
                        .itemCate(itemDto.getItemCate())
                        .itemRecommend(itemDto.getItemRecommend())
                        .itemPrice(itemDto.getItemPrice())
                        .itemImageUrl(itemDto.getItemImageUrl())
                        .itemUpdateDatetime(itemDto.getItemUpdateDatetime())
                        .build();

        }

}
