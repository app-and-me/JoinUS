document.getElementById('create-club').addEventListener('submit', function(event){
    event.preventDefault();

    const clubName = document.getElementById('clubName').value;
    const simpleIntroduce = document.getElementById('simpleIntroduce').value;
    const clubIntroduce = document.getElementById('clubIntroduce').value;
    const clubMemberNumber = document.getElementById('clubMemberNumber').value;
    const clubImgUrl = document.getElementById('clubImgUrl').value;

    // 모든 필드가 채워졌는지 확인
    if(clubName && simpleIntroduce && clubIntroduce && clubMemberNumber && clubImgUrl) {
        document.querySelector('.club-name div').innerHTML = clubName;

        popup.style.display = 'block';
        overlay.style.display = 'block';
    }  
});

// 팝업 열기 버튼
const openPopupBtns = document.querySelectorAll('.next-button');
const popup = document.getElementById('popup');
const overlay = document.getElementById('overlay');

// 닫기 버튼
const closeBtn = document.getElementById('close-btn');

// 팝업 닫기
closeBtn.addEventListener('click', () => {
    popup.style.display = 'none';
    overlay.style.display = 'none';
    window.location.href='#'
});
 