document.addEventListener("DOMContentLoaded", function() {
    const updateButton = document.querySelector('.userupdate');
    const updatePopup = document.getElementById('update-popup');
    const overlayUpdate = document.getElementById('overlayupdate');
    const cancelButton = document.getElementById('cancel-button');
    const closeButtonUpdate = document.getElementById('close-btnupdate');

    const userAddButton = document.querySelector('.addUser');
    const userAddPopup = document.querySelector('#update-popup2');
    const overlayUpdate2 = document.getElementById('overlayupdate2');
    // 사용자 전체 업데이트 버튼
    updateButton.addEventListener('click', function() {
        updatePopup.style.display = 'block';
        overlayUpdate.style.display = 'block';
    });

    // 취소 버튼
    cancelButton.addEventListener('click', function() {
        updatePopup.style.display = 'none';
        overlayUpdate.style.display = 'none';
    });

    // x 버튼
    closeButtonUpdate.addEventListener('click', function() {
        updatePopup.style.display = 'none';
        overlayUpdate.style.display = 'none';
    });

    // 누르면 overlay blur효과 사라지게
    overlayUpdate.addEventListener('click', function() {
        updatePopup.style.display = 'none';
        overlayUpdate.style.display = 'none';
    });

// 2.
     // 사용자 추가 업데이트 버튼
     userAddButton.addEventListener('click', function() {
        userAddPopup.style.display = 'block';
        overlayUpdate.style.display = 'block';
    });

    // 취소 버튼
    cancelButton.addEventListener('click', function() {
        userAddPopup.style.display = 'none';
        overlayUpdate2.style.display = 'none';
    });

    // x 버튼
    closeButtonUpdate.addEventListener('click', function() {
        userAddPopup.style.display = 'none';
        overlayUpdate2.style.display = 'none';
    });

    // 누르면 overlay blur효과 사라지게
    overlayUpdate.addEventListener('click', function() {
        userAddPopup.style.display = 'none';
        overlayUpdate2.style.display = 'none';
    });

});

