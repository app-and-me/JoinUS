document.addEventListener("DOMContentLoaded", function() {
    const updateButton = document.querySelector('.userupdate');
    const updatePopup = document.getElementById('update-popup');
    const overlayUpdate = document.getElementById('overlayupdate');
    const cancelButton = document.getElementById('cancel-button');
    const closeButtonUpdate = document.getElementById('close-btnupdate');

    updateButton.addEventListener('click', function() {
        updatePopup.style.display = 'block';
        overlayUpdate.style.display = 'block';
    });

    cancelButton.addEventListener('click', function() {
        updatePopup.style.display = 'none';
        overlayUpdate.style.display = 'none';
    });

    closeButtonUpdate.addEventListener('click', function() {
        updatePopup.style.display = 'none';
        overlayUpdate.style.display = 'none';
    });

    overlayUpdate.addEventListener('click', function() {
        updatePopup.style.display = 'none';
        overlayUpdate.style.display = 'none';
    });
});
