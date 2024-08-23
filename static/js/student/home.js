window.addEventListener('DOMContentLoaded', () => {
    const clubs = JSON.parse(localStorage.getItem('clubs')) || [];
    const clubListContainer = document.querySelector('.club-list');
    const searchBar = document.getElementById('search-bar');
    const popup = document.getElementById('popup');
    const overlay = document.getElementById('overlay');
    const closeBtn = document.getElementById('close-btn');

    // 동아리 목록을 화면에 표시
    function displayClubs(filteredClubs) {
        clubListContainer.innerHTML = ''; // 기존 내용을 지움
        filteredClubs.forEach(club => {
            const article = document.createElement('article');
            article.className = 'article';
            article.innerHTML = `
                <div class="container1">
                    <img src="/static/images/star.png" class="star-icon" alt="">
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
                    <button class="bnt-apply">신청하기</button>
                </div>
            `;
            clubListContainer.appendChild(article);
        });
    }

    // 동아리 표시
    displayClubs(clubs);

    // 검색 바 입력 시 필터링
    searchBar.addEventListener('input', () => {
        const searchTerm = searchBar.value.toLowerCase();
        const filteredClubs = clubs.filter(club =>
            club.clubName.toLowerCase().includes(searchTerm) ||
            club.simpleIntroduce.toLowerCase().includes(searchTerm)
        );
        displayClubs(filteredClubs);
    });

    // 팝업 열기 및 닫기 처리
    function openPopup() {
        popup.style.display = 'block';
        overlay.style.display = 'block';
    }

    function closePopup() {
        popup.style.display = 'none';
        overlay.style.display = 'none';
    }

    // 클릭 이벤트
    clubListContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('bnt-apply')) {
            openPopup();
        } else if (event.target.classList.contains('star-icon')) {
            const starIcon = event.target;
            const article = starIcon.closest('.article');
            article.parentNode.prepend(article); // 클릭된 article을 club-list의 첫 번째 자식으로 이동
            starIcon.src = '/static/images/yellowstar.png'; // 이미지 src를 변경
        }
    });

    closeBtn.addEventListener('click', closePopup);
    overlay.addEventListener('click', closePopup);
});
