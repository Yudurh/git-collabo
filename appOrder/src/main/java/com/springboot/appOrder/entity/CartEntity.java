package com.springboot.appOrder.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

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
    @Column(name = "item_price")
    private Integer itemPrice;
    @Column(name = "option_name")
    private String optionName;
    @Column(name = "option_price")
    private String optionPrice;
    @Column(name = "item_image_url")
    private String itemImageUrl;
    @Column(name = "cart_item_amount")
    private Integer cartItemAmount;
    @Column(name = "cart_date")
    @DateTimeFormat(pattern = "yyyy-MM-ddTHH:mm:ss")
    private LocalDateTime cartDate;
}
