package com.springboot.appOrder.dto;

import com.springboot.appOrder.entity.CartEntity;
import com.springboot.appOrder.entity.ItemEntity;
import jakarta.persistence.Column;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CartDto {
    private Long cartNo;
    private String cartCode;
    private String itemCode;
    private String itemName;
    private String optionName1;
    private String optionName2;
    private String optionName3;
    private Integer cartPrice;
    private String itemImageUrl;
    private Integer cartItemAmount;
    @DateTimeFormat(pattern = "yyyy-MM-ddTHH:mm:ss")
    private LocalDateTime cartDate;
}

