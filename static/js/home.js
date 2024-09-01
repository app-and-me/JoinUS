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
