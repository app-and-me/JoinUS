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

    // 검색 필터링
    function filter() {
        let search = document.getElementById("search-bar").value.toLowerCase();
        let articles = document.getElementsByClassName("article");

        for (let i = 0; i < articles.length; i++) {
            let teacher = articles[i].getElementsByClassName("teacher")[0].innerText.toLowerCase();
            let clubtitle = articles[i].getElementsByClassName("club-title")[0].innerText.toLowerCase();
            let content = articles[i].getElementsByClassName("content")[0].innerText.toLowerCase();
            
            if (teacher.includes(search) || clubtitle.includes(search) || content.includes(search)) {
                articles[i].style.display = "flex";
            } else {
                articles[i].style.display = "none";
            }
        }
    }

    // 필터 함수 keyup 이벤트에 연결
    document.getElementById("search-bar").addEventListener('keyup', filter);

    // .dot 클릭 시 팝업 토글
    document.querySelectorAll('.dot').forEach(dot => {
        dot.addEventListener('click', function () {
            const popupDiv = this.nextElementSibling;
            if (popupDiv.style.display === "block") {
                popupDiv.style.display = "none";
            } else {
                document.querySelectorAll('.popup-div').forEach(popup => {
                    popup.style.display = 'none';
                });
                popupDiv.style.display = "block";
            }
        });
    });

    // 페이지 외부 클릭 시 팝업 닫기
    document.addEventListener('click', function (event) {
        if (!event.target.closest('.dot') && !event.target.closest('.popup-div')) {
            document.querySelectorAll('.popup-div').forEach(popup => {
                popup.style.display = 'none';
            });
        }
    });

    // 클릭 시 검색 바에 포커스
    const searchContainer = document.getElementById('search-container');
    const searchBar = document.getElementById('search-bar');

    searchContainer.addEventListener('click', () => {
        searchBar.focus();
    });
});
