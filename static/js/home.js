window.addEventListener('DOMContentLoaded', (event) => {

    const clubs = JSON.parse(localStorage.getItem('clubs')) || [];
    const clubListContainer = document.querySelector('.club-list');

    // 검색 바
    const searchBar = document.getElementById('search-bar');

    // 동아리 추가
    function displayClubs(filteredClubs) {
        clubListContainer.innerHTML = '';                            // 기존 내용을 지움

        filteredClubs.forEach(club => {
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

    // 팝업
    const popup = document.getElementById('popup');
    const overlay = document.getElementById('overlay');
    const closeBtn = document.getElementById('close-btn');

    // 팝업 열기
    clubListContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('bnt-apply')) {
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
});
