document.getElementById('create-club').addEventListener('submit', function (event) {
    event.preventDefault();

    const popup = document.getElementById('popup');
    const overlay = document.getElementById('overlay');
    const closeBtn = document.getElementById('close-btn');

    // const clubName = document.getElementById('clubName').value;
    const simpleIntroduce = document.getElementById('simpleIntroduce').value;
    const clubIntroduce = document.getElementById('clubIntroduce').value;
    const clubImgUrl = document.getElementById('clubImgUrl').value;

    // 모든 필드가 채워졌는지 확인
    if (simpleIntroduce && clubIntroduce && clubImgUrl) {
        // document.querySelector('.club-name div').innerHTML = clubName;

        // 기존 동아리 데이터를 로컬 스토리지에서 가져오기
        let clubs = JSON.parse(localStorage.getItem('clubs')) || [];

        const newClub = {
            // clubName,
            simpleIntroduce,
            clubIntroduce,
            clubImgUrl
        };

        clubs.push(newClub);

        // 업데이트된 동아리 목록을 로컬 스토리지에 저장
        localStorage.setItem('clubs', JSON.stringify(clubs));

        // 팝업 표시
        popup.style.display = 'block';
        overlay.style.display = 'block';

        // 팝업 닫기 버튼
        closeBtn.addEventListener('click', () => {
            popup.style.display = 'none';
            overlay.style.display = 'none';
            window.location.href = '/templates/student/home.html';
        });
    }  
});
