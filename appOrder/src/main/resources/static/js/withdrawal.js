function withdrawal() {
  let checkBox = document.getElementById("checkbox");

  if (checkBox.checked) {
    // 체크되었을 때
    fetch("/withdrawalForm", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((json) => {
        console.log("Response from server:", json); // Log the response

        if (json.result === 1) {
          // 로그아웃 성공
          alert("탈퇴되었습니다.");
          window.location.href = "/";
        } else {
          // 로그아웃 실패
          alert("탈퇴에 실패했습니다.");
        }
      })
      .catch((error) => {
        console.error("Error during withdrawal:", error);
      });
  } else {
    // 체크되지 않았을 때
    alert("유의사항을 확인 후 체크박스에 체크해 주세요.");
  }
}
