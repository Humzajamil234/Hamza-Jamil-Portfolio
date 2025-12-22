// Main JavaScript for Portfolio Website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initPreloader();
    initCustomCursor();
    initMobileMenu();
    initThemeToggle();
    initTypingEffect();
    initScrollEffects();
    initSkillBars();
    initProjectFilter();
    initContactForm();
    initBackToTop();
    initCounters();
    initAnimations();
    initCurrentYear();
    initTooltips();
    initNotifications();
});

// ==================== PRELOADER ====================
function initPreloader() {
    const preloader = document.querySelector('.preloader');
    if (!preloader) return;
    
    // Simulate loading process
    let progress = 0;
    const progressFill = document.querySelector('.progress-fill');
    const loadingText = document.querySelector('.loading-text');
    
    const loadingInterval = setInterval(() => {
        progress += Math.random() * 20;
        if (progress > 100) progress = 100;
        
        if (progressFill) {
            progressFill.style.width = `${progress}%`;
        }
        
        if (loadingText) {
            if (progress < 33) {
                loadingText.textContent = 'Loading Portfolio...';
            } else if (progress < 66) {
                loadingText.textContent = 'Initializing Components...';
            } else {
                loadingText.textContent = 'Almost There...';
            }
        }
        
        if (progress === 100) {
            clearInterval(loadingInterval);
            setTimeout(() => {
                preloader.style.opacity = '0';
                preloader.style.visibility = 'hidden';
                document.body.style.overflow = 'auto';
                
                // Show all sections with fade-in animation
                document.querySelectorAll('.section').forEach(section => {
                    section.classList.add('loaded');
                });
            }, 500);
        }
    }, 100);
}

// ==================== CUSTOM CURSOR ====================
function initCustomCursor() {
    const cursor = document.querySelector('.custom-cursor');
    const cursorDot = document.querySelector('.cursor-dot');
    
    if (!cursor || !cursorDot) return;
    
    // Hide cursor on mobile
    if (window.innerWidth <= 768) {
        cursor.style.display = 'none';
        cursorDot.style.display = 'none';
        return;
    }
    
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let cursorDotX = 0;
    let cursorDotY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function updateCursor() {
        // Smooth movement for cursor
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        // Immediate movement for dot
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
        
        requestAnimationFrame(updateCursor);
    }
    
    updateCursor();
    
    // Cursor effects on hover
    const interactiveElements = document.querySelectorAll('a, button, .btn, .project-card, .info-item, .skill-item, .stack-item, .contact-card, .social-link');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursor.style.borderColor = 'var(--secondary)';
            cursorDot.style.transform = 'translate(-50%, -50%) scale(0.5)';
            cursorDot.style.backgroundColor = 'var(--secondary)';
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.borderColor = 'var(--primary)';
            cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorDot.style.backgroundColor = 'var(--primary)';
        });
    });
}

// ==================== MOBILE MENU ====================
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!hamburger || !navMenu) return;
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
    });
    
    // Close menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
            
            // Update active state
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

// ==================== THEME TOGGLE ====================
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle?.querySelector('i');
    
    if (!themeToggle || !themeIcon) return;
    
    // Check for saved theme or prefer color scheme
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.body.classList.add('dark-theme');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
    
    themeToggle.addEventListener('click', () => {
        if (document.body.classList.contains('dark-theme')) {
            document.body.classList.remove('dark-theme');
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
        } else {
            document.body.classList.add('dark-theme');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
        }
    });
}

// ==================== TYPING EFFECT ====================
function initTypingEffect() {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;
    
    const texts = [
        'Full Stack Developer',
        'UI/UX Designer',
        'Web Developer',
        'Problem Solver',
        'Creative Thinker'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isEnd = false;
    
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            isEnd = true;
            isDeleting = true;
            setTimeout(type, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            setTimeout(type, 500);
        } else {
            setTimeout(type, isDeleting ? 50 : 100);
        }
    }
    
    setTimeout(type, 1000);
}

// ==================== SCROLL EFFECTS ====================
function initScrollEffects() {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update active nav link
        updateActiveNavLink();
    });
    
    // Active nav link on scroll
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Scroll reveal animations
    const scrollElements = document.querySelectorAll('.scroll-reveal');
    
    const elementInView = (el, percentageScroll = 100) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= 
            ((window.innerHeight || document.documentElement.clientHeight) * (percentageScroll/100))
        );
    };
    
    const displayScrollElement = (element) => {
        element.classList.add('loaded');
    };
    
    const hideScrollElement = (element) => {
        element.classList.remove('loaded');
    };
    
    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 90)) {
                displayScrollElement(el);
            } else {
                hideScrollElement(el);
            }
        });
    };
    
    // Initialize
    handleScrollAnimation();
    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });
}

// ==================== SKILL BARS ====================
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillProgress = entry.target;
                const width = skillProgress.getAttribute('data-width');
                
                // Animate progress bar
                skillProgress.style.width = '0%';
                setTimeout(() => {
                    skillProgress.style.width = `${width}%`;
                }, 300);
                
                observer.unobserve(skillProgress);
            }
        });
    }, {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    });
    
    skillBars.forEach(bar => observer.observe(bar));
}

// ==================== PROJECT FILTER ====================
function initProjectFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (!filterButtons.length || !projectCards.length) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            // Filter projects with animation
            projectCards.forEach((card, index) => {
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    // Show with delay for staggered animation
                    setTimeout(() => {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 10);
                    }, index * 100);
                } else {
                    // Hide with animation
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// ==================== CONTACT FORM ====================
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get form values
        const formData = {
            name: this.name.value.trim(),
            email: this.email.value.trim(),
            subject: this.subject.value.trim(),
            message: this.message.value.trim()
        };
        
        // Validation
        if (!formData.name || !formData.email || !formData.message) {
            showNotification('Please fill in all required fields.', 'error');
            return;
        }
        
        if (!validateEmail(formData.email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        // Show loading state
        const submitBtn = this.querySelector('.btn');
        const originalText = submitBtn.querySelector('span').textContent;
        submitBtn.querySelector('span').textContent = 'Sending...';
        submitBtn.disabled = true;
        
        try {
            // Simulate API call - Replace with your actual API endpoint
            const response = await simulateAPICall(formData);
            
            if (response.success) {
                showNotification(`Thank you, ${formData.name}! Your message has been sent successfully. I'll get back to you soon.`, 'success');
                this.reset();
            } else {
                showNotification('Something went wrong. Please try again.', 'error');
            }
        } catch (error) {
            showNotification('An error occurred. Please try again later.', 'error');
        } finally {
            // Reset button
            submitBtn.querySelector('span').textContent = originalText;
            submitBtn.disabled = false;
        }
    });
    
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    async function simulateAPICall(data) {
        // Simulate network delay
        return new Promise(resolve => {
            setTimeout(() => {
                console.log('Form submitted:', data);
                resolve({ success: true, data });
            }, 1500);
        });
    }
}

// ==================== BACK TO TOP ====================
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');
    
    if (!backToTop) return;
    
    function toggleBackToTop() {
        if (window.scrollY > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    }
    
    // Initial check
    toggleBackToTop();
    
    // Listen to scroll events
    window.addEventListener('scroll', toggleBackToTop);
    
    // Scroll to top when clicked
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ==================== COUNTER ANIMATION ====================
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                const duration = 2000; // 2 seconds
                const step = target / (duration / 16); // 60fps
                let current = 0;
                
                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        counter.textContent = target + (counter.getAttribute('data-count') === '100' ? '%' : '+');
                        clearInterval(timer);
                    } else {
                        counter.textContent = Math.floor(current) + (counter.getAttribute('data-count') === '100' ? '%' : '+');
                    }
                }, 16);
                
                observer.unobserve(counter);
            }
        });
    }, {
        threshold: 0.5
    });
    
    counters.forEach(counter => observer.observe(counter));
}

// ==================== ANIMATIONS INITIALIZATION ====================
function initAnimations() {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        once: true,
        offset: 100,
        easing: 'ease-out-cubic'
    });
    
    // Initialize GSAP animations if available
    if (typeof gsap !== 'undefined') {
        // Hero section animation
        gsap.from('.hero-content > *', {
            duration: 1,
            y: 50,
            opacity: 0,
            stagger: 0.2,
            ease: 'power3.out'
        });
        
        // Floating elements animation
        gsap.to('.floating-element', {
            y: -20,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: 'power1.inOut'
        });
        
        // Tech icons animation
        gsap.to('.tech-icon', {
            y: -10,
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: 'power1.inOut',
            stagger: 0.5
        });
    }
}

// ==================== CURRENT YEAR ====================
function initCurrentYear() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// ==================== TOOLTIPS ====================
function initTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            const tooltip = element.getAttribute('data-tooltip');
            const tooltipEl = document.createElement('div');
            tooltipEl.className = 'tooltip';
            tooltipEl.textContent = tooltip;
            tooltipEl.style.cssText = `
                position: fixed;
                background: var(--dark);
                color: white;
                padding: 8px 15px;
                border-radius: 8px;
                font-size: 14px;
                font-weight: 500;
                z-index: 10000;
                pointer-events: none;
                transform: translate(-50%, -100%);
                margin-top: -10px;
                white-space: nowrap;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;
            
            document.body.appendChild(tooltipEl);
            
            const rect = element.getBoundingClientRect();
            tooltipEl.style.left = rect.left + rect.width / 2 + 'px';
            tooltipEl.style.top = rect.top + 'px';
            
            // Show tooltip
            setTimeout(() => {
                tooltipEl.style.opacity = '1';
            }, 10);
            
            element.tooltip = tooltipEl;
        });
        
        element.addEventListener('mouseleave', () => {
            if (element.tooltip) {
                element.tooltip.style.opacity = '0';
                setTimeout(() => {
                    if (element.tooltip && element.tooltip.parentNode) {
                        element.tooltip.parentNode.removeChild(element.tooltip);
                    }
                    element.tooltip = null;
                }, 300);
            }
        });
    });
}

// ==================== NOTIFICATIONS ====================
function initNotifications() {
    window.showNotification = function(message, type = 'info') {
        const container = document.getElementById('toastContainer') || createToastContainer();
        
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const icons = {
            success: 'fa-check-circle',
            error: 'fa-exclamation-circle',
            info: 'fa-info-circle',
            warning: 'fa-exclamation-triangle'
        };
        
        toast.innerHTML = `
            <i class="fas ${icons[type] || icons.info}"></i>
            <div class="toast-content">
                <div class="toast-title">${type.charAt(0).toUpperCase() + type.slice(1)}</div>
                <div class="toast-message">${message}</div>
            </div>
            <button class="toast-close">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        container.appendChild(toast);
        
        // Add styles
        toast.style.cssText = `
            background: ${document.body.classList.contains('dark-theme') ? '#1e1e1e' : 'white'};
            color: ${document.body.classList.contains('dark-theme') ? 'white' : 'var(--dark)'};
        `;
        
        // Close button functionality
        const closeBtn = toast.querySelector('.toast-close');
        closeBtn.addEventListener('click', () => {
            toast.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        });
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (toast.parentNode) {
                toast.style.animation = 'slideOutRight 0.3s ease';
                setTimeout(() => toast.remove(), 300);
            }
        }, 5000);
    };
    
    function createToastContainer() {
        const container = document.createElement('div');
        container.id = 'toastContainer';
        container.style.cssText = `
            position: fixed;
            top: 2rem;
            right: 2rem;
            z-index: 10000;
        `;
        document.body.appendChild(container);
        
        // Add keyframes for animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOutRight {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
        
        return container;
    }
}

// ==================== FLOATING SHAPES ====================
function initFloatingShapes() {
    const shapesContainer = document.querySelector('.floating-shapes');
    if (!shapesContainer) return;
    
    // Create additional floating shapes for more visual interest
    for (let i = 0; i < 8; i++) {
        const shape = document.createElement('div');
        shape.className = `shape shape-${i + 1}`;
        
        // Random properties
        const size = Math.random() * 100 + 50;
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const animationDuration = Math.random() * 20 + 10;
        const animationDelay = Math.random() * 5;
        
        shape.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${left}%;
            top: ${top}%;
            animation: floatShape ${animationDuration}s infinite linear ${animationDelay}s;
            opacity: ${Math.random() * 0.1 + 0.05};
            background: linear-gradient(45deg, 
                rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.3),
                rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.1)
            );
        `;
        
        shapesContainer.appendChild(shape);
    }
}

// ==================== FORM VALIDATION STYLES ====================
function initFormValidation() {
    const formInputs = document.querySelectorAll('.input-group input, .input-group textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('blur', () => {
            if (input.value.trim() === '') {
                input.style.borderColor = '#ef4444';
            } else {
                input.style.borderColor = '#10b981';
            }
        });
        
        input.addEventListener('input', () => {
            input.style.borderColor = 'rgba(0, 0, 0, 0.1)';
        });
    });
}

// ==================== PERFORMANCE OPTIMIZATION ====================
// Debounce function for scroll events
function debounce(func, wait = 20, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Throttle function for resize events
function throttle(func, limit = 100) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Lazy loading images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const src = img.getAttribute('data-src');
                if (src) {
                    img.src = src;
                    img.classList.add('loaded');
                }
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// Service Worker for PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('ServiceWorker registration successful');
            })
            .catch(err => {
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}

// Initialize additional features
initFloatingShapes();
initFormValidation();

// Handle window resize
window.addEventListener('resize', throttle(() => {
    // Reinitialize cursor on resize
    initCustomCursor();
}, 200));

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    // Escape key closes mobile menu
    if (e.key === 'Escape') {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        if (hamburger && navMenu && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }
    
    // Tab key navigation support
    if (e.key === 'Tab') {
        const focused = document.activeElement;
        const focusable = document.querySelectorAll('a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])');
        
        if (!Array.from(focusable).includes(focused)) {
            e.preventDefault();
            focusable[0].focus();
        }
    }
});

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});