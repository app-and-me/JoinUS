// .dot 클릭 시 작은 div 표시
document.querySelectorAll('.dot').forEach(dot => {
    dot.addEventListener('click', function () {
        const popupDiv = this.nextElementSibling;
        popupDiv.style.display = popupDiv.style.display === 'block' ? 'none' : 'block';
    });
});