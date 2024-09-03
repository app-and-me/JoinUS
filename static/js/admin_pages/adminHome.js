// 시간 설정 팝업 열고 닫기
document.addEventListener("DOMContentLoaded", function () {
    const overlayTime = document.getElementById("overlayTime");
    const timePopup = document.getElementById("time-popup");
    const settingTimeBtn = document.querySelector(".settingTime");
    const closeBtnTime = document.getElementById("close-btnTime");
    const settingBtn = document.querySelector(".setting-btn");

    const timeInputs = document.querySelectorAll(".timeinput");

    function showPopup() {
        overlayTime.style.display = "block";
        timePopup.style.display = "block";
    }

    function hidePopup() {
        overlayTime.style.display = "none";
        timePopup.style.display = "none";

        // 입력 필드 값 초기화
        timeInputs.forEach(input => input.value = "");
    }

    settingTimeBtn.addEventListener("click", showPopup);
    overlayTime.addEventListener("click", hidePopup);
    closeBtnTime.addEventListener("click", hidePopup);
    settingBtn.addEventListener("click", hidePopup);
});
