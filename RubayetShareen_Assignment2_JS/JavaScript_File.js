// Create and append the modal HTML when clicking the region button
const createRegionModal = () => {
    const modal = document.createElement('div');
    modal.className = 'region-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Display settings</h3>
                <button class="close-btn">&times;</button>
            </div>
            <div class="modal-body">
                <div class="warning-message">
                    <i class="warning-icon">⚠️</i>
                    <p>Changing your region could change your rewards program</p>
                </div>
                <p class="modal-info">To stay with your current rewards program keep your region the same. One Key is currently only available in select regions.</p>
                <div class="form-group">
                    <label for="region">Region</label>
                    <select id="region" class="select-input">
                        <option value="US">United States</option>
                        <option value="PT">Portugal</option>
                        <option value="UK">United Kingdom</option>
                        <option value="FR">France</option>
                        <option value="DE">Germany</option>
                        <option value="CN">China</option>
                        <option value="AU">Australia</option>
                        <option value="BR">Brazil</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="currency">Currency</label>
                    <select id="currency" class="select-input" disabled>
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="GBP">GBP</option>
                        <option value="AUD">AUD</option>
                        <option value="BRL">BRL</option>
                    </select>
                </div>
                <button class="save-btn">Save</button>
            </div>
           
        </div>
    `;
    document.body.appendChild(modal);
    return modal;
};


// Initialize the region selector functionality
const initRegionSelector = () => {
    const regionLink = document.querySelector('.nav-right a');
    let modal = null;

    // Region to currency mapping
    const regionCurrencyMap = {
    'US': 'USD',    // United States Dollar
    'PT': 'EUR',    // Euro (Portugal)
    'UK': 'GBP',    // British Pound Sterling
    'FR': 'EUR',    // Euro (France)
    'DE': 'EUR',    // Euro (Germany)
    'IN': 'INR',    // Indian Rupee
    'JP': 'JPY',    // Japanese Yen
    'CN': 'CNY',    // Chinese Yuan
    'AU': 'AUD',    // Australian Dollar
    'CA': 'CAD',    // Canadian Dollar
    'BR': 'BRL',    // Brazilian Real
    'BD': 'BDT',    // Bangladeshi Taka
    };

    regionLink.addEventListener('click', (e) => {
        e.preventDefault();
        if (!modal) {
            modal = createRegionModal();
            initModalEvents();
        }
        modal.style.display = 'block';
    });

    function initModalEvents() {
        const closeBtn = modal.querySelector('.close-btn');
        const regionSelect = modal.querySelector('#region');
        const currencySelect = modal.querySelector('#currency');
        const saveBtn = modal.querySelector('.save-btn');

        // Close modal when clicking the close button
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });

        // Update currency when region changes
        regionSelect.addEventListener('change', (e) => {
            const selectedRegion = e.target.value;
            const currency = regionCurrencyMap[selectedRegion];
            currencySelect.value = currency;
        });

        // Handle save button click
        saveBtn.addEventListener('click', () => {
            const selectedRegion = regionSelect.options[regionSelect.selectedIndex].text;
            const selectedCurrency = currencySelect.value;
            
            // Update the region text in the navigation
            regionLink.textContent = selectedRegion;
            
            // Close the modal
            modal.style.display = 'none';
        });
    }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initRegionSelector);


// traveller section

// Create and append the travelers modal HTML
const createTravelersModal = () => {
    const modal = document.createElement('div');
    modal.className = 'travelers-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Travelers</h3>
            </div>
            <div class="travelers-section">
                <div class="traveler-type">
                    <div class="traveler-info">
                        <h4>Adults</h4>
                    </div>
                    <div class="counter">
                        <button class="decrement" data-type="adults">−</button>
                        <span class="count" id="adults-count">2</span>
                        <button class="increment" data-type="adults">+</button>
                    </div>
                </div>
                <div class="traveler-type">
                    <div class="traveler-info">
                        <h4>Children</h4>
                        <p class="age-info">Ages 0 to 17</p>
                    </div>
                    <div class="counter">
                        <button class="decrement" data-type="children" disabled>−</button>
                        <span class="count" id="children-count">0</span>
                        <button class="increment" data-type="children">+</button>
                    </div>
                </div>
                <div class="pets-section">
                    <label class="pets-checkbox">
                        <input type="checkbox" id="pets-checkbox">
                        <span>I am traveling with pets</span>
                    </label>
                </div>
            </div>
            <button class="done-btn">Done</button>
        </div>
    `;
    document.body.appendChild(modal);
    return modal;
};

// Initialize the travelers selector functionality
const initTravelersSelector = () => {
    const guestsSelect = document.getElementById('guests');
    let modal = null;
    let counts = {
        adults: 2,
        children: 0
    };

    // Create and initialize modal when guests select is clicked
    guestsSelect.addEventListener('click', (e) => {
        e.preventDefault();
        if (!modal) {
            modal = createTravelersModal();
            initModalEvents();
        }
        modal.style.display = 'block';
        // Parse current selection and update counts
        const currentValue = guestsSelect.value;
        const totalTravelers = parseInt(currentValue);
        if (!isNaN(totalTravelers)) {
            counts.adults = Math.min(totalTravelers, 2);
            updateCountDisplay();
        }
    });

    function initModalEvents() {
        const incrementBtns = modal.querySelectorAll('.increment');
        const decrementBtns = modal.querySelectorAll('.decrement');
        const doneBtn = modal.querySelector('.done-btn');

        // Handle increment buttons
        incrementBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const type = btn.dataset.type;
                counts[type]++;
                updateCountDisplay();
                updateButtonStates();
            });
        });

        // Handle decrement buttons
        decrementBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const type = btn.dataset.type;
                if (counts[type] > 0) {
                    counts[type]--;
                    updateCountDisplay();
                    updateButtonStates();
                }
            });
        });

        // Handle done button
        doneBtn.addEventListener('click', () => {
            const total = counts.adults + counts.children;
            guestsSelect.value = `${total} travelers`;
            modal.style.display = 'none';
        });

        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }

    function updateCountDisplay() {
        const adultsCount = modal.querySelector('#adults-count');
        const childrenCount = modal.querySelector('#children-count');
        
        adultsCount.textContent = counts.adults;
        childrenCount.textContent = counts.children;
    }

    function updateButtonStates() {
        const adultsDec = modal.querySelector('.decrement[data-type="adults"]');
        const childrenDec = modal.querySelector('.decrement[data-type="children"]');
        
        // Disable decrement buttons when count is 0
        adultsDec.disabled = counts.adults <= 0;
        childrenDec.disabled = counts.children <= 0;
    }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initTravelersSelector);

// JavaScript to handle the toggle and image navigation

// Get elements
const toggleBtn = document.querySelector('.toggle-btn');
const popup = document.getElementById('popup');
const closeBtn = document.querySelector('.close-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const popupImages = [
    { src: "H4.jpeg", description: "Cozy bedroom with queen-sized bed." },
    { src: "H5.jpeg", description: "Lake-side stting area." },
    { src: "H6.jpeg", description: "Boho themed aesthetic king-sized bed." },
    { src: "H7.jpeg", description: "Spacious living room with a sofa." },
    { src: "H8.jpeg", description: "Open space kitchen with marble top." },
    // Add more images and descriptions as needed
];

let currentImageIndex = 0;

// Show the popup when the toggle button is clicked
toggleBtn.addEventListener('click', function () {
    popup.style.display = 'flex';
    updateImage();
    checkNavigation();
});

// Close the popup when the close button is clicked
closeBtn.addEventListener('click', function () {
    popup.style.display = 'none';
});

// Handle "Prev" button click
prevBtn.addEventListener('click', function () {
    if (currentImageIndex > 0) {
        currentImageIndex--;
        updateImage();
        checkNavigation();
    }
});

// Handle "Next" button click
nextBtn.addEventListener('click', function () {
    if (currentImageIndex < popupImages.length - 1) {
        currentImageIndex++;
        updateImage();
        checkNavigation();
    }
}); if (currentImageIndex === 0) {
        prevBtn.disabled = true; // Disable "Prev" button on the first image
    } else {
        prevBtn.disabled = false;
    }

    if (currentImageIndex === popupImages.length - 1) {
        nextBtn.disabled = true; // Disable "Next" button on the last image
    } else {
        nextBtn.disabled = false;
    }



// Update image and description in popup
function updateImage() {
    const imgElement = document.querySelector('.popup-gallery img');
    const descriptionElement = document.getElementById('image-description');
    const countElement = document.getElementById('image-count');

    imgElement.src = popupImages[currentImageIndex].src;
    descriptionElement.textContent = popupImages[currentImageIndex].description;
    countElement.textContent = `${currentImageIndex + 1} of ${popupImages.length}`;
}


// Check if navigation buttons should be disabled
function checkNavigation() {
    if (currentImageIndex === 0) {
        prevBtn.disabled = true; // Disable "Prev" button on the first image
    } else {
        prevBtn.disabled = false;
    }

    if (currentImageIndex === popupImages.length - 1) {
        nextBtn.disabled = true; // Disable "Next" button on the last image
    } else {
        nextBtn.disabled = false;
    }
}

// PERSISTING HEART WITH ALL THE RED COLOR


document.addEventListener("DOMContentLoaded", function() {
    const heartIcon = document.querySelector(".heart-icon");
    const isFilled = localStorage.getItem("heartFilled");

    // Set initial state from localStorage
    if (isFilled === "true") {
        heartIcon.classList.add("filled");
        heartIcon.innerHTML = "&#9829;"; // Filled heart
    } else {
        heartIcon.classList.remove("filled");
        heartIcon.innerHTML = "&#9825;"; // Empty heart
    }

    // Add click event listener
    document.getElementById("btn-save").addEventListener("click", function() {
        heartIcon.classList.toggle("filled");

        // Toggle heart icon and save state to localStorage
        if (heartIcon.classList.contains("filled")) {
            heartIcon.innerHTML = "&#9829;";
            localStorage.setItem("heartFilled", "true");
        } else {
            heartIcon.innerHTML = "&#9825;";
            localStorage.setItem("heartFilled", "false");
        }
    });
});




// document.addEventListener('DOMContentLoaded', function() {
//     const shareButton = document.querySelector('.btn-share');
//     const modal = document.getElementById('shareModal');
//     const closeButton = modal.querySelector('.close-button');
//     const shareOptions = modal.querySelectorAll('.share-option');
//     const copySuccess = document.getElementById('copySuccess');
    
//     // Open modal
//     shareButton.addEventListener('click', () => {
//         modal.style.display = 'block';
//     });
    
//     // Close modal
//     closeButton.addEventListener('click', () => {
//         modal.style.display = 'none';
//     });
    
//     // Close modal when clicking outside
//     window.addEventListener('click', (e) => {
//         if (e.target === modal) {
//             modal.style.display = 'none';
//         }
//     });
    
    // Handle share options
// script.js
document.addEventListener('DOMContentLoaded', function() {
    const shareBtn = document.querySelector('.btn-share');
    const modal = document.getElementById('shareModal');
    const modalContent = modal.querySelector('.share-modal-content');
    const closeBtn = modal.querySelector('.share-close-btn');
    const shareOptions = modal.querySelectorAll('.share-option');
    const toast = document.getElementById('shareToast');
    
    function openModal() {
        modal.style.display = 'block';
        // Force reflow
        modal.offsetHeight;
        modal.classList.add('active');
    }
    
    function closeModal() {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }
    
    function showToast() {
        toast.style.display = 'block';
        // Force reflow
        toast.offsetHeight;
        // Reset animation
        toast.style.animation = 'none';
        toast.offsetHeight;
        toast.style.animation = null;
        
        setTimeout(() => {
            toast.style.display = 'none';
        }, 2000);
    }
    
    // Improved copy to clipboard function with fallback
    async function copyToClipboard(text) {
        try {
            // Try to use the modern clipboard API first
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(text);
                return true;
            }
            
            // Fallback for older browsers or non-HTTPS
            const textArea = document.createElement('textarea');
            textArea.value = text;
            
            // Make the textarea invisible
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            textArea.style.top = '-999999px';
            document.body.appendChild(textArea);
            
            textArea.focus();
            textArea.select();
            
            try {
                document.execCommand('copy');
                textArea.remove();
                return true;
            } catch (err) {
                console.error('Failed to copy using execCommand:', err);
                textArea.remove();
                return false;
            }
        } catch (err) {
            console.error('Failed to copy:', err);
            return false;
        }
    }
    
    // Open modal
    shareBtn.addEventListener('click', openModal);
    
    // Close modal
    closeBtn.addEventListener('click', closeModal);
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Prevent modal content clicks from closing modal
    modalContent.addEventListener('click', (e) => {
        e.stopPropagation();
    });
    
    // Handle share options
    shareOptions.forEach(option => {
        option.addEventListener('click', async () => {
            const platform = option.getAttribute('data-platform');
            const url = encodeURIComponent(window.location.href);
            const title = encodeURIComponent('Juneau Vacation Home: Stunning View');
            
            switch(platform) {
                case 'facebook':
                    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
                    break;
                    
                case 'whatsapp':
                    window.open(`https://wa.me/?text=${title}%20${url}`, '_blank');
                    break;
                    
                case 'copy':
                    const success = await copyToClipboard(window.location.href);
                    if (success) {
                        showToast();
                    } else {
                        // Update toast message for error case
                        toast.textContent = 'Failed to copy link. Please try again.';
                        toast.style.backgroundColor = '#f44336';
                        showToast();
                        // Reset toast message and color after showing error
                        setTimeout(() => {
                            toast.textContent = 'Link copied to clipboard!';
                            toast.style.backgroundColor = '#4CAF50';
                        }, 2000);
                    }
                    break;
            }
        });
    });
    
    // Handle keyboard events
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
});


