// ============================================
// SeezuHeartPixel - Main JavaScript
// ============================================

// DOM Elements
const mobileToggle = document.querySelector('.mobile-toggle');
const navLinks = document.querySelector('.nav-links');
const header = document.querySelector('header');
const whatsappButton = document.querySelector('.whatsapp-float');
const currentYear = document.querySelector('#current-year');
const contactForm = document.querySelector('#contact-form');
const portfolioFilter = document.querySelector('.portfolio-filter');
const portfolioItems = document.querySelectorAll('.portfolio-item');

// Brand Information
const BRAND = {
    name: 'SeezuHeartPixel',
    phone: '7723832790',
    email: 'masumsingh750@gmail.com',
    whatsappMessage: 'Hello! I visited SeezuHeartPixel website and would like to discuss a project.'
};

// ====== MOBILE NAVIGATION ======
if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        mobileToggle.classList.toggle('active');
        navLinks.classList.toggle('active');

        // Animate hamburger to X
        const spans = mobileToggle.querySelectorAll('span');
        if (mobileToggle.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

// ====== HEADER SCROLL EFFECT ======
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ====== SMOOTH SCROLL ======
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });

            // Close mobile menu
            if (navLinks.classList.contains('active')) {
                mobileToggle.classList.remove('active');
                navLinks.classList.remove('active');
                const spans = mobileToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        }
    });
});

// ====== WHATSAPP INTEGRATION ======
function openWhatsApp(message = BRAND.whatsappMessage) {
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/91${BRAND.phone}?text=${encodedMessage}`;
    window.open(whatsappURL, '_blank');
}

if (whatsappButton) {
    whatsappButton.addEventListener('click', (e) => {
        e.preventDefault();
        openWhatsApp();
    });
}

// Attach WhatsApp click to all WhatsApp buttons
document.querySelectorAll('.btn-whatsapp, [data-whatsapp]').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const customMessage = button.getAttribute('data-message') || BRAND.whatsappMessage;
        openWhatsApp(customMessage);
    });
});

// ====== SET CURRENT YEAR ======
if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

// ====== CONTACT FORM HANDLING ======
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form values
        const name = this.querySelector('#name').value.trim();
        const email = this.querySelector('#email').value.trim();
        const service = this.querySelector('#service').value;
        const message = this.querySelector('#message').value.trim();

        // Validation
        if (!name || !email || !message) {
            showAlert('Please fill in all required fields.', 'error');
            return;
        }

        if (!validateEmail(email)) {
            showAlert('Please enter a valid email address.', 'error');
            return;
        }

        // Prepare WhatsApp message
        const serviceText = service ? `Service: ${this.querySelector('#service').options[this.querySelector('#service').selectedIndex].text}` : 'Not specified';
        const whatsappMessage = `New Contact Form Submission:\n\nName: ${name}\nEmail: ${email}\n${serviceText}\n\nMessage:\n${message}\n\nPlease respond at your earliest convenience.`;

        // Send via WhatsApp
        openWhatsApp(whatsappMessage);

        // Show success message
        showAlert('Thank you! Redirecting to WhatsApp to continue the conversation.', 'success');

        // Reset form
        this.reset();
    });
}

// ====== EMAIL VALIDATION ======
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ====== ALERT SYSTEM ======
function showAlert(message, type = 'info') {
    // Remove existing alerts
    const existingAlert = document.querySelector('.custom-alert');
    if (existingAlert) existingAlert.remove();

    // Create alert element
    const alertEl = document.createElement('div');
    alertEl.className = `custom-alert alert-${type}`;
    alertEl.textContent = message;

    // Style the alert
    Object.assign(alertEl.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        padding: '15px 25px',
        background: type === 'success' ? '#25D366' : type === 'error' ? '#E63946' : '#1D3557',
        color: 'white',
        borderRadius: '8px',
        boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
        zIndex: '10000',
        animation: 'slideIn 0.3s ease, fadeOut 0.3s ease 4s forwards',
        maxWidth: '400px',
        fontSize: '0.95rem'
    });

    // Add animation styles
    if (!document.querySelector('#alert-styles')) {
        const style = document.createElement('style');
        style.id = 'alert-styles';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes fadeOut {
                to { opacity: 0; transform: translateX(100%); }
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(alertEl);

    // Remove alert after animation
    setTimeout(() => {
        if (alertEl.parentNode) {
            alertEl.parentNode.removeChild(alertEl);
        }
    }, 4300);
}

// ====== PORTFOLIO FILTER ======
if (portfolioFilter && portfolioItems.length > 0) {
    portfolioFilter.addEventListener('click', (e) => {
        if (e.target.classList.contains('filter-btn')) {
            // Update active button
            portfolioFilter.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            e.target.classList.add('active');

            const filter = e.target.getAttribute('data-filter');

            // Filter portfolio items
            portfolioItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        }
    });
}

// ====== PHONE & EMAIL CLICK ======
document.querySelectorAll('[data-phone]').forEach(element => {
    element.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = `tel:+91${BRAND.phone}`;
    });
});

document.querySelectorAll('[data-email]').forEach(element => {
    element.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = `mailto:${BRAND.email}`;
    });
});

// ====== PAGE TRANSITIONS ======
document.addEventListener('DOMContentLoaded', () => {
    // Add fade-in animation to main content
    const mainContent = document.querySelector('main');
    if (mainContent) {
        mainContent.style.opacity = '0';
        mainContent.style.animation = 'fadeInUp 0.6s ease forwards';
        setTimeout(() => {
            mainContent.style.opacity = '1';
        }, 100);
    }

    // Set active navigation based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinksAll = document.querySelectorAll('.nav-links a');

    navLinksAll.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage ||
            (currentPage === '' && linkHref === 'index.html') ||
            (currentPage.includes('special/') && linkHref === 'services.html')) {
            link.classList.add('active');
        }
    });

    // Initialize portfolio filter if exists
    if (portfolioItems.length > 0) {
        portfolioItems.forEach(item => {
            item.style.transition = 'all 0.3s ease';
        });
    }
});

// ====== LAZY LOADING FOR IMAGES ======
document.addEventListener('DOMContentLoaded', () => {
    const lazyImages = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
});

// ====== PRICING PLAN SELECTION ======
document.querySelectorAll('.pricing-card .btn').forEach(button => {
    button.addEventListener('click', function () {
        const plan = this.closest('.pricing-card').querySelector('h3').textContent;
        const price = this.closest('.pricing-card').querySelector('.price').textContent;

        const message = `Hello! I'm interested in the ${plan} plan (${price}). Can you provide more details?`;
        openWhatsApp(message);
    });
});

// ====== SCROLL REVEAL ANIMATIONS ======
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.card, .portfolio-item, .service-category, .contact-method').forEach(el => {
    observer.observe(el);
});

// ====== SPECIAL PAGE FUNCTIONALITY ======
// Function to generate emotional messages
function getEmotionalMessage(type) {
    const messages = {
        birthday: `I want to create a special birthday website that will make this day unforgettable!`,
        anniversary: `I'd love to create a beautiful anniversary website to celebrate our special milestone.`,
        surprise: `I want to create an amazing surprise website that will leave them speechless!`
    };
    return messages[type] || BRAND.whatsappMessage;
}

// Attach special page CTAs
document.querySelectorAll('[data-special]').forEach(element => {
    element.addEventListener('click', function () {
        const specialType = this.getAttribute('data-special');
        const message = getEmotionalMessage(specialType);
        openWhatsApp(message);
    });
});