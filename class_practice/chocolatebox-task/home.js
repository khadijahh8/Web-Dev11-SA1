// home.js

// Variables to store state
let selectedOccasion = '';
let selectedBoxSize = 0;
let selectedChocolates = [];
let basket = [];

// Function to select an occasion
function selectOccasion(occasion) {
    selectedOccasion = occasion;
    document.getElementById('occasion-selection').style.display = 'none'; // Hide Occasion Selection
    document.getElementById('build-box').style.display = 'block'; // Show Build Your Own Box
}

// Function to select box size
function selectBoxSize(size) {
    selectedBoxSize = size;
    selectedChocolates = []; // Reset selections
    document.getElementById('max').innerText = size;
    document.querySelector('.box-size-selection').style.display = 'none'; // Hide Box Size Selection
    document.querySelector('.chocolate-selection').style.display = 'block'; // Show Chocolate Selection
    updateProgress();
}

// Function to add a chocolate
function addChocolate(chocolate) {
    if (selectedChocolates.length < selectedBoxSize) {
        selectedChocolates.push(chocolate);
        updateProgress();
    } else {
        alert("You have selected all the chocolates for this box!");
    }
}

// Function to update progress
function updateProgress() {
    document.getElementById('count').innerText = selectedChocolates.length;
}

// Function to review the box
function reviewBox() {
    if (selectedChocolates.length !== selectedBoxSize) {
        alert(`Please select exactly ${selectedBoxSize} chocolates.`);
        return;
    }

    // Hide Chocolate Selection and Show Review
    document.querySelector('.chocolate-selection').style.display = 'none';
    document.getElementById('review-box').style.display = 'block';

    // Populate Selected Chocolates
    const selectedList = document.getElementById('selected-chocolates');
    selectedList.innerHTML = '';
    selectedChocolates.forEach((choc, index) => {
        const li = document.createElement('li');
        li.textContent = `${index + 1}. ${choc}`;
        selectedList.appendChild(li);
    });
}

// Function to add to basket
function addToBasket() {
    // Add the current box to the basket
    const box = {
        occasion: selectedOccasion,
        size: selectedBoxSize,
        chocolates: [...selectedChocolates]
    };
    basket.push(box);
    updateBasketCount();
    alert("Your box has been added to the basket!");

    // Reset the builder
    document.getElementById('review-box').style.display = 'none';
    document.getElementById('build-box').style.display = 'none';
    document.getElementById('occasion-selection').style.display = 'block';

    // Reset selections
    selectedOccasion = '';
    selectedBoxSize = 0;
    selectedChocolates = [];
    document.getElementById('count').innerText = '0';
    document.getElementById('max').innerText = '0';
}

// Function to update basket count
function updateBasketCount() {
    document.getElementById('basket-count').innerText = basket.length;
}

// Function to view basket
function viewBasket() {
    // Hide all sections except basket
    document.querySelectorAll('section').forEach(sec => {
        if (sec.id !== 'basket') sec.style.display = 'none';
    });

    // Show basket section
    document.getElementById('basket').style.display = 'block';

    // Populate Basket Items
    const basketItems = document.getElementById('basket-items');
    basketItems.innerHTML = '';
    let total = 0;
    basket.forEach((box, index) => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>Box ${index + 1} (${box.occasion}) - ${box.size} Pieces</strong>
                        <ul>${box.chocolates.map(choc => `<li>${choc}</li>`).join('')}</ul>`;
        basketItems.appendChild(li);
        // Calculate total (assuming each chocolate is $2 for example)
        total += box.size * 2;
    });
    document.getElementById('basket-total').innerText = total.toFixed(2);
}

// Function to checkout
function checkout() {
    alert("Proceeding to checkout...");
    // Implement checkout functionality here
}

// Modal Functionality

// Function to open modal
function openModal() {
    document.getElementById('loginModal').style.display = 'block';
}

// Function to close modal
function closeModal() {
    document.getElementById('loginModal').style.display = 'none';
}

// Function to open a specific tab
function openTab(evt, tabName) {
    // Declare all variables
    let i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
        tabcontent[i].classList.remove('active');
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block";
    document.getElementById(tabName).classList.add('active');
    evt.currentTarget.classList.add("active");
}

// Event listener for clicking outside the modal to close it
window.onclick = function(event) {
    const modal = document.getElementById('loginModal');
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

// Event listeners for opening the modal
document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('login-btn');
    const loginModal = document.getElementById('loginModal');
    if (loginBtn && loginModal) {
        loginBtn.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default anchor behavior
            openModal();
        });
    }

    // Initialize default active tab
    const defaultTab = document.querySelector('.tablinks');
    if (defaultTab) {
        defaultTab.click();
    }
});
