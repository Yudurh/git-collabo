DROP DATABASE IF EXISTS apporder;
CREATE DATABASE apporder;
USE apporder;

-- 상품 테이블
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

INSERT INTO item VALUES(NULL, '14d9017d-9fb1-42b8-982b-243125457b66', '왕할메가커피', '우리 할머니께서 즐겨드시던 달달한 믹스 커피 스타일로 만든 메가MGC커피만의 메가사이즈 커피 음료',
        '커피(ICE)', 0, 3000, 'https://img.79plus.co.kr/megahp/manager/upload/menu/20230905185855_1693907935536_aXkP_SjplJ.jpg', DEFAULT);
INSERT INTO item VALUES(NULL, '13c5023f-d8cb-44f5-91fd-2afefcc64a3c', '할메가커피', '우리 할머니께서 즐겨드시던 달달한 믹스 커피 스타일로 만든 메가MGC커피만의 시원한 커피 음료',
        '커피(ICE)', 0, 2500, 'https://img.79plus.co.kr/megahp/manager/upload/menu/20230905185615_1693907775304_fenhtXqy4y.jpg', DEFAULT);
INSERT INTO item VALUES(NULL, 'd70a2c3a-24a1-4c85-a721-77bfabd39d2a', '디카페인 헤이즐넛 아메리카노', '디카페인 아메리카노에 헤이즐넛의 풍성한 향과 달콤함을 담아 향긋하고 부드럽게 즐기는 커피',
        '커피(HOT)', 0, 2000, 'https://img.79plus.co.kr/megahp/manager/upload/menu/20230217162028_1676618428061_TbHsToNMcN.jpg', DEFAULT);
INSERT INTO item VALUES(NULL, '3fde9a4c-cd2d-4d36-a99e-9d6f7ad454c1', '디카페인 바닐라 아메리카노', '디카페인 아메리카노에 바닐라의 부드러운 향과 달콤함을 조화롭게 담아낸 커피',
        '커피(HOT)', 0, 2000, 'https://img.79plus.co.kr/megahp/manager/upload/menu/20230217162028_1676618428061_TbHsToNMcN.jpg', DEFAULT);
INSERT INTO item VALUES(NULL, '2fa72da6-c7ad-4b0f-9242-99aad1c43b0d', '에스프레소', '메가MGC커피 원두의 향미를 온전히 즐길 수 있는 에스프레소',
        '커피(HOT)', 0, 1500, 'https://img.79plus.co.kr/megahp/manager/upload/menu/20220818143216_1660800736386_C007eosz5G.jpg', DEFAULT);
SELECT * FROM item;


-- 장바구니 테이블
DROP TABLE if EXISTS cart;
CREATE TABLE cart (
    cart_no INT AUTO_INCREMENT NOT NULL PRIMARY KEY, -- 고유키
   cart_code VARCHAR(255) NOT NULL , -- 장바구니 코드(UUID포맷-32자리)
   item_code VARCHAR(255) NOT NULL , -- 상품 코드(UUID포맷-32자리)
    item_name TEXT NOT NULL, -- 상품이름;
    item_image_url TEXT NOT NULL, -- 이미지
    cart_price INT(255) NOT NULL, -- 가격
    option_name_1 VARCHAR(255) NOT NULL DEFAULT ('해당없음'),
	 option_name_2 VARCHAR(255) NOT NULL DEFAULT ('해당없음'),
	 option_name_3 VARCHAR(255) NOT NULL DEFAULT ('해당없음'), -- 옵션이름
    cart_item_amount INT(255) NOT NULL, -- 구매갯수
    cart_date DATETIME DEFAULT NOW() -- 장바구니에 담긴 시간/날짜
);

INSERT INTO cart VALUES (NULL, '222e4567-e89b-12d3-b456-556642440113', '456e4567-e89b-12d3-a456-556642440003', '스모어 카라멜쿠키',
'https://img.79plus.co.kr/megahp/manager/upload/menu/20231025193235_1698229955914_EH9HF0a_7U.jpg', 1100, DEFAULT, DEFAULT, DEFAULT, 1, DEFAULT);

INSERT INTO cart VALUES (NULL, '333e4567-e89b-12d3-b456-556642440113', '123e4567-e89b-12d3-a456-556642440003', '왕할메가커피',
'https://img.79plus.co.kr/megahp/manager/upload/menu/20230905185615_1693907775304_fenhtXqy4y.jpg', 2200, DEFAULT, DEFAULT, DEFAULT, 1, DEFAULT);

SELECT * FROM cart;


-- 주문 테이블
DROP TABLE if EXISTS `order`;
CREATE TABLE `order` (
    order_no INT AUTO_INCREMENT PRIMARY KEY, -- 고유키
    order_code VARCHAR(255) NOT NULL UNIQUE, -- 주문코드(UUID포맷-32자리)
      -- 구매상품 정보
    cart_item_code_1 VARCHAR(255) NOT NULL UNIQUE, -- 상품코드1(UUID포맷-32자리) -> 카트 코드
    cart_item_code_2 VARCHAR(255) UNIQUE, -- 상품코드2(UUID포맷-32자리)
    cart_item_code_3 VARCHAR(255) UNIQUE, -- 상품코드3(UUID포맷-32자리)
    cart_item_code_4 VARCHAR(255) UNIQUE, -- 상품코드4(UUID포맷-32자리)
    cart_item_code_5 VARCHAR(255) UNIQUE, -- 상품코드5(UUID포맷-32자리)

    order_total_price INT NOT NULL, -- 주문 총금액
    order_total_count TINYINT NOT NULL, -- 주문 상품 개수(최대 5개)
    -- 주문자/수령자 정보
    order_number INT NOT NULL, -- 주문자 임시번호(0 ~ 999)
    -- 결제방법
    order_pay_type INT DEFAULT(1) NOT NULL, -- 0 현금 또는 1 카드
    -- 주문상태
    -- 결제완료 -> 상품 준비중 -> 상품 준비완료 -> 수령 완료 or 기한후 폐기
	 order_state VARCHAR(255) NOT NULL UNIQUE,
    order_datetime DATETIME DEFAULT NOW() -- 결제시간
);

INSERT INTO `order` VALUES (NULL, '4444e4567-e89b-12d3-b456-556642440113', '5555e4567-e89b-12d3-a456-556642441111',
NULL, NULL, NULL, NULL, 5000, 2, 10, DEFAULT, '결제 완료', DEFAULT);


SELECT * FROM `order`;


-- 회원 테이블
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
        '홍길동', 'ROLE_USER', 6, DEFAULT);
INSERT INTO apporder.member VALUES(NULL, 'lee', '0000',
        '이순신', 'ROLE_USER', 4, DEFAULT);



SELECT * FROM apporder.member;



-- 옵션 테이블
DROP TABLE if EXISTS apporder.p_option;
CREATE TABLE apporder.p_option(
   option_no INT AUTO_INCREMENT NOT NULL PRIMARY KEY, -- 고유키
   option_item_cate VARCHAR(255) NOT NULL,
   option_cate VARCHAR(255) NOT NULL, -- 옵션 카테고리
   option_name VARCHAR(255) NOT NULL, -- 옵션 이름
   option_price int(255) NOT NULL DEFAULT('0') -- 옵션 가격
);

INSERT INTO apporder.p_option VALUES(NULL, '커피', '농도', '연하게', DEFAULT);
INSERT INTO apporder.p_option VALUES(NULL, '커피', '농도', '해당없음', DEFAULT);
INSERT INTO apporder.p_option VALUES(NULL, '커피', '농도', '샷 추가', 500);
INSERT INTO apporder.p_option VALUES(NULL, '커피', '농도', '2샷 추가', 1000);
INSERT INTO apporder.p_option VALUES(NULL, '커피', '꿀 추가', '꿀 추가', 700);
INSERT INTO apporder.p_option VALUES(NULL, '커피', '꿀 추가', '해당없음', DEFAULT);
INSERT INTO apporder.p_option VALUES(NULL, '커피', '개인 텀블러 사용' ,'텀블러(개인컵) 사용', DEFAULT);
INSERT INTO apporder.p_option VALUES(NULL, '커피', '개인 텀블러 사용', '해당없음', DEFAULT);
INSERT INTO apporder.p_option VALUES(NULL, '음료수', '개인 텀블러 사용' , '텀블러(개인컵) 사용', DEFAULT);
INSERT INTO apporder.p_option VALUES(NULL, '음료수', '개인 텀블러 사용' , '해당없음', DEFAULT);



SELECT * FROM apporder.p_option;



-- 공지사항 테이블
DROP TABLE if EXISTS notice;
CREATE TABLE notice(
   notice_no INT AUTO_INCREMENT NOT NULL PRIMARY KEY, -- 고유키
   notice_user VARCHAR(255) NOT NULL, -- 작성자
   notice_title VARCHAR(255) NOT NULL, -- 제목
   notice_content VARCHAR(255) NOT NULL, -- 내용
   notice_datetime DATETIME DEFAULT NOW(), -- 작성/수정 시간
   notice_image_url TEXT NOT NULL -- 이미지
);

INSERT INTO notice VALUES(NULL, 'admin', '정수현 집념의 남자', '집념의 남자라는 둥 뭐라 둥',
DEFAULT, 'http://img.79plus.co.kr/megahp/manager/upload/bbs/202311071550131533460215.jpg');

SELECT * FROM notice;



-- 이벤트 테이블
DROP TABLE if EXISTS event;
CREATE TABLE event(
   event_no INT AUTO_INCREMENT NOT NULL PRIMARY KEY, -- 고유키
   event_user VARCHAR(255) NOT NULL, -- 작성자
   event_title VARCHAR(255) NOT NULL, -- 제목
   event_content VARCHAR(255) NOT NULL, -- 내용
   event_datetime DATETIME DEFAULT NOW(), -- 작성/수정 시간
   event_image_url TEXT NOT NULL -- 이미지
);

INSERT INTO event VALUES(NULL,'admin', '[이벤트]메가MGC커피 X CJONE, MEGA ONE DAY', '이벤트글',
DEFAULT, 'http://img.79plus.co.kr/megahp/manager/upload/bbs/202311071550131533460215.jpg');
INSERT INTO event VALUES(NULL,'admin', '[이벤트]겨울시즌 오픈기념 이벤트', '이벤트글',
DEFAULT, 'http://img.79plus.co.kr/megahp/manager/upload/bbs/202310260947041163410733.jpg');
INSERT INTO event VALUES(NULL,'admin', '[이벤트]메가MGC커피 X 카카오페이, 5,000원 결제시 500원 즉시 할인!', '이벤트글',
DEFAULT, 'http://img.79plus.co.kr/megahp/manager/upload/bbs/202310231602261447755798.png');
INSERT INTO event VALUES(NULL,'admin', '[이벤트]9~12월 메가MGC커피 X 하나페이 적립 EVENT', '이벤트글',
DEFAULT, 'http://img.79plus.co.kr/megahp/manager/upload/bbs/20230925152421656240179.jpg');
INSERT event VALUES(NULL,'admin', '[이벤트]메가MGC커피 X 우주패스 가입 혜택 EVENT(10/1~)', '이벤트글',
DEFAULT, 'http://img.79plus.co.kr/megahp/manager/upload/bbs/2023092515271929366099.png');


SELECT * FROM event;