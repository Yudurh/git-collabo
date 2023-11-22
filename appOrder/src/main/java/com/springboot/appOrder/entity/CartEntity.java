package com.springboot.appOrder.entity;

import com.springboot.appOrder.dto.CartDto;
import com.springboot.appOrder.dto.ItemDto;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name="cart")
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CartEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cart_no")
    private Long cartNo;
    @Column(name = "cart_code")
    private String cartCode;
    @Column(name = "item_code")
    private String itemCode;
    @Column(name = "item_name")
    private String itemName;
    @Column(name = "option_name_1")
    private String optionName1;
    @Column(name = "option_name_2")
    private String optionName2;
    @Column(name = "option_name_3")
    private String optionName3;
    @Column(name = "cart_price")
    private Integer cartPrice;
    @Column(name = "item_image_url")
    private String itemImageUrl;
    @Column(name = "cart_item_amount")
    private Integer cartItemAmount;
    @Column(name = "cart_date")
    @DateTimeFormat(pattern = "yyyy-MM-ddTHH:mm:ss")
    private LocalDateTime cartDate;


    public static CartEntity toEntity(CartDto dto){

        return CartEntity.builder()
                .cartNo(0L)
                .cartCode(dto.getCartCode())
                .itemCode(dto.getItemCode())
                .itemName(dto.getItemName())
                .optionName1(dto.getOptionName1())
                .optionName2(dto.getOptionName2())
                .optionName3(dto.getOptionName3())
                .cartPrice(dto.getCartPrice())
                .itemImageUrl(dto.getItemImageUrl())
                .cartItemAmount(dto.getCartItemAmount())
                .cartDate(dto.getCartDate())
                .build();
    }


    public static CartEntity ItemToCart(ItemDto dto){

        String uuidOne = String.valueOf(UUID.randomUUID());
        return CartEntity.builder()
                .cartNo(0L)
                .cartCode(uuidOne)
                .itemCode(dto.getItemCode())
                .itemName(dto.getItemName())
                .optionName1("해당없음")
                .optionName2("해당없음")
                .optionName3("해당없음")
                .cartPrice(dto.getItemPrice())
                .itemImageUrl(dto.getItemImageUrl())
                .cartItemAmount(1)
                .cartDate(LocalDateTime.now())
                .build();
    }
}
