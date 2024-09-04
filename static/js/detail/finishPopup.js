// Get elements
const applyButton = document.querySelector('.btn-apply');
const popup = document.getElementById('popup');
const overlay = document.getElementById('overlay');
const closeButton = document.getElementById('close-btn');

// Function to show popup
function showPopup() {
    popup.style.display = 'block';
    overlay.style.display = 'block';
}

// Function to hide popup and return to the original view
function closePopup() {
    popup.style.display = 'none';
    overlay.style.display = 'none';
}

// Event listeners
applyButton.addEventListener('click', showPopup);
closeButton.addEventListener('click', closePopup);
overlay.addEventListener('click', closePopup);  // Close popup if the overlay is clicked
