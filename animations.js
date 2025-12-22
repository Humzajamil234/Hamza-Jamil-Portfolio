// Additional Animations and Effects

document.addEventListener('DOMContentLoaded', function() {
    // Initialize scroll progress bar
    initScrollProgress();
    
    // Initialize ripple effects
    initRippleEffects();
    
    // Initialize parallax effects
    initParallax();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize hover effects
    initHoverEffects();
    
    // Initialize page transitions
    initPageTransitions();
});

// ==================== SCROLL PROGRESS ====================
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);
    
    function updateScrollProgress() {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.transform = `scaleX(${scrolled / 100})`;
    }
    
    window.addEventListener('scroll', updateScrollProgress);
    updateScrollProgress();
}

// ==================== RIPPLE EFFECTS ====================
function initRippleEffects() {
    const rippleButtons = document.querySelectorAll('.btn, .nav-link, .project-link, .social-link');
    
    rippleButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.5);
                transform: scale(0);
                animation: ripple-animation 0.6s linear;
                width: ${size}px;
                height: ${size}px;
                top: ${y}px;
                left: ${x}px;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add ripple animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// ==================== PARALLAX EFFECTS ====================
function initParallax() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    if (!parallaxElements.length) return;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = element.getAttribute('data-speed') || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });
    }
    
    window.addEventListener('scroll', updateParallax);
    updateParallax();
}

// ==================== SCROLL ANIMATIONS ====================
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    if (!animatedElements.length) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const animation = element.getAttribute('data-animation') || 'fadeInUp';
                const delay = element.getAttribute('data-delay') || 0;
                
                setTimeout(() => {
                    element.style.animation = `${animation} 1s ease forwards`;
                    element.style.opacity = '1';
                }, delay);
                
                observer.unobserve(element);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        observer.observe(element);
    });
}

// ==================== HOVER EFFECTS ====================
function initHoverEffects() {
    // Tilt effect for cards
    const tiltElements = document.querySelectorAll('.tilt-effect');
    
    tiltElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateY = ((x - centerX) / centerX) * 10;
            const rotateX = ((centerY - y) / centerY) * 10;
            
            element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
    
    // Glow effect on hover
    const glowElements = document.querySelectorAll('.glow-on-hover');
    
    glowElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.classList.add('glow');
        });
        
        element.addEventListener('mouseleave', () => {
            element.classList.remove('glow');
        });
    });
}

// ==================== PAGE TRANSITIONS ====================
function initPageTransitions() {
    const links = document.querySelectorAll('a[href^="/"], a[href^="#"]:not([href="#"])');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Only apply transition for internal links (not anchor links)
            if (href.startsWith('/') && !href.startsWith('//')) {
                e.preventDefault();
                
                const transition = document.createElement('div');
                transition.className = 'page-transition';
                document.body.appendChild(transition);
                
                setTimeout(() => {
                    transition.classList.add('active');
                }, 10);
                
                setTimeout(() => {
                    window.location.href = href;
                }, 800);
            }
        });
    });
}

// ==================== PARTICLE SYSTEM ====================
function initParticleSystem() {
    const particlesContainer = document.querySelector('.particles-container');
    if (!particlesContainer) return;
    
    const particleCount = 50;
    const particles = [];
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random properties
        const size = Math.random() * 20 + 5;
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        
        particle.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${left}%;
            top: ${top}%;
            animation-duration: ${duration}s;
            animation-delay: ${delay}s;
            background: linear-gradient(45deg, 
                rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.3),
                rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.1)
            );
        `;
        
        particlesContainer.appendChild(particle);
        particles.push(particle);
    }
    
    // Update particles on scroll
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        particles.forEach((particle, index) => {
            const speed = (index % 3 + 1) * 0.5;
            const yPos = scrolled * speed * 0.1;
            particle.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// ==================== TEXT ANIMATIONS ====================
function initTextAnimations() {
    // Split text into letters for animation
    const splitTextElements = document.querySelectorAll('.split-text');
    
    splitTextElements.forEach(element => {
        const text = element.textContent;
        element.innerHTML = '';
        
        text.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '&nbsp;' : char;
            span.style.display = 'inline-block';
            span.style.animation = `fadeInUp 0.5s ease ${index * 0.1}s forwards`;
            span.style.opacity = '0';
            element.appendChild(span);
        });
    });
    
    // Typewriter effect
    const typewriterElements = document.querySelectorAll('.typewriter');
    
    typewriterElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        element.style.width = '0';
        
        let i = 0;
        const type = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                element.style.width = `${(i + 1) / text.length * 100}%`;
                i++;
                setTimeout(type, 100);
            } else {
                element.style.borderRight = 'none';
            }
        };
        
        setTimeout(type, 1000);
    });
}

// ==================== BACKGROUND ANIMATIONS ====================
function initBackgroundAnimations() {
    // Animated gradient background
    const gradientBackgrounds = document.querySelectorAll('.gradient-bg');
    
    gradientBackgrounds.forEach(bg => {
        let hue = 0;
        
        function updateGradient() {
            hue = (hue + 0.5) % 360;
            bg.style.background = `linear-gradient(45deg, 
                hsl(${hue}, 100%, 50%), 
                hsl(${(hue + 90) % 360}, 100%, 50%), 
                hsl(${(hue + 180) % 360}, 100%, 50%)
            )`;
            requestAnimationFrame(updateGradient);
        }
        
        updateGradient();
    });
    
    // Moving pattern background
    const patternBackgrounds = document.querySelectorAll('.pattern-bg');
    
    patternBackgrounds.forEach(bg => {
        let x = 0;
        let y = 0;
        
        function updatePattern() {
            x = (x + 0.5) % 100;
            y = (y + 0.3) % 100;
            bg.style.backgroundPosition = `${x}% ${y}%`;
            requestAnimationFrame(updatePattern);
        }
        
        updatePattern();
    });
}

// ==================== LOADING ANIMATIONS ====================
function initLoadingAnimations() {
    // Skeleton loading
    const skeletonElements = document.querySelectorAll('.skeleton');
    
    skeletonElements.forEach(element => {
        const width = element.getAttribute('data-width') || '100%';
        const height = element.getAttribute('data-height') || '20px';
        
        element.style.cssText = `
            position: relative;
            overflow: hidden;
            width: ${width};
            height: ${height};
            background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
            background-size: 200% 100%;
            animation: loading 1.5s infinite;
            border-radius: 4px;
        `;
    });
    
    // Add loading animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes loading {
            0% {
                background-position: 200% 0;
            }
            100% {
                background-position: -200% 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// ==================== INTERACTIVE ANIMATIONS ====================
function initInteractiveAnimations() {
    // Click animations
    document.addEventListener('click', (e) => {
        // Create click effect
        const clickEffect = document.createElement('div');
        clickEffect.className = 'click-effect';
        clickEffect.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: rgba(67, 97, 238, 0.5);
            pointer-events: none;
            z-index: 99999;
            transform: translate(-50%, -50%) scale(0);
            animation: click-animation 0.5s ease-out;
        `;
        
        clickEffect.style.left = `${e.clientX}px`;
        clickEffect.style.top = `${e.clientY}px`;
        
        document.body.appendChild(clickEffect);
        
        setTimeout(() => {
            clickEffect.remove();
        }, 500);
    });
    
    // Add click animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes click-animation {
            0% {
                transform: translate(-50%, -50%) scale(0);
                opacity: 1;
            }
            100% {
                transform: translate(-50%, -50%) scale(3);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Drag animations
    const draggableElements = document.querySelectorAll('.draggable');
    
    draggableElements.forEach(element => {
        let isDragging = false;
        let offsetX, offsetY;
        
        element.addEventListener('mousedown', (e) => {
            isDragging = true;
            offsetX = e.clientX - element.getBoundingClientRect().left;
            offsetY = e.clientY - element.getBoundingClientRect().top;
            element.style.cursor = 'grabbing';
        });
        
        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            
            element.style.position = 'fixed';
            element.style.left = `${e.clientX - offsetX}px`;
            element.style.top = `${e.clientY - offsetY}px`;
            element.style.zIndex = '10000';
        });
        
        document.addEventListener('mouseup', () => {
            isDragging = false;
            element.style.cursor = 'grab';
            element.style.position = '';
            element.style.zIndex = '';
        });
    });
}

// Initialize all additional animations
initParticleSystem();
initTextAnimations();
initBackgroundAnimations();
initLoadingAnimations();
initInteractiveAnimations();

// Performance optimization for animations
let lastScrollTime = 0;
const scrollThrottle = 100; // ms

window.addEventListener('scroll', () => {
    const now = Date.now();
    
    if (now - lastScrollTime > scrollThrottle) {
        lastScrollTime = now;
        
        // Update animations that depend on scroll
        if (typeof updateParallax === 'function') {
            updateParallax();
        }
    }
});

// Handle reduced motion preference
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (reducedMotion.matches) {
    // Disable or simplify animations
    document.querySelectorAll('*').forEach(element => {
        element.style.animationDuration = '0.001ms !important';
        element.style.animationIterationCount = '1 !important';
        element.style.transitionDuration = '0.001ms !important';
    });
}

// Handle visibility change
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when tab is hidden
        document.querySelectorAll('*').forEach(element => {
            const animation = element.style.animationPlayState;
            if (animation) {
                element.dataset.animationState = animation;
                element.style.animationPlayState = 'paused';
            }
        });
    } else {
        // Resume animations when tab is visible
        document.querySelectorAll('*').forEach(element => {
            if (element.dataset.animationState) {
                element.style.animationPlayState = element.dataset.animationState;
                delete element.dataset.animationState;
            }
        });
    }
});