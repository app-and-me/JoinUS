// 필요한 요소들 가져오기
const applyButton = document.querySelector('.btn-apply');  
const popup = document.getElementById('popup');  
const overlay = document.getElementById('overlay');  
const closeButton = document.getElementById('close-btn'); // 팝업의 확인 버튼
const popupMessage = document.querySelector('.message'); // 팝업 메시지 요소
const clubNameElement = document.querySelector('.clubtitle'); // 동아리 이름

let isApplied = false; // 신청 상태를 추적하는 변수

 
function showPopup() {
    popup.style.display = 'block'; 
    overlay.style.display = 'block';  
        
    const clubName = clubNameElement.textContent;
    document.querySelector('.club-name > div').textContent = clubName;
    
    
    if (isApplied) {
        popupMessage.innerHTML = '성공적으로 동아리 신청이 &nbsp;<span class="accent">취소</span>&nbsp;되었습니다.';
        popupMessage.querySelector('.accent').style.color = 'red';  
        document.querySelector('.club-name > div').style.color = 'red';  
    } else {
        popupMessage.innerHTML = '성공적으로 동아리 신청이 &nbsp;<span class="accent">완료</span>&nbsp;되었습니다.';
        popupMessage.querySelector('.accent').style.color = 'blue';  
        document.querySelector('.club-name > div').style.color = 'blue';  
    }
}

 
function closePopup() {
    popup.style.display = 'none';  
    overlay.style.display = 'none';  
    
   
    if (isApplied) {
        applyButton.src = '/static/images/btn-apply.png'; // 다시 "신청하기" 이미지로 
        isApplied = false; 
    } else {
        applyButton.src = '/static/images/delete-button.png';  
        isApplied = true; // 상태를 신청으로 변경
    }
}

// 이벤트 리스너 설정
applyButton.addEventListener('click', showPopup); // 신청/취소 버튼 클릭 시 팝업 표시
closeButton.addEventListener('click', closePopup); // 확인 버튼 클릭 시 팝업 닫기 및 버튼 이미지 변경
overlay.addEventListener('click', closePopup); // 오버레이 클릭 시 팝업 닫기 (선택 사항)
