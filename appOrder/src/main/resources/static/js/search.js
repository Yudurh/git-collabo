$(document).ready(function () {
  $("#headerClose").click(function () {
    window.location.href = "/menu";
  });
  $("#sClose").click(function () {
    $("#keyword").val("");
  });

  $(".fCon").click(function () {
    let nameValue = $(this).attr("id");
    window.location.href = "/itemInfo?itemName=" + nameValue;
  });

  // let a = [];
  // let fCon = document.getElementsByClassName("fCon");

  // for (let i = 0; i < fCon.length; i++) {
  //   a[i] = fCon[i].getAttribute("id");
  // }
  // window.location.href = "/itemInfo?itemName=" + $(".fCon").attr("id");
});
