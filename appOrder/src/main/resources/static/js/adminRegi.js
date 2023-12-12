// < 상품 등록 >
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

function itemRegi() {
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
        func_item_registerAction_json(json.uploadFileName);
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
    func_item_registerAction_json(existingFileName);
  }
}

// URL에서 파일 이름을 추출하는 함수
function getFileName(input) {
  // C:\fakepath\cosmos.jpg에서 파일 이름만 추출
  return input.replace(/.*[\/\\]/, "");
}

// 상품 전달
function func_item_registerAction_json(itemImageUrl) {
  let itemNo = document.getElementById("itemNo").value;
  let itemCode = document.getElementById("itemCode").value;
  let itemName = document.getElementById("inputItemName").value;
  let itemContent = document.getElementById("inputItemContent").value;
  let itemCate = $("#cate").val();
  let itemRecommend = $("input:radio[name=recom]:checked").val();
  let itemPrice = document.getElementById("inputItemPrice").value;
  // let itemImageUrl = document.getElementById("inputItemImageUrl").value;
  let itemUpdateDatetime = document.getElementById("itemUpdateDatetime").value;

  // 상품  uuid 생성
  function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }

  if (itemCode == ""){
    itemCode = uuidv4();
    console.log("item")
  }


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
  console.log("등록 내용: " + JSON.stringify(params));

  fetch("/itemRegiForm", {
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
        alert("상품을 등록하였습니다.");
        window.location.href = "/adminItemList";
      } else {
        // 상품 정보 수정 실패
        alert("상품 등록을 실패했습니다.");
      }
    }) // 실제 데이타
    .catch((error) => {
      console.log(error);
    });
}

// < 공지사항 글 등록 >
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

function noticeRegister() {
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
        func_notice_registerAction_json(json.uploadFileName);
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
    func_notice_registerAction_json(existingFileName);
  }
}

function func_notice_registerAction_json(noticeImage) {
  let noticeNo = document.getElementById("noticeNo").value;
  let noticeTitle = document.getElementById("inputNoticeTitle").value;
  let noticeUser = document.getElementById("inputNoticeUser").value;
  let noticeContent = document.getElementById("inputNoticeContent").value;
  let noticeDatetime = document.getElementById("noticeDatetime").value;

  if (noticeDatetime == "") {
    noticeDatetime = new Date();
  }

  let params = {
    noticeNo: noticeNo,
    noticeTitle: noticeTitle,
    noticeUser: noticeUser,
    noticeContent: noticeContent,
    noticeDatetime: noticeDatetime,
    noticeImage: noticeImage,
  };

  console.log(JSON.stringify(params));

  fetch("/noticeRegiForm", {
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
        alert("공지 글을 등록하였습니다.");
        window.location.href = "/adminNoticeList";
      } else {
        // 공지 정보 수정 실패
        alert("공지 글 등록을 실패했습니다.");
      }
    }) // 실제 데이타
    .catch((error) => {
      console.log(error);
    });
}

// < 이벤트 글 등록 >
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
    document.getElementById("imgEventImageUrl").src = "./upload/" + input.value;
  }
}

function eventRegister() {
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
        func_event_registerAction_json(json.uploadFileName);
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
    func_event_registerAction_json(existingFileName);
  }
}

function func_event_registerAction_json(eventImage) {
  let eventNo = document.getElementById("eventNo").value;
  let eventTitle = document.getElementById("inputEventTitle").value;
  let eventUser = document.getElementById("inputEventUser").value;
  let eventContent = document.getElementById("inputEventContent").value;
  let eventDatetime = document.getElementById("eventDatetime").value;

  if (eventDatetime == "") {
    eventDatetime = new Date();
  }

  let params = {
    eventNo: eventNo,
    eventTitle: eventTitle,
    eventUser: eventUser,
    eventContent: eventContent,
    eventDatetime: eventDatetime,
    eventImage: eventImage,
  };
  console.log(JSON.stringify(params));

  fetch("/eventRegiForm", {
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
