DROP DATABASE IF EXISTS apporder;
CREATE DATABASE apporder;
USE apporder;

--상품 정보
DROP TABLE if EXISTS item;
CREATE TABLE item(
    item_no INT AUTO_INCREMENT NOT NULL PRIMARY KEY, -- 고유키
   item_code VARCHAR(255) NOT NULL UNIQUE, -- 상품 코드(UUID포맷-32자리)
   item_name VARCHAR(255) NOT NULL, -- 상품이름
   item_content VARCHAR(255) NOT NULL, -- 상품 상세정보
    item_cate VARCHAR(255) NOT NULL, -- 카테고리
    item_recommend INT DEFAULT(0) NOT NULL, -- 추천메뉴 1 추천 0 추천아님
    item_price INT(255) NOT NULL, -- 가격
    item_image_url TEXT NOT NULL, -- 이미지
    item_update_datetime DATETIME DEFAULT NOW() -- 작성/수정 시간
);

INSERT INTO item VALUES(NULL, '456e4567-e89b-12d3-a456-556642440003', '스모어 카라멜쿠키', '스모어가 들어간 카라멜 쿠키 스무디',
        '음료수', 1, 1100, 'https://img.79plus.co.kr/megahp/manager/upload/menu/20231025193235_1698229955914_EH9HF0a_7U.jpg', DEFAULT);

INSERT INTO item VALUES(NULL, '123e4567-e89b-12d3-a456-556642440003', '왕할메가커피', '왕할머니가 만들어준 커피',
        '커피', 0, 1100, 'https://img.79plus.co.kr/megahp/manager/upload/menu/20230905185615_1693907775304_fenhtXqy4y.jpg', DEFAULT);

SELECT * FROM item;

--장바구니안에 들어가는 물건 한개에 대한 정보
DROP TABLE if EXISTS cart;
CREATE TABLE cart (
    cart_no INT AUTO_INCREMENT NOT NULL PRIMARY KEY, -- 고유키
   cart_code VARCHAR(255) NOT NULL , -- 장바구니 코드(UUID포맷-32자리)
   item_code VARCHAR(255) NOT NULL , -- 상품 코드(UUID포맷-32자리)
    item_name TEXT NOT NULL, -- 상품이름;
    item_image_url TEXT NOT NULL, -- 이미지
    cart_price INT(255) NOT NULL, -- 가격
    option_name VARCHAR(255) NOT NULL DEFAULT ('해당없음'), -- 옵션이름
    cart_item_amount INT(255) NOT NULL, -- 구매갯수
    cart_date DATETIME DEFAULT NOW() -- 장바구니에 담긴 시간/날짜
);

INSERT INTO cart VALUES (NULL, '222e4567-e89b-12d3-b456-556642440113', '456e4567-e89b-12d3-a456-556642440003', '스모어 카라멜쿠키',
'https://img.79plus.co.kr/megahp/manager/upload/menu/20231025193235_1698229955914_EH9HF0a_7U.jpg', 1100, '해당없음', 1, DEFAULT);

INSERT INTO cart VALUES (NULL, '333e4567-e89b-12d3-b456-556642440113', '123e4567-e89b-12d3-a456-556642440003', '왕할메가커피',
'https://img.79plus.co.kr/megahp/manager/upload/menu/20230905185615_1693907775304_fenhtXqy4y.jpg', 2200, '해당없음', 1, DEFAULT);

SELECT * FROM cart;


-- 결제정보
DROP TABLE if EXISTS `order`;
CREATE TABLE `order` (
    order_no INT AUTO_INCREMENT PRIMARY KEY, -- 고유키
    order_code VARCHAR(255) NOT NULL UNIQUE, -- 주문코드(UUID포맷-32자리)
      -- 구매상품 정보
    cart_item_code_1 VARCHAR(255) NOT NULL UNIQUE, -- 상품코드1(UUID포맷-32자리)
    cart_item_code_2 VARCHAR(255) UNIQUE, -- 상품코드2(UUID포맷-32자리)
    cart_item_code_3 VARCHAR(255) UNIQUE, -- 상품코드3(UUID포맷-32자리)
    cart_item_code_4 VARCHAR(255) UNIQUE, -- 상품코드4(UUID포맷-32자리)
    cart_item_code_5 VARCHAR(255) UNIQUE, -- 상품코드5(UUID포맷-32자리)

    order_total_price INT NOT NULL, -- 주문 총금액
    order_total_count TINYINT NOT NULL, -- 주문 상품 개수(최대 5개)
    -- 주문자/수령자 정보
    order_number INT NOT NULL, -- 주문자 임시번호(0 ~ 999)
    -- 결제방법
    order_pay_type INT DEFAULT(1) NOT NULL, -- 01 신용카드 또는 02 간편결제
    -- 주문상태
    -- 결제완료 -> 상품 준비중 -> 상품 준비완료 -> 수령 완료 or 기한후 폐기
    order_datetime DATETIME DEFAULT NOW() -- 결제시간
);


DROP TABLE if EXISTS apporder.member;
CREATE TABLE apporder.member(
   member_no INT AUTO_INCREMENT NOT NULL PRIMARY KEY, -- 고유키
   member_id VARCHAR(255) NOT NULL UNIQUE, -- 아이디
   member_pw VARCHAR(255) NOT NULL, -- 암호
    member_name VARCHAR(255) NOT NULL, -- 이름
    member_role VARCHAR(255) DEFAULT('ROLE_USER') NOT NULL, -- 권한
    member_point INT DEFAULT(0), -- 적립금
   member_join_datetime DATETIME DEFAULT NOW() -- 작성/수정 시간
);

INSERT INTO apporder.member VALUES(NULL, 'admin', '1234',
        '관리자', 'ROLE_ADMIN', DEFAULT, DEFAULT);
INSERT INTO apporder.member VALUES(NULL, 'hong', '1111',
        '홍길동', 'ROLE_USER', DEFAULT, DEFAULT);
INSERT INTO apporder.member VALUES(NULL, 'lee', '0000',
        '이순신', 'ROLE_USER', DEFAULT, DEFAULT);



SELECT * FROM apporder.member;



DROP TABLE if EXISTS apporder.p_option;
CREATE TABLE apporder.p_option(
   option_no INT AUTO_INCREMENT NOT NULL PRIMARY KEY, -- 고유키
   option_item_cate VARCHAR(255) NOT NULL,
   option_cate VARCHAR(255) NOT NULL, -- 옵션 카테고리
   option_name VARCHAR(255) NOT NULL, -- 옵션 이름
   option_price int(255) NOT NULL DEFAULT('0') -- 옵션 가격
);

INSERT INTO apporder.p_option VALUES(NULL, '커피', '농도', '연하게', DEFAULT);
INSERT INTO apporder.p_option VALUES(NULL, '커피', '농도', '샷 추가', 500);
INSERT INTO apporder.p_option VALUES(NULL, '커피', '농도', '2샷 추가', 1000);
INSERT INTO apporder.p_option VALUES(NULL, '커피', '꿀 추가', '꿀 추가', 700);
INSERT INTO apporder.p_option VALUES(NULL, '커피', '개인 텀블러 사용' ,'텀블러(개인컵) 사용', DEFAULT);
INSERT INTO apporder.p_option VALUES(NULL, '음료수', '개인 텀블러 사용' , '텀블러(개인컵) 사용', DEFAULT);




SELECT * FROM apporder.p_option;
