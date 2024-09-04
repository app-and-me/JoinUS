window.addEventListener('DOMContentLoaded', (event) => {

    const clubs = JSON.parse(localStorage.getItem('clubs')) || [];
    const clubListContainer = document.querySelector('.club-list');

    // 동아리 추가
    function displayClubs(filteredClubs) {
        clubListContainer.innerHTML = '';                            // 기존 내용을 지움

        filteredClubs.forEach(club => {
            const article = document.createElement('article');
            article.className = 'article';

            article.innerHTML = `
                <div class="container1">
                    <img src="/static/images/star.png" alt="">
                    <div class="article-container">
                        <div class="title-container">
                            <div class="club-title">${club.clubName}</div>
                            <div class="teacher">선생님 이름</div>  
                            <div class="apply">지원가능</div>
                        </div>
                        <div class="content">${club.simpleIntroduce}</div>
                    </div>
                </div>
                <div class="container2">
                    <div class="clubmember">
                        <img src="/static/images/personnel.png" alt="">
                        <div>0/${club.clubMemberNumber}</div>
                    </div>
                    <button class="btn-apply">신청하기</button> <!-- btn-apply로 수정 -->
                </div>
            `;
            clubListContainer.appendChild(article);
        });
    }

    // 동아리 표시
    displayClubs(clubs);

    // 팝업
    const popup = document.getElementById('popup');
    const overlay = document.getElementById('overlay');
    const closeBtn = document.getElementById('close-btn');

    if (popup && overlay && closeBtn) {
        // 팝업 열기
        clubListContainer.addEventListener('click', (event) => {
            if (event.target.classList.contains('btn-apply')) {  // btn-apply로 수정
                popup.style.display = 'block';
                overlay.style.display = 'block';
            }
        });

        // 팝업 닫기
        closeBtn.addEventListener('click', () => {
            popup.style.display = 'none';
            overlay.style.display = 'none';
        });

        // 배경 클릭 시 팝업 닫기
        overlay.addEventListener('click', () => {
            popup.style.display = 'none';
            overlay.style.display = 'none';
        });
    } else {
        console.error('Popup elements not found');
    }


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

});
