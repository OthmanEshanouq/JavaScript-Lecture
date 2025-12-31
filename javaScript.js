// ============================================
// CART MANAGEMENT
// ============================================

// Cart state
let cart = {
    items: [],
    totalQuantity: 0
};

// Load cart from localStorage on page load
function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartCount();
    }
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Update cart count badge based on quantity input
function updateCartCount() {
    const quantityInput = document.getElementById('quantity-input');
    const cartCountBadge = document.getElementById('cart-count-badge');
    const cartCountBadgeMobile = document.getElementById('cart-count-badge-mobile');
    
    // Get current quantity from input field
    const currentQuantity = quantityInput ? (parseInt(quantityInput.value) || 0) : 0;
    
    if (cartCountBadge) {
        if (currentQuantity > 0) {
            cartCountBadge.textContent = currentQuantity;
            cartCountBadge.style.display = 'flex';
        } else {
            cartCountBadge.style.display = 'none';
        }
    }
    
    if (cartCountBadgeMobile) {
        if (currentQuantity > 0) {
            cartCountBadgeMobile.textContent = currentQuantity;
            cartCountBadgeMobile.style.display = 'inline-block';
        } else {
            cartCountBadgeMobile.style.display = 'none';
        }
    }
}

// Get selected size
function getSelectedSize() {
    const selectedSize = document.querySelector('input[name="size"]:checked');
    return selectedSize ? selectedSize.value : 'M';
}

// Add item to cart
function addToCart() {
    const quantityInput = document.getElementById('quantity-input');
    const quantity = parseInt(quantityInput.value) || 0;
    
    // Don't add to cart if quantity is 0
    if (quantity <= 0) {
        showCartFeedback('Please select a quantity first!');
        return;
    }
    
    const selectedSize = getSelectedSize();
    
    // Check if item with same size already exists
    const existingItemIndex = cart.items.findIndex(item => item.size === selectedSize);
    
    if (existingItemIndex > -1) {
        // Update quantity if item exists
        cart.items[existingItemIndex].quantity += quantity;
    } else {
        // Add new item
        cart.items.push({
            id: Date.now(),
            name: 'N-Tech Premium T-Shirt',
            size: selectedSize,
            quantity: quantity,
            price: 34.99
        });
    }
    
    // Update total quantity
    cart.totalQuantity = cart.items.reduce((sum, item) => sum + item.quantity, 0);
    
    saveCart();
    updateCartCount();
    
    // Show feedback
    showCartFeedback('Item added to cart!');
}

// Increase quantity
function increaseQuantity() {
    const quantityInput = document.getElementById('quantity-input');
    let currentQuantity = parseInt(quantityInput.value) || 1;
    if (currentQuantity < 99) {
        currentQuantity++;
        quantityInput.value = currentQuantity;
        updateCartCount(); // Update badge when quantity changes
    }
}

// Decrease quantity
function decreaseQuantity() {
    const quantityInput = document.getElementById('quantity-input');
    let currentQuantity = parseInt(quantityInput.value) || 1;
    if (currentQuantity > 0) {
        currentQuantity--;
        quantityInput.value = currentQuantity;
        updateCartCount(); // Update badge when quantity changes
    }
}

// Show cart feedback message
function showCartFeedback(message) {
    const feedback = document.createElement('div');
    feedback.className = 'cart-feedback';
    feedback.textContent = message;
    document.body.appendChild(feedback);
    
    setTimeout(() => {
        feedback.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        feedback.classList.remove('show');
        setTimeout(() => {
            feedback.remove();
        }, 300);
    }, 2000);
}

// ============================================
// FAQ TOGGLE
// ============================================

function toggleFAQ() {
    const faqSection = document.getElementById('faq-section');
    const faqToggleBtn = document.getElementById('faq-toggle-btn');
    
    if (faqSection && faqToggleBtn) {
        const isHidden = faqSection.classList.contains('hidden');
        
        if (isHidden) {
            faqSection.classList.remove('hidden');
            faqToggleBtn.textContent = 'Hide FAQ';
            faqToggleBtn.setAttribute('aria-expanded', 'true');
        } else {
            faqSection.classList.add('hidden');
            faqToggleBtn.textContent = 'Show FAQ';
            faqToggleBtn.setAttribute('aria-expanded', 'false');
        }
    }
}

// ============================================
// THEME TOGGLE (DAY/NIGHT MODE)
// ============================================

// Initialize theme on page load
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);
    
    // Update toggle button states
    const themeToggle = document.getElementById('theme-toggle');
    const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
    
    if (themeToggle) {
        themeToggle.checked = savedTheme === 'dark';
    }
    
    if (mobileThemeToggle) {
        mobileThemeToggle.checked = savedTheme === 'dark';
    }
}

// Toggle theme
function toggleTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        const currentTheme = themeToggle.checked ? 'dark' : 'light';
        applyTheme(currentTheme);
        localStorage.setItem('theme', currentTheme);
    }
}

// Apply theme styles
function applyTheme(theme) {
    const root = document.documentElement;
    
    if (theme === 'dark') {
        root.classList.add('dark-mode');
    } else {
        root.classList.remove('dark-mode');
    }
}

// ============================================
// INITIALIZE ON PAGE LOAD
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize cart
    loadCart();
    
    // Initialize theme
    initializeTheme();
    
    // Set default quantity and add validation
    const quantityInput = document.getElementById('quantity-input');
    if (quantityInput) {
        if (!quantityInput.value || quantityInput.value === '0') {
            quantityInput.value = 1;
        }
        
        // Initial cart count update
        updateCartCount();
        
        // Validate quantity input
        quantityInput.addEventListener('input', function() {
            let value = parseInt(this.value);
            if (isNaN(value) || value < 0) {
                this.value = 0;
            } else if (value > 99) {
                this.value = 99;
            }
            updateCartCount(); // Update badge when quantity changes
        });
        
        // Prevent invalid characters
        quantityInput.addEventListener('keydown', function(e) {
            // Allow: backspace, delete, tab, escape, enter
            if ([46, 8, 9, 27, 13].indexOf(e.keyCode) !== -1 ||
                // Allow: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
                (e.keyCode === 65 && e.ctrlKey === true) ||
                (e.keyCode === 67 && e.ctrlKey === true) ||
                (e.keyCode === 86 && e.ctrlKey === true) ||
                (e.keyCode === 88 && e.ctrlKey === true) ||
                // Allow: home, end, left, right
                (e.keyCode >= 35 && e.keyCode <= 39)) {
                return;
            }
            // Ensure that it is a number and stop the keypress
            if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                e.preventDefault();
            }
        });
    }
    
    // Theme toggle event listeners
    const themeToggle = document.getElementById('theme-toggle');
    const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
    
    if (themeToggle) {
        themeToggle.addEventListener('change', toggleTheme);
    }
    
    if (mobileThemeToggle) {
        mobileThemeToggle.addEventListener('change', function() {
            // Sync mobile toggle with desktop toggle
            if (themeToggle) {
                themeToggle.checked = mobileThemeToggle.checked;
            }
            toggleTheme();
        });
    }
    
    // Sync desktop toggle with mobile toggle
    if (themeToggle && mobileThemeToggle) {
        themeToggle.addEventListener('change', function() {
            mobileThemeToggle.checked = themeToggle.checked;
        });
    }
});

