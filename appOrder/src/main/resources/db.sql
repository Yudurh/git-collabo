DROP DATABASE IF EXISTS apporder;
CREATE DATABASE apporder;
USE apporder;

--상품 정보
DROP TABLE if EXISTS item;
CREATE TABLE item(
    item_no INT AUTO_INCREMENT NOT NULL PRIMARY KEY, -- 고유키
   item_code VARCHAR(255) NOT NULL UNIQUE, -- 상품 코드(UUID포맷-32자리)
   item_name VARCHAR(255) NOT NULL, -- 상품이름
    item_cate VARCHAR(255) NOT NULL, -- 카테고리
    item_recommend INT DEFAULT(0) NOT NULL, -- 추천메뉴 1 추천 0 추천아님
    item_price INT(255) NOT NULL, -- 가격
    item_image_url TEXT NOT NULL, -- 이미지
    item_update_datetime DATETIME DEFAULT NOW() -- 작성/수정 시간
);
SELECT * FROM item;
INSERT INTO item VALUES(null, '123e4567-e89b-12d3-a456-556642440000', '커피1',
        '커피', 1, 7800, 'https://www.mcdonalds.co.kr/upload/product/pcList/1614163214488.png', DEFAULT);
INSERT INTO item VALUES(NULL, '456e4567-e89b-12d3-a456-556642440001', '커피2',
        '커피', 1, 5800, 'https://www.mcdonalds.co.kr/upload/product/pcList/1583730880048.png', DEFAULT);
INSERT INTO item VALUES(NULL, '456e4567-e89b-12d3-a456-556642440002', '음료1',
        '음료', 0, 6000, 'https://www.mcdonalds.co.kr/upload/product/pcList/1583730513407.png', DEFAULT);
INSERT INTO item VALUES(NULL, '456e4567-e89b-12d3-a456-556642440003', '디저트1',
        '디저트', 0, 7300, 'https://www.mcdonalds.co.kr/upload/product/pcList/1583730095033.png', DEFAULT);


--장바구니안에 들어가는 물건 한개에 대한 정보
DROP TABLE if EXISTS cart;
CREATE TABLE cart (
    cart_no INT AUTO_INCREMENT NOT NULL PRIMARY KEY, -- 고유키
   cart_code VARCHAR(255) NOT NULL , -- 장바구니 코드(UUID포맷-32자리)
   item_code VARCHAR(255) NOT NULL , -- 상품 코드(UUID포맷-32자리)
    item_name TEXT NOT NULL, -- 상품이름;
    item_image_url TEXT NOT NULL, -- 이미지
    item_price INT(255) NOT NULL, -- 가격
    option_name VARCHAR(255) NOT NULL DEFAULT ('해당없음'), -- 옵션이름
    option_price int(255) NOT NULL DEFAULT(0), -- 옵션 가격
    cart_item_amount INT(255) NOT NULL, -- 구매갯수
    cart_date DATETIME DEFAULT NOW() -- 장바구니에 담긴 시간/날짜
);


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



DROP TABLE if EXISTS apporder.p_option;
CREATE TABLE apporder.p_option(
   option_no INT AUTO_INCREMENT NOT NULL PRIMARY KEY, -- 고유키
   option_item_cate VARCHAR(255) NOT NULL,
   option_name VARCHAR(255) NOT NULL DEFAULT ('해당없음'), -- 아이디
   option_price int(255) NOT NULL DEFAULT('0') -- 암호
);




