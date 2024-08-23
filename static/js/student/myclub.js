 // 모든 '신청 취소' 버튼을 선택
 const deleteButtons = document.querySelectorAll('.delete-button');
 // 팝업창과 오버레이 요소
 const popup = document.getElementById('popup');
 const overlay = document.getElementById('overlay');
 const closeBtn = document.getElementById('close-btn');

 // 각 '신청 취소' 버튼에 클릭 이벤트 추가
 deleteButtons.forEach(button => {
     button.addEventListener('click', () => {
         popup.style.display = 'block';
         overlay.style.display = 'block';
     });
 });

 // 닫기 버튼 클릭 시 팝업 닫기
 closeBtn.addEventListener('click', () => {
     popup.style.display = 'none';
     overlay.style.display = 'none';
 });

 // 오버레이 클릭 시 팝업 닫기
 overlay.addEventListener('click', () => {
     popup.style.display = 'none';
     overlay.style.display = 'none';
 });