// < 회원 정보 수정 >
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

// < 상품 정보 수정 >
// 상품 정보 수정 페이지에서 조회
// ( 추천 ) 라디오 버튼 표시
$(document).ready(function () {
  // Function to handle item recommendation radio button display
  function displayRecommendation() {
    let itemRecommend = document.getElementById("itemRecommend").value;
    console.log(itemRecommend);

    // itemRecommend = 1 (추천), 0 (비추천)
    if (itemRecommend == 1) {
      // $("input:radio[name=recom]")[0] = 추천
      $("input:radio[name=recom]")[0].checked = true;
    } else {
      // $("input:radio[name=recom]")[1] = 비추천
      $("input:radio[name=recom]")[1].checked = true;
    }
  }

  // adminItemUpdate의 수정 버튼을 누를 때만 displayRecommendation() 함수 실행
  // 이렇게 해놓지 않으면 admin.js를 공유하는 다른 템플릿에서 오류 발생 !
  $("#updateBtn").click(function () {
    displayRecommendation();
  });
});

// ( 옵션 ) 라디오 버튼 표시 -> 해야함

// item 이미지 업로드
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
    // 파일이 선택되지 않았거나 비어있는 경우, 기존 이미지를 표시
    document.getElementById("imgItemImageUrl").src = "./upload/" + input.value;
  }
}

function itemUpdate() {
  image_upload();
}

function image_upload() {
  let inputItemImageUrl = document.getElementById("inputItemImageUrl");
  console.log(inputItemImageUrl);

  // 파일이 선택되었을 때만 실행
  if (inputItemImageUrl.files && inputItemImageUrl.files[0]) {
    let fileUrl = inputItemImageUrl.value; // C:\fakepath\cosmos.jpg
    let fileName = getFileName(fileUrl);
    console.log("fileUrl:" + fileUrl);
    console.log("fileName:" + fileName);

    let form = new FormData();
    form.append("file", inputItemImageUrl.files[0], fileName);

    fetch("/upload", {
      method: "POST",
      body: form,
    })
      .then((response) => response.json())
      .then((json) => {
        console.log("json:" + JSON.stringify(json));
        console.log("uploadFileName:" + json.uploadFileName);
        func_item_updateAction_json(json.uploadFileName);
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    // 파일이 선택되지 않았을 때의 처리
    console.log("파일이 선택되지 않았습니다.");

    // 파일이 선택되지 않으면 기존 이미지 사용
    let existingImageUrl = document.getElementById("imgItemImageUrl").src;
    let existingFileName = getFileName(existingImageUrl);

    // 기존 이미지 파일명을 서버로 전달하는 함수 호출
    func_item_updateAction_json(existingFileName);
  }
}

// URL에서 파일 이름을 추출하는 함수
function getFileName(input) {
  // C:\fakepath\cosmos.jpg에서 파일 이름만 추출
  return input.replace(/.*[\/\\]/, "");
}

// 수정한 정보 전달
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
  let orderPayType = $("#payType").val();
  let orderDatetime = document.getElementById("inputOrderDatetime").value;

  console.log(orderState);

  if (orderPayType == "현금") {
    // 현금일 때 0
    orderPayType = 0;
  }

  if (orderPayType == "카드") {
    // 카드일 때 1
    orderPayType = 1;
  }

  if ((cartItemCode2, cartItemCode3, cartItemCode4, cartItemCode5 == "")) {
    cartItemCode2 = null;
    cartItemCode3 = null;
    cartItemCode4 = null;
    cartItemCode5 = null;

    console.log(cartItemCode2);
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

// < 공지사항 글 수정 >
// 이미지 업로드
function onClickUpload2() {
  let inputNoticeImageUrl = document.getElementById("inputNoticeImageUrl");
  inputNoticeImageUrl.click();
}

function readURL2(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      document.getElementById("imgNoticeImageUrl").src = e.target.result;
    };
    reader.readAsDataURL(input.files[0]);
  } else {
    // 파일이 선택되지 않았거나 비어있는 경우, 기존 이미지를 표시
    document.getElementById("imgNoticeImageUrl").src =
      "./upload/" + input.value;
  }
}

function noticeUpdate() {
  image_upload2();
}

function image_upload2() {
  let inputNoticeImageUrl = document.getElementById("inputNoticeImageUrl");
  console.log(inputNoticeImageUrl);

  // 파일이 선택되었을 때만 실행
  if (inputNoticeImageUrl.files && inputNoticeImageUrl.files[0]) {
    let fileUrl = inputNoticeImageUrl.value; // C:\fakepath\cosmos.jpg
    let fileName = getFileName(fileUrl);
    console.log("fileUrl:" + fileUrl);
    console.log("fileName:" + fileName);

    let form = new FormData();
    form.append("file", inputNoticeImageUrl.files[0], fileName);

    fetch("/upload", {
      method: "POST",
      body: form,
    })
      .then((response) => response.json())
      .then((json) => {
        console.log("json:" + JSON.stringify(json));
        console.log("uploadFileName:" + json.uploadFileName);
        func_notice_updateAction_json(json.uploadFileName);
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    // 파일이 선택되지 않았을 때의 처리
    console.log("파일이 선택되지 않았습니다.");

    // 기존 이미지 사용하도록 하거나 필요한 처리를 수행하세요.
    let existingImageUrl = document.getElementById("imgNoticeImageUrl").src;
    let existingFileName = getFileName(existingImageUrl);

    // 기존 이미지 파일명을 서버로 전달하는 함수 호출
    func_notice_updateAction_json(existingFileName);
  }
}

function func_notice_updateAction_json(noticeImage) {
  let noticeNo = document.getElementById("noticeNo").value;
  let noticeTitle = document.getElementById("inputNoticeTitle").value;
  let noticeUser = document.getElementById("inputNoticeUser").value;
  let noticeContent = document.getElementById("inputNoticeContent").value;
  let noticeDatetime = document.getElementById("inputNoticeDatetime").value;

  let params = {
    noticeNo: noticeNo,
    noticeTitle: noticeTitle,
    noticeUser: noticeUser,
    noticeContent: noticeContent,
    noticeDatetime: noticeDatetime,
    noticeImage: noticeImage,
  };
  console.log(JSON.stringify(params));

  fetch("/noticeUpdateForm", {
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
        // 공지 정보 수정 성공
        // 다음 페이지 이동
        alert("공지 정보를 수정하였습니다.");
        window.location.href = "/adminNoticeList";
      } else {
        // 공지 정보 수정 실패
        alert("공지 정보를 수정 실패했습니다.");
      }
    }) // 실제 데이타
    .catch((error) => {
      console.log(error);
    });
}


// < 이벤트 글 수정 >
// 이미지 업로드
function onClickUpload3() {
  let inputEventImageUrl = document.getElementById("inputEventImageUrl");
  inputEventImageUrl.click();
}

function readURL3(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      document.getElementById("imgEventImageUrl").src = e.target.result;
    };
    reader.readAsDataURL(input.files[0]);
  } else {
    // 파일이 선택 되지 않았거나 비어있는 경우, 기존 이미지를 표시
    document.getElementById("imgEventImageUrl").src =
      "./upload/" + input.value;
  }
}

function eventUpdate() {
  image_upload3();
}

function image_upload3() {
  let inputEventImageUrl = document.getElementById("inputEventImageUrl");
  console.log(inputEventImageUrl);

  // 파일이 선택 되었을 때만 실행
  if (inputEventImageUrl.files && inputEventImageUrl.files[0]) {
    let fileUrl = inputEventImageUrl.value; // C:\fakepath\cosmos.jpg
    let fileName = getFileName(fileUrl);
    console.log("fileUrl:" + fileUrl);
    console.log("fileName:" + fileName);

    let form = new FormData();
    form.append("file", inputEventImageUrl.files[0], fileName);

    fetch("/upload", {
      method: "POST",
      body: form,
    })
      .then((response) => response.json())
      .then((json) => {
        console.log("json:" + JSON.stringify(json));
        console.log("uploadFileName:" + json.uploadFileName);
        func_event_updateAction_json(json.uploadFileName);
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    // 파일이 선택되지 않았을 때의 처리
    console.log("파일이 선택되지 않았습니다.");

    // 기존 이미지 사용하도록 하거나 필요한 처리를 수행하세요.
    let existingImageUrl = document.getElementById("imgEventImageUrl").src;
    let existingFileName = getFileName(existingImageUrl);

    // 기존 이미지 파일명을 서버로 전달하는 함수 호출
    func_event_updateAction_json(existingFileName);
  }
}

function func_event_updateAction_json(eventImage) {
  let eventNo = document.getElementById("eventNo").value;
  let eventTitle = document.getElementById("inputEventTitle").value;
  let eventUser = document.getElementById("inputEventUser").value;
  let eventContent = document.getElementById("inputEventContent").value;
  let eventDatetime = document.getElementById("inputEventDatetime").value;

  let params = {
    eventNo: eventNo,
    eventTitle: eventTitle,
    eventUser: eventUser,
    eventContent: eventContent,
    eventDatetime: eventDatetime,
    eventImage : eventImage,
  };
  console.log(JSON.stringify(params));

  fetch("/eventUpdateForm", {
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
        // 이벤트 정보 수정 성공
        // 다음 페이지 이동
        alert("이벤트 글을 수정하였습니다.");
        window.location.href = "/adminEventList";
      } else {
        // 이벤트 정보 수정 실패
        alert("이벤트 글 수정 실패했습니다.");
      }
    }) // 실제 데이타
    .catch((error) => {
      console.log(error);
    });
}
