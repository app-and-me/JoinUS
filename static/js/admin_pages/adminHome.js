document.addEventListener("DOMContentLoaded", function () {
    const overlayTime = document.getElementById("overlayTime");
    const timePopup = document.getElementById("time-popup");
    const settingTimeBtn = document.querySelector(".settingTime");
    const closeBtnTime = document.getElementById("close-btnTime");
    const settingBtn = document.querySelector(".setting-btn");

    // Function to show the popup and overlay
    function showPopup() {
        overlayTime.style.display = "block";
        timePopup.style.display = "block";
    }

    // Function to hide the popup and overlay
    function hidePopup() {
        overlayTime.style.display = "none";
        timePopup.style.display = "none";
    }

    // Event listeners to open and close the popup
    settingTimeBtn.addEventListener("click", showPopup);
    overlayTime.addEventListener("click", hidePopup);
    closeBtnTime.addEventListener("click", hidePopup);
    settingBtn.addEventListener("click", hidePopup);
});
