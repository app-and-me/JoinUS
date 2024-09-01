document.addEventListener("DOMContentLoaded", function() {
    // userupdate 클래스를 가진 요소를 가져옵니다.
    const updateButton = document.querySelector('.userupdate');

    // 사용자 일괄 업데이트 팝업창과 오버레이, 취소 버튼 요소를 가져옵니다.
    const updatePopup = document.getElementById('update-popup');
    const overlayUpdate = document.getElementById('overlayupdate');
    const cancelButton = document.getElementById('cancel-button');
    const closeButtonUpdate = document.getElementById('close-btnupdate');

    // updateButton을 클릭했을 때 팝업창과 오버레이를 표시하는 이벤트 핸들러
    updateButton.addEventListener('click', function() {
        updatePopup.style.display = 'block';
        overlayUpdate.style.display = 'block';
    });

    // 취소 버튼과 닫기 버튼을 클릭했을 때 팝업창과 오버레이를 숨기는 이벤트 핸들러
    cancelButton.addEventListener('click', function() {
        updatePopup.style.display = 'none';
        overlayUpdate.style.display = 'none';
    });
    
    closeButtonUpdate.addEventListener('click', function() {
        updatePopup.style.display = 'none';
        overlayUpdate.style.display = 'none';
    });

    // overlayUpdate를 클릭했을 때 팝업창과 오버레이를 숨기는 이벤트 핸들러
    overlayUpdate.addEventListener('click', function() {
        updatePopup.style.display = 'none';
        overlayUpdate.style.display = 'none';
    });
});
