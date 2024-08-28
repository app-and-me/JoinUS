// .dot 클릭 시 작은 div 표시
document.querySelectorAll('.dot').forEach(dot => {
    dot.addEventListener('click', function () {
        const popupDiv = this.nextElementSibling;
        popupDiv.style.display = popupDiv.style.display === 'block' ? 'none' : 'block';
    });
});


// 시간 설정 팝업 열고 닫기
document.addEventListener("DOMContentLoaded", function () {
    const overlayTime = document.getElementById("overlayTime");
    const timePopup = document.getElementById("time-popup");
    const settingTimeBtn = document.querySelector(".settingTime");
    const closeBtnTime = document.getElementById("close-btnTime");
    const settingBtn = document.querySelector(".setting-btn");

    function showPopup() {
        overlayTime.style.display = "block";
        timePopup.style.display = "block";
    }

    function hidePopup() {
        overlayTime.style.display = "none";
        timePopup.style.display = "none";
    }

    settingTimeBtn.addEventListener("click", showPopup);
    overlayTime.addEventListener("click", hidePopup);
    closeBtnTime.addEventListener("click", hidePopup);
    settingBtn.addEventListener("click", hidePopup);
});
