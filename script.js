// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle Functionality
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // Set initial theme
    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        if (themeToggle) {
            themeToggle.checked = true;
        }
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        if (themeToggle) {
            themeToggle.checked = false;
        }
    }

    // Theme toggle event listener
    if (themeToggle) {
        themeToggle.addEventListener('change', function() {
            if (this.checked) {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
            }
        });
    }
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');
    const navLinks = document.querySelectorAll('.nav-list a');

    // Toggle mobile menu
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            navList.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navList.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navList.contains(event.target) || menuToggle.contains(event.target);
        if (!isClickInsideNav && navList.classList.contains('active')) {
            navList.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });

    // Close mobile menu on escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && navList.classList.contains('active')) {
            navList.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.focus();
        }
    });

    // Services Toggle Button
    const showServicesButton = document.getElementById('show-services-button');
    const servicesContent = document.getElementById('services-content');

    if (showServicesButton && servicesContent) {
        showServicesButton.addEventListener('click', function() {
            const isExpanded = showServicesButton.getAttribute('aria-expanded') === 'true';
            
            if (isExpanded) {
                servicesContent.style.display = 'none';
                showServicesButton.textContent = 'Show our services';
                showServicesButton.setAttribute('aria-expanded', 'false');
                showServicesButton.setAttribute('aria-label', 'Show our services');
            } else {
                servicesContent.style.display = 'block';
                showServicesButton.textContent = 'Hide';
                showServicesButton.setAttribute('aria-expanded', 'true');
                showServicesButton.setAttribute('aria-label', 'Hide services');
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(event) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '#main-content') {
                event.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Service cards keyboard navigation enhancement
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                // Add visual feedback on keyboard activation
                card.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    card.style.transform = '';
                }, 150);
            }
        });
    });

    // Interactive Card Button
    const interactiveCard = document.getElementById('interactive-card');
    const cardButton = document.getElementById('card-button');
    const confirmationMessage = document.getElementById('confirmation-message');

    if (cardButton && interactiveCard) {
        cardButton.addEventListener('click', function() {
            // Toggle clicked state
            interactiveCard.classList.toggle('clicked');
            
            // Show confirmation message
            if (interactiveCard.classList.contains('clicked')) {
                confirmationMessage.textContent = '✓ Button clicked! Card appearance changed.';
                cardButton.setAttribute('aria-label', 'Button clicked - card appearance changed');
            } else {
                confirmationMessage.textContent = '';
                cardButton.setAttribute('aria-label', 'Click to change card appearance');
            }
        });

        // Keyboard support for card button
        cardButton.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                cardButton.click();
            }
        });
    }
});

