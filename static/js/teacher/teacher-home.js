 const personnelImage = document.querySelector('.clubmember');
 const popup = document.getElementById('popup');
 const overlay = document.getElementById('overlay');
 const closeBtn = document.getElementById('close-btn');

 personnelImage.addEventListener('click', () => {
     popup.style.display = 'block';
     overlay.style.display = 'block';
 });

 
 closeBtn.addEventListener('click', () => {
     popup.style.display = 'none';
     overlay.style.display = 'none';
 });

 overlay.addEventListener('click', () => {
     popup.style.display = 'none';
     overlay.style.display = 'none';
 });