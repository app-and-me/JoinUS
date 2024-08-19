    document.getElementById('create-club').addEventListener('submit', function (event) {
        event.preventDefault();
        // 팝업 열기 버튼
        const openPopupBtns = document.querySelectorAll('.next-button');
        const popup = document.getElementById('popup');
        const overlay = document.getElementById('overlay');

        // 닫기 버튼
        const closeBtn = document.getElementById('close-btn');

        const clubName = document.getElementById('clubName').value;
        const simpleIntroduce = document.getElementById('simpleIntroduce').value;
        const clubIntroduce = document.getElementById('clubIntroduce').value;
        const clubMemberNumber = document.getElementById('clubMemberNumber').value;
        const clubImgUrl = document.getElementById('clubImgUrl').value;

        // 모든 필드가 채워졌는지 확인
        if (clubName && simpleIntroduce && clubIntroduce && clubMemberNumber && clubImgUrl) {
            document.querySelector('.club-name div').innerHTML = clubName;

            // 기존 동아리 데이터를 로컬 스토리지에서 가져오기
            let clubs = JSON.parse(localStorage.getItem('clubs')) || [];

            const newClub = {
                clubName,
                simpleIntroduce,
                clubMemberNumber
            }

            clubs.push(newClub);

            // 업데이트된 동아리 목록을 로컬 스토리지에 저장
            localStorage.setItem('clubs', JSON.stringify(clubs));


            // 팝업 표시
            popup.style.display = 'block';
            overlay.style.display = 'block';
        }

    
        closeBtn.addEventListener('click', () => {
            popup.style.display = 'none';
            overlay.style.display = 'none';
            window.location.href = 'home.html';  
        });
    });

