// 수정한 회원 정보 전달
function memberUpdate() {
  let memberId = document.getElementById("inputMemberId").value;
  let memberPw = document.getElementById("inputMemberPw").value;
  let memberName = document.getElementById("inputMemberName").value;
  let memberRole = document.getElementById("inputMemberRole").value;
  let memberPoint = document.getElementById("inputMemberPoint").value;
  let memberNo = document.getElementById("memberNo").value;
  let memberJoinDatetime = document.getElementById("memberJoinDatetime").value;

  let params = {
    memberId: memberId,
    memberPw: memberPw,
    memberName: memberName,
    memberRole: memberRole,
    memberPoint: memberPoint,
    memberNo: memberNo,
    memberJoinDatetime: memberJoinDatetime,
  };
  console.log(JSON.stringify(params));

  fetch("/memberUpdateForm", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  })
    .then((response) => {
      console.log("response:" + response);
      console.log("response:" + JSON.stringify(response));
      return response.json();
    }) //HTTP 응답
    .then((json) => {
      console.log("json:" + json);
      console.log("response:" + JSON.stringify(json));

      if (json.result == 1) {
        //회원 정보 수정 성공
        //다음페이지로 이동
        alert("회원 정보를 수정하였습니다.");
        window.location.href = "/adminMemberList";
      } else {
        //회원 정보 수정 성공
        alert("회원 정보를 수정 실패했습니다.");
      }
    }) //실제 데이타
    .catch((error) => {
      console.log(error);
    });
}

// 상품 정보 수정 페이지에서 조회
// ( 추천 ) 라디오 버튼 표시
$(document).ready(function () {
  let itemRecommend = document.getElementById("itemRecommend").value;
  console.log(itemRecommend);

  // itemRecommend = 1 ( 추천), 0 ( 비추천 )
  if (itemRecommend == 1) {
    // $("input:radio[name=recom]")[0] = 추천
    $("input:radio[name=recom]")[0].checked = true;
  } else {
    // $("input:radio[name=recom]")[1] = 비추천
    $("input:radio[name=recom]")[1].checked = true;
  }
});

// ( 옵션 ) 라디오 버튼 표시 -> 해야함

// 이미지 업로드
function onClickUpload() {
  let inputItemImageUrl = document.getElementById("inputItemImageUrl");
  inputItemImageUrl.click();
}

function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      document.getElementById("imgItemImageUrl").src = e.target.result;
    };
    reader.readAsDataURL(input.files[0]);
  } else {
    document.getElementById("imgItemImageUrl").src = "";
  }

  let inputItemImageUrl = document.getElementById("inputItemImageUrl");
  console.log("input:file value:" + inputItemImageUrl.value);
  console.log("files:" + inputItemImageUrl.files[0]);
}

function itemUpdate() {
  image_upload();
}

function image_upload(){

  let inputItemImageUrl = document.getElementById("inputItemImageUrl");
  let newImage = document.getElementById("newImage").value;
  console.log(inputItemImageUrl);
  console.log(newImage);

  let fileUrl = inputItemImageUrl.value; //C:\fakepath\cosmos.jpg
  let index = fileUrl.lastIndexOf("\\");
  let fileName = fileUrl.substr(index+1); //cosmos.jpg
  console.log("fileUrl:" + fileUrl);
  console.log("index:" + index);
  console.log("fileName:" + fileName);

  let form = new FormData();
  form.enctype = "multipart/form-data";
  form.append('file', inputItemImageUrl.files[0], fileName);

  fetch('/upload', {
    method: "POST",
    headers: {
      //"Content-Type": "multipart/form-data"
    },
    body: form,
  })
  .then((response) => {
    console.log("response:" + response);
    console.log("response:" + JSON.stringify(response));

    return response.json();
  }) //HTTP 응답
  .then((json) => {
    //{ status: "ok", result: 5 }
    console.log("json:" + json);
    console.log("json:" + JSON.stringify(json));
    console.log("uploadFileName:" + json.uploadFileName);

    func_item_updateAction_json( json.uploadFileName );
  }) //실제 데이타
  .catch((error) => {
    console.log(error);
  });
}

function func_item_updateAction_json(itemImageUrl) {
  let itemNo = document.getElementById("itemNo").value;
  let itemCode = document.getElementById("itemCode").value;
  let itemName = document.getElementById("inputItemName").value;
  let itemContent = document.getElementById("inputItemContent").value;
  let itemCate = $("#cate").val();
  let itemRecommend = $("input:radio[name=recom]:checked").val();
  let itemPrice = document.getElementById("inputItemPrice").value;
  // let itemImageUrl = document.getElementById("inputItemImageUrl").value;
  let itemUpdateDatetime = document.getElementById("itemUpdateDatetime").value;

  console.log(itemRecommend);
  console.log(itemCate);

  let params = {
    itemNo: itemNo,
    itemCode: itemCode,
    itemName: itemName,
    itemContent: itemContent,
    itemCate: itemCate,
    itemRecommend: itemRecommend,
    itemPrice: itemPrice,
    itemImageUrl: itemImageUrl,
    itemUpdateDatetime: itemUpdateDatetime,
  };
  console.log(JSON.stringify(params));

  fetch("/itemUpdateForm", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  })
    .then((response) => {
      console.log("response:" + response);
      return response.json();
    }) //HTTP 응답
    .then((json) => {
      console.log("json:" + json);

      if (json.result == 1) {
        // 상품 정보 수정 성공
        // 다음페이지로 이동
        alert("상품 정보를 수정하였습니다.");
        window.location.href = "/adminItemList";
      } else {
        // 상품 정보 수정 실패
        alert("상품 정보를 수정 실패했습니다.");
      }
    }) // 실제 데이타
    .catch((error) => {
      console.log(error);
    });
}

// 수정한 주문 정보 전달
function orderUpdate() {
  let orderNo = document.getElementById("orderNo").value;
  let orderCode = document.getElementById("orderCode").value;
  let cartItemCode1 = document.getElementById("cartItemCode1").value;
  let cartItemCode2 = document.getElementById("cartItemCode2").value;
  let cartItemCode3 = document.getElementById("cartItemCode3").value;
  let cartItemCode4 = document.getElementById("cartItemCode4").value;
  let cartItemCode5 = document.getElementById("cartItemCode5").value;
  let orderTotalPrice = document.getElementById("inputOrderTotalPrice").value;
  let orderTotalCount = document.getElementById("inputOrderTotalCount").value;
  let orderNumber = document.getElementById("inputOrderNumber").value;
  // 결제 수단은 db에서 숫자로 들어감 ( 01 현금, 02 카드 )
  let orderPayType = $("#orderPayType").val();
  let orderState = $("#orderState").val();
  let orderDatetime = document.getElementById("inputOrderDatetime").value;

  if (orderPayType == "현금") {
    // 현금일 때 0
    orderPayType = 0;
  }

  if (orderPayType == "카드") {
    // 카드일 때 1
    orderPayType = 1;
  }

  let params = {
    orderNo: orderNo,
    orderCode: orderCode,
    cartItemCode1: cartItemCode1,
    cartItemCode2: cartItemCode2,
    cartItemCode3: cartItemCode3,
    cartItemCode4: cartItemCode4,
    cartItemCode5: cartItemCode5,
    orderTotalPrice: orderTotalPrice,
    orderTotalCount: orderTotalCount,
    orderNumber: orderNumber,
    orderPayType: orderPayType,
    orderState: orderState,
    orderDatetime: orderDatetime,
  };

  console.log(JSON.stringify(params));

  fetch("/orderUpdateForm", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  })
    .then((response) => {
      console.log("response:" + response);
      console.log("response:" + JSON.stringify(response));
      return response.json();
    }) // HTTP 응답
    .then((json) => {
      console.log("json:" + json);
      console.log("response:" + JSON.stringify(json));

      if (json.result == 1) {
        // 주문 정보 수정 성공
        // 다음페이지로 이동
        alert("주문 정보를 수정하였습니다.");
        window.location.href = "/adminOrderList";
      } else {
        // 주문 정보 수정 성공
        alert("주문 정보 수정 실패했습니다.");
      }
    }) // 실제 데이타
    .catch((error) => {
      console.log(error);
    });
}

// 공지사항 수정
// 이미지 업로드

