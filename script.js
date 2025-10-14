// ==========================================
// NAVBAR SCROLL EFFECT
// ==========================================
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ==========================================
// MOBILE MENU TOGGLE
// ==========================================
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    // Animate hamburger icon
    const spans = navToggle.querySelectorAll('span');
    if (navLinks.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translateY(10px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking on a link
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// ==========================================
// SMOOTH SCROLL FOR NAVIGATION
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ==========================================
// SCROLL REVEAL ANIMATION
// ==========================================
const revealElements = document.querySelectorAll('.scroll-reveal');

const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const revealPoint = 100;
    
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        
        if (elementTop < windowHeight - revealPoint) {
            element.classList.add('revealed');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// ==========================================
// PARALLAX EFFECT FOR HERO SECTION
// ==========================================
const hero = document.querySelector('.hero');
const heroContent = document.querySelector('.hero-content');

if (hero && heroContent) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.5;
        
        if (scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${rate}px)`;
            heroContent.style.opacity = 1 - (scrolled / window.innerHeight) * 0.8;
        }
    });
}

// ==========================================
// PARALLAX EFFECT FOR GALLERY ITEMS
// ==========================================
const galleryItems = document.querySelectorAll('.gallery-item');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    galleryItems.forEach((item, index) => {
        const itemTop = item.offsetTop;
        const itemHeight = item.offsetHeight;
        const windowHeight = window.innerHeight;
        
        if (scrolled + windowHeight > itemTop && scrolled < itemTop + itemHeight) {
            const rate = ((scrolled + windowHeight - itemTop) / (windowHeight + itemHeight)) * 100;
            const translateY = (rate - 50) * 0.3;
            
            // Alternate parallax direction for visual interest
            if (index % 2 === 0) {
                item.style.transform = `translateY(${translateY}px)`;
            } else {
                item.style.transform = `translateY(${-translateY}px)`;
            }
        }
    });
});

// ==========================================
// PARALLAX EFFECT FOR FEATURE CARDS
// ==========================================
const featureCards = document.querySelectorAll('.feature-card');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    featureCards.forEach((card, index) => {
        const cardTop = card.offsetTop;
        const cardHeight = card.offsetHeight;
        const windowHeight = window.innerHeight;
        
        if (scrolled + windowHeight > cardTop && scrolled < cardTop + cardHeight) {
            const rate = ((scrolled + windowHeight - cardTop) / (windowHeight + cardHeight)) * 100;
            const translateY = (rate - 50) * 0.2;
            
            // Stagger the parallax effect
            const delay = index * 0.1;
            card.style.transform = `translateY(${translateY * (1 + delay)}px)`;
        }
    });
});

// ==========================================
// RESERVATION FORM HANDLER
// ==========================================
const reservationForm = document.getElementById('reservationForm');

if (reservationForm) {
    reservationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(reservationForm);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        
        // Create WhatsApp message
        const message = `Reservierungsanfrage:
Name: ${data.name}
Telefon: ${data.phone}
Datum: ${data.date}
Uhrzeit: ${data.time}
Personen: ${data.guests}
${data.message ? `Besondere Wünsche: ${data.message}` : ''}`;
        
        const whatsappUrl = `https://wa.me/4901629260784?text=${encodeURIComponent(message)}`;
        
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #d4af37, #f4d03f);
            color: #0a0a0a;
            padding: 2rem 3rem;
            border-radius: 15px;
            font-size: 1.2rem;
            font-weight: 600;
            z-index: 10000;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
            animation: fadeIn 0.5s ease;
        `;
        successMessage.textContent = 'Weiterleitung zu WhatsApp...';
        document.body.appendChild(successMessage);
        
        // Redirect to WhatsApp after a short delay
        setTimeout(() => {
            window.open(whatsappUrl, '_blank');
            successMessage.remove();
            reservationForm.reset();
        }, 1500);
    });
}

// ==========================================
// ICON ANIMATION ON HOVER
// ==========================================
const icons = document.querySelectorAll('.feature-icon, .gallery-icon, .placeholder-icon');

icons.forEach(icon => {
    icon.addEventListener('mouseenter', function() {
        this.style.animation = 'none';
        setTimeout(() => {
            this.style.animation = 'iconBounce 0.6s ease';
        }, 10);
    });
});

// ==========================================
// ADD CSS ANIMATIONS
// ==========================================
const style = document.createElement('style');
style.textContent = `
    @keyframes iconBounce {
        0%, 100% { transform: scale(1) rotate(0deg); }
        25% { transform: scale(1.1) rotate(-5deg); }
        50% { transform: scale(1.15) rotate(5deg); }
        75% { transform: scale(1.1) rotate(-5deg); }
    }
    
    @keyframes fadeIn {
        from { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
        to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
    }
    
    @keyframes trailFade {
        from { 
            opacity: 1; 
            transform: scale(1);
        }
        to { 
            opacity: 0; 
            transform: scale(0);
        }
    }
`;
document.head.appendChild(style);

// ==========================================
// CURSOR TRAIL EFFECT (Desktop only)
// ==========================================
const createCursorTrail = () => {
    let lastX = 0;
    let lastY = 0;
    let trails = [];
    const maxTrails = 5;
    
    document.addEventListener('mousemove', (e) => {
        const dx = e.clientX - lastX;
        const dy = e.clientY - lastY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Only create trail if mouse moved significantly
        if (distance > 50) {
            const trail = document.createElement('div');
            trail.style.cssText = `
                position: fixed;
                width: 4px;
                height: 4px;
                background: radial-gradient(circle, rgba(212, 175, 55, 0.6), transparent);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                left: ${e.clientX}px;
                top: ${e.clientY}px;
                animation: trailFade 1s ease-out forwards;
            `;
            
            document.body.appendChild(trail);
            trails.push(trail);
            
            // Remove old trails
            if (trails.length > maxTrails) {
                const oldTrail = trails.shift();
                oldTrail.remove();
            }
            
            // Remove trail after animation
            setTimeout(() => {
                trail.remove();
                trails = trails.filter(t => t !== trail);
            }, 1000);
            
            lastX = e.clientX;
            lastY = e.clientY;
        }
    });
};

// Initialize cursor trail on desktop only
if (window.innerWidth > 1024) {
    createCursorTrail();
}

// ==========================================
// ENTRANCE ANIMATION DELAY
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.feature-card, .gallery-item, .event-card');
    
    animatedElements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.1}s`;
    });
});

// ==========================================
// INTERSECTION OBSERVER (Efficient Scroll)
// ==========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, observerOptions);

// Observe all scroll-reveal elements
revealElements.forEach(element => {
    observer.observe(element);
});

// ==========================================
// PAGE LOADING ANIMATION
// ==========================================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ==========================================
// CONSOLE MESSAGE
// ==========================================
console.log('%c🥂 D&O Cafe Bar Lounge', 'color: #d4af37; font-size: 24px; font-weight: bold;');
console.log('%cWebsite loaded successfully!', 'color: #f4d03f; font-size: 14px;');
console.log('%cContact: 01629260784', 'color: #b0b0b0; font-size: 12px;');