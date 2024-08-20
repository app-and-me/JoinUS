    window.addEventListener('DOMContentLoaded', (event) => {
        // 로컬 스토리지에서 동아리 목록 가져오기
        const clubs = JSON.parse(localStorage.getItem('clubs')) || [];

        // 동아리 리스트 컨테이너
        const clubListContainer = document.querySelector('.club-list');

        // 동아리 목록을 화면에 동적으로 추가
        clubs.forEach(club => {
            const article = document.createElement('article');
            article.className = 'article';

            article.innerHTML = `
                <div class="container1">
                    <img src="\\static\\images\\star.png" alt="">
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
                        <img src="\\static\\images\\personnel.png" alt="">
                        <div>0/${club.clubMemberNumber}</div>
                    </div>
                    <button class="bnt-apply">신청하기</button>
                </div>
            `;

            clubListContainer.appendChild(article);

            
            //     localStorage.removeItem('clubs');

            // // 동아리 목록을 비우기
            // clubListSection.innerHTML = '';

        });
    });

    // 팝업 열기 버튼
    const openPopupBtns = document.querySelectorAll('.bnt-apply');
    const popup = document.getElementById('popup');
    const overlay = document.getElementById('overlay');

    // 닫기 버튼
    const closeBtn = document.getElementById('close-btn');

    // 버튼 클릭했을 때
    openPopupBtns.forEach(button => {
        button.addEventListener('click', () => {
            popup.style.display = 'block';
            overlay.style.display = 'block';
        });
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

// 검색 기능
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-bar');
    const articles = document.querySelectorAll('.article');

    searchInput.addEventListener('input', function() {
        const searchTerm = searchInput.value.toLowerCase();

        articles.forEach(article => {
            const clubName = article.querySelector('.club-title').textContent.toLowerCase();

            if (clubName.includes(searchTerm)) {
                article.style.display = '';
            } else {
                article.style.display = 'none';
            }
        });
    });
});