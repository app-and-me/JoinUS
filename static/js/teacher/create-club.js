document.getElementById('create-club').addEventListener('submit', function (event) {
    event.preventDefault();

    const popup = document.getElementById('popup');
    const overlay = document.getElementById('overlay');
    const closeBtn = document.getElementById('close-btn');

    const clubName = document.getElementById('club-select').options[document.getElementById('club-select').selectedIndex].text;
    const clubTeacher = document.getElementById('club-select').value;
    const simpleIntroduce = document.getElementById('simpleIntroduce').value;
    const clubIntroduce = document.getElementById('clubIntroduce').value;
    const clubImgUrl = document.getElementById('clubImgUrl').value;

    // 모든 필드가 채워졌는지 확인
    if (simpleIntroduce && clubIntroduce && clubImgUrl) {
        // 선택된 동아리 이름을 팝업에 반영
        document.getElementById('popup-club-title').innerHTML = clubName;
        let clubs = JSON.parse(localStorage.getItem('clubs')) || [];

        const firstGrade = parseInt(document.getElementById('first-grade').value) || 0;
        const secondGrade = parseInt(document.getElementById('second-grade').value) || 0;
        const thirdGrade = parseInt(document.getElementById('third-grade').value) || 0;

        // 총 인원수 계산
        const clubMemberNumber = firstGrade + secondGrade + thirdGrade;

        const newClub = {
            clubName,
            clubTeacher,
            simpleIntroduce,
            clubIntroduce,
            clubImgUrl,
            clubMemberNumber,
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

// 드롭다운 메뉴에서 선택할 때마다 선생님 이름 업데이트
document.getElementById('club-select').addEventListener('change', function() {
    const selectedClub = this.options[this.selectedIndex].value;
    document.getElementById('teacher-name').innerHTML = selectedClub;
});