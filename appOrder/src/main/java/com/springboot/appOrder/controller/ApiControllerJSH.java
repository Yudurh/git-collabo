package com.springboot.appOrder.controller;

import com.springboot.appOrder.dto.CartDto;
import com.springboot.appOrder.dto.ItemDto;
import com.springboot.appOrder.dto.OrderDto;
import com.springboot.appOrder.dto.ResultDto;
import com.springboot.appOrder.entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
public class ApiControllerJSH {

    @Autowired
    private ItemRepository itemRepository;


    @GetMapping("/itemlist")
    public List<ItemDto> itemList(){

        //엔티티(리스트)는 절대 외부에 직접 반환하지 말 것.
        //엔티티를 직접 수정(setter)이 가해지면, DB도 함께 수정이 되어 버림.
        //엔티티는 직접 DB에 제어할 때만 사용하고, 데이타 전달이나 UI처리는
        //  DTO를 사용해야 된다.

        List<ItemEntity> listEntity = itemRepository.findAll();

        List<ItemDto> listDto = listEntity
                .stream()
                .map(ItemDto::toDto)
                .collect(Collectors.toList());

        return listDto; //json 문자열로 리턴이 된다.
    }
    @GetMapping("/itemlistAll")
    public Map<String, List<ItemDto>> itemlistAll(){
        Map<String, List<ItemDto>> map = new HashMap<>();

        List<ItemEntity> listRecommend = itemRepository.findByItemRecommend(1);
        List<ItemDto> listDtoRecommend = listRecommend
                .stream()
                .map(ItemDto::toDto)
                .collect(Collectors.toList());
        map.put("itemlistRecommand", listDtoRecommend);

        List<ItemEntity> listCate1 = itemRepository.findByItemCate("커피(HOT)");
        List<ItemDto> listDto1 = listCate1
                .stream()
                .map(ItemDto::toDto)
                .collect(Collectors.toList());
        map.put("itemlistCoffeeH", listDto1);

        List<ItemEntity> listCate2 = itemRepository.findByItemCate("커피(ICE)");
        List<ItemDto> listDto2 = listCate2
                .stream()
                .map(ItemDto::toDto)
                .collect(Collectors.toList());
        map.put("itemlistCoffeeI", listDto2);

        List<ItemEntity> listCate3 = itemRepository.findByItemCate("스무디&프라페");
        List<ItemDto> listDto3 = listCate3
                .stream()
                .map(ItemDto::toDto)
                .collect(Collectors.toList());
        map.put("itemlistSF", listDto3);

        List<ItemEntity> listCate4 = itemRepository.findByItemCate("에이드&주스");
        List<ItemDto> listDto4 = listCate4
                .stream()
                .map(ItemDto::toDto)
                .collect(Collectors.toList());
        map.put("itemlistDrink", listDto4);

        List<ItemEntity> listCate5 = itemRepository.findByItemCate("디저트");
        List<ItemDto> listDto5 = listCate5
                .stream()
                .map(ItemDto::toDto)
                .collect(Collectors.toList());
        map.put("itemlistDesert", listDto5);

        return map; //json 문자열로 리턴이 된다.
    }

    @Autowired
    private CartRepository cartRepository;

    @PostMapping("/setCart")
    public ResultDto setCart(@RequestBody CartDto cartDto,
                             Model model){

        List<ItemEntity>searchI = itemRepository.findByItemName(cartDto.getItemName());
        List<CartEntity> searchS = cartRepository.findByItemName("초코스모어쿠키");

        CartEntity newEntity = CartEntity.toEntity(cartDto);
        CartDto newDto = cartDto;



        List<CartEntity>searchC = cartRepository.findByItemNameAndOptionName3AndOptionName2AndOptionName1(cartDto.getItemName(),
                cartDto.getOptionName3(),
                cartDto.getOptionName2(),
                cartDto.getOptionName1());

        if (searchC.size()>0){

            newDto.setCartPrice(searchC.get(0).getCartPrice()+cartDto.getCartPrice());
            newDto.setCartItemAmount(searchC.get(0).getCartItemAmount()+cartDto.getCartItemAmount());
            newEntity = CartEntity.toEntity(newDto);

            cartRepository.deleteById(searchC.get(0).getCartNo());

        }else {
            newEntity = CartEntity.toEntity(cartDto);

        }



        cartRepository.save(newEntity);


        ResultDto resultDto = null;

        if( newEntity != null  ) {
            //포인트 수정 성공
            resultDto = ResultDto.builder()
                    .status("ok")
                    .result(1)
                    .build();
        }else{
            //포인트 수정 실패
            resultDto = ResultDto.builder()
                    .status("ok")
                    .result(0)
                    .build();
        }
        return resultDto;
    }

    @PostMapping("/setCartRecom")
    public ResultDto setCartRecom(@RequestBody ItemDto dto,
                             Model model){
        List<ItemEntity> newEntity = itemRepository.findByItemRecommend(dto.getItemRecommend());
        if (dto.getItemRecommend() == 1) {
            List<CartEntity> searchC = cartRepository.findByItemName("초코스모어쿠키");
            if (searchC.size() == 0){
                ItemDto newDto = ItemDto.toDto(newEntity.get(0));
                CartEntity newEntityC = CartEntity.ItemToCart(newDto);

                if(newEntityC.getCartItemAmount()==1){
                    newEntityC.setCartPrice(newEntityC.getCartPrice()+2500);
                    newEntityC.setCartItemAmount(newEntityC.getCartItemAmount()+1);
                    cartRepository.save(newEntityC);


                }
                else {
                    newEntityC.setCartPrice(newEntityC.getCartPrice()+2500);
                    newEntityC.setCartItemAmount(newEntityC.getCartItemAmount()+1);
                    cartRepository.save(newEntityC);

                }
            }else {
                searchC.get(0).setCartPrice(searchC.get(0).getCartPrice()+2500);
                searchC.get(0).setCartItemAmount(searchC.get(0).getCartItemAmount()+1);

                cartRepository.save(searchC.get(0));
            }
            List<CartEntity> searchC2 = cartRepository.findByItemName("초코스모어쿠키");
            if (searchC2.size()>1){
                cartRepository.deleteById(searchC2.get(0).getCartNo());
            }

        }




        ResultDto resultDto = null;

        if( newEntity != null  ) {
            //포인트 수정 성공
            resultDto = ResultDto.builder()
                    .status("ok")
                    .result(1)
                    .build();
        }else{
            //포인트 수정 실패
            resultDto = ResultDto.builder()
                    .status("ok")
                    .result(0)
                    .build();
        }
        return resultDto;
    }


    @Autowired
    private OrderRepository orderRepository;
    @PostMapping("/setOrder")
    public ResultDto setOrder(@RequestBody OrderDto dto,
                                  Model model){

        OrderEntity newEntity = OrderEntity.toOrderEntity(dto);
        orderRepository.save(newEntity);



        ResultDto resultDto = null;

        if( newEntity != null  ) {
            //포인트 수정 성공
            resultDto = ResultDto.builder()
                    .status("ok")
                    .result(1)
                    .build();
        }else{
            //포인트 수정 실패
            resultDto = ResultDto.builder()
                    .status("ok")
                    .result(0)
                    .build();
        }
        return resultDto;
    }
    @PostMapping("/delData")
    public ResultDto delData(Model model){
        cartRepository.deleteAll();
        orderRepository.deleteAll();


        OrderEntity newEntity = null;
        ResultDto resultDto = null;

        if( newEntity != null  ) {
            //포인트 수정 성공
            resultDto = ResultDto.builder()
                    .status("ok")
                    .result(1)
                    .build();
        }else{
            //포인트 수정 실패
            resultDto = ResultDto.builder()
                    .status("ok")
                    .result(0)
                    .build();
        }
        return resultDto;
    }

    @Autowired
    private Cart2Repository cart2Repository;
    @RequestMapping("/setOrder_2")
    public ResultDto order2(@RequestBody CartDto dto, Model model){

        Cart2Entity newEntity = Cart2Entity.toEntity(dto);
        cart2Repository.save(newEntity);



        ResultDto resultDto = null;
        if( newEntity != null  ) {
            //포인트 수정 성공
            resultDto = ResultDto.builder()
                    .status("ok")
                    .result(1)
                    .build();
        }else{
            //포인트 수정 실패
            resultDto = ResultDto.builder()
                    .status("ok")
                    .result(0)
                    .build();
        }
        return resultDto;
    }




}
