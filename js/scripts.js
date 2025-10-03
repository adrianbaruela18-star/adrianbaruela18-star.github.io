// ========================================
// ENHANCED PORTFOLIO SCRIPTS - Adrian Dela Cruz 2026
// Advanced Interactivity & Animations
// ========================================

// ========================================
// GLOBAL VARIABLES & INITIALIZATION
// ========================================

let currentSlideIndex = 0;
let slideshowInterval;
let isPlaying = true;
let videoElement;

// Gallery images configuration
const galleryImages = [
    { src: 'ACT12_BARUELA/1.jpg', format: 'JPG' },
    { src: 'ACT12_BARUELA/2.jpg', format: 'JPG' },
    { src: 'ACT12_BARUELA/3.jpg', format: 'JPG' },
    { src: 'ACT12_BARUELA/4.jpg', format: 'JPG' },
    { src: 'ACT12_BARUELA/5.jpg', format: 'JPG' },
    { src: 'ACT12_BARUELA/6.jpg', format: 'JPG' },
    { src: 'ACT12_BARUELA/7.jpg', format: 'JPG' },
    { src: 'ACT12_BARUELA/8.jpg', format: 'JPG' },
    { src: 'ACT12_BARUELA/9.jpg', format: 'JPG' },
    { src: 'ACT12_BARUELA/10.jpg', format: 'JPG' },
    { src: 'ACT12_BARUELA/11.jpg', format: 'JPG' },
    { src: 'ACT12_BARUELA/12.jpg', format: 'JPG' },
    { src: 'ACT12_BARUELA/13.jpg', format: 'JPG' },
    { src: 'ACT12_BARUELA/14.jpg', format: 'JPG' },
    { src: 'ACT12_BARUELA/15.jpg', format: 'JPG' },
    { src: 'ACT12_BARUELA/16.jpg', format: 'JPG' },
    { src: 'ACT12_BARUELA/17.jpg', format: 'JPG' },
    { src: 'ACT12_BARUELA/18.jpg', format: 'JPG' },
    { src: 'ACT12_BARUELA/19.jpg', format: 'JPG' },
    { src: 'ACT12_BARUELA/20.jpg', format: 'JPG' }
];

// ========================================
// PAGE LOAD ANIMATIONS & EFFECTS
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize cursor effects
    initCustomCursor();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize typing effect
    initTypingEffect();
    
    // Initialize particle effects
    initParticleEffects();
    
    // Initialize gallery if on gallery page
    if (document.getElementById('main-slideshow')) {
        initGallery();
        initNeuralParticles();
    }
    
    // Initialize smooth scrolling
    initSmoothScroll();
    
    // Initialize parallax effects
    initParallax();
    
    // Initialize counter animations
    initCounters();
    
    // Add loading screen fade out
    fadeOutLoadingScreen();
    
    // Initialize hover sound effects (optional)
    initHoverEffects();
    
    // Initialize skill bars animation
    animateSkillBars();
    
    // Initialize project card interactions
    initProjectCards();
    
    // Initialize mobile menu if needed
    initMobileMenu();
    
    // Initialize theme particles
    createFloatingParticles();
});

// ========================================
// CUSTOM CURSOR EFFECT
// ========================================

function initCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    const cursorFollower = document.createElement('div');
    cursorFollower.className = 'cursor-follower';
    
    document.body.appendChild(cursor);
    document.body.appendChild(cursorFollower);
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;
    
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.3;
        cursorY += (mouseY - cursorY) * 0.3;
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        
        cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
        cursorFollower.style.transform = `translate(${followerX}px, ${followerY}px)`;
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    // Cursor effects on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .portfolio-card, .project-card, .nav-cell');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-hover');
            cursorFollower.classList.add('cursor-hover');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-hover');
            cursorFollower.classList.remove('cursor-hover');
        });
    });
}

// ========================================
// SCROLL ANIMATIONS
// ========================================

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all fade-in elements
    const fadeElements = document.querySelectorAll('.fade-in-on-scroll, .portfolio-card, .project-card, .info-card, .education-item');
    fadeElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
}

// ========================================
// TYPING EFFECT
// ========================================

function initTypingEffect() {
    const typingElements = document.querySelectorAll('.typing-effect');
    
    typingElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        element.style.opacity = '1';
        
        let i = 0;
        const typeWriter = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typeWriter);
            }
        }, 50);
    });
}

// ========================================
// PARTICLE EFFECTS
// ========================================

function initParticleEffects() {
    const particleField = document.querySelector('.particle-field');
    if (!particleField) return;
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 5 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particleField.appendChild(particle);
    }
}

// ========================================
// GALLERY FUNCTIONS
// ========================================

function initGallery() {
    videoElement = document.getElementById('urvid');
    const slideshow = document.getElementById('main-slideshow');
    
    if (!slideshow) return;
    
    // Create slides
    galleryImages.forEach((image, index) => {
        const slide = document.createElement('div');
        slide.className = 'slide';
        slide.innerHTML = `<img src="${image.src}" alt="Gallery Image ${index + 1}" loading="lazy">`;
        slideshow.appendChild(slide);
    });
    
    // Create indicators
    const indicatorsContainer = document.getElementById('indicators-container');
    galleryImages.forEach((_, index) => {
        const indicator = document.createElement('span');
        indicator.className = 'indicator';
        indicator.onclick = () => currentSlide(index);
        indicatorsContainer.appendChild(indicator);
    });
    
    // Update total images count
    document.getElementById('total-images').textContent = galleryImages.length;
    
    // Show first slide
    showSlide(0);
    
    // Start autoplay
    startSlideshow();
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') changeSlide(-1);
        if (e.key === 'ArrowRight') changeSlide(1);
        if (e.key === ' ') {
            e.preventDefault();
            toggleSlideshow();
        }
    });
}

function showSlide(index) {
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    
    if (index >= galleryImages.length) {
        currentSlideIndex = 0;
    } else if (index < 0) {
        currentSlideIndex = galleryImages.length - 1;
    } else {
        currentSlideIndex = index;
    }
    
    // Hide all slides
    slides.forEach(slide => {
        slide.style.display = 'none';
        slide.classList.remove('active');
    });
    
    // Remove active from all indicators
    indicators.forEach(indicator => {
        indicator.classList.remove('active');
    });
    
    // Show current slide
    if (slides[currentSlideIndex]) {
        slides[currentSlideIndex].style.display = 'flex';
        slides[currentSlideIndex].classList.add('active');
    }
    
    // Activate current indicator
    if (indicators[currentSlideIndex]) {
        indicators[currentSlideIndex].classList.add('active');
    }
    
    // Update counter
    document.getElementById('current-image').textContent = currentSlideIndex + 1;
    
    // Update format indicator
    const currentFormat = galleryImages[currentSlideIndex].format;
    document.getElementById('current-format').textContent = currentFormat;
}

function changeSlide(direction) {
    showSlide(currentSlideIndex + direction);
}

function currentSlide(index) {
    showSlide(index);
}

function startSlideshow() {
    if (slideshowInterval) clearInterval(slideshowInterval);
    slideshowInterval = setInterval(() => {
        changeSlide(1);
    }, 4000);
    isPlaying = true;
}

function stopSlideshow() {
    if (slideshowInterval) {
        clearInterval(slideshowInterval);
        slideshowInterval = null;
    }
    isPlaying = false;
}

function toggleSlideshow() {
    const button = document.getElementById('slideshow_toggle');
    if (isPlaying) {
        stopSlideshow();
        button.textContent = 'PLAY_SLIDES';
        button.style.borderColor = '#00ff7f';
        button.style.color = '#00ff7f';
    } else {
        startSlideshow();
        button.textContent = 'PAUSE_SLIDES';
        button.style.borderColor = '#00ffff';
        button.style.color = '#00ffff';
    }
}

function toggleVideo() {
    const button = document.getElementById('pause_button');
    if (videoElement) {
        if (videoElement.paused) {
            videoElement.play();
            button.textContent = 'PAUSE_VIDEO';
            button.style.borderColor = '#00ffff';
            button.style.color = '#00ffff';
        } else {
            videoElement.pause();
            button.textContent = 'PLAY_VIDEO';
            button.style.borderColor = '#00ff7f';
            button.style.color = '#00ff7f';
        }
    }
}

function toggleFullscreen() {
    const slideshow = document.getElementById('main-slideshow');
    
    if (!document.fullscreenElement) {
        if (slideshow.requestFullscreen) {
            slideshow.requestFullscreen();
        } else if (slideshow.webkitRequestFullscreen) {
            slideshow.webkitRequestFullscreen();
        } else if (slideshow.msRequestFullscreen) {
            slideshow.msRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
}

function downloadCurrentImage() {
    const currentImage = galleryImages[currentSlideIndex];
    const link = document.createElement('a');
    link.href = currentImage.src;
    link.download = `gallery-image-${currentSlideIndex + 1}.${currentImage.format.toLowerCase()}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// ========================================
// NEURAL PARTICLES FOR GALLERY
// ========================================

function initNeuralParticles() {
    const container = document.getElementById('neural-particles');
    if (!container) return;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'neural-particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 12 + 's';
        container.appendChild(particle);
    }
}

// ========================================
// SMOOTH SCROLLING
// ========================================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#contact') {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

function scrollToSection(id) {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// ========================================
// PARALLAX EFFECTS
// ========================================

function initParallax() {
    let ticking = false;
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                const scrolled = window.pageYOffset;
                
                // Parallax for hero section
                const heroContent = document.querySelector('.hero-content');
                if (heroContent) {
                    heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
                }
                
                // Parallax for background
                const neuralBg = document.querySelector('.neural-bg');
                if (neuralBg) {
                    neuralBg.style.transform = `translateY(${scrolled * 0.1}px)`;
                }
                
                ticking = false;
            });
            
            ticking = true;
        }
    });
}

// ========================================
// COUNTER ANIMATIONS
// ========================================

function initCounters() {
    const counters = document.querySelectorAll('.stat-value, .stat-number');
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                animateCounter(entry.target);
                entry.target.classList.add('counted');
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element) {
    const text = element.textContent;
    const number = parseInt(text.replace(/[^0-9]/g, ''));
    
    if (isNaN(number)) return;
    
    const duration = 2000;
    const steps = 50;
    const stepValue = number / steps;
    const stepDuration = duration / steps;
    let current = 0;
    
    const counter = setInterval(() => {
        current += stepValue;
        if (current >= number) {
            element.textContent = text;
            clearInterval(counter);
        } else {
            element.textContent = text.replace(number, Math.floor(current));
        }
    }, stepDuration);
}

// ========================================
// LOADING SCREEN
// ========================================

function fadeOutLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }, 1000);
    }
}

// ========================================
// HOVER EFFECTS
// ========================================

function initHoverEffects() {
    const cards = document.querySelectorAll('.portfolio-card, .project-card, .info-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) rotateY(5deg) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateY(0deg) scale(1)';
        });
        
        // 3D tilt effect
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`;
        });
    });
}

// ========================================
// SKILL BARS ANIMATION
// ========================================

function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar');
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                const progress = entry.target.style.getPropertyValue('--progress');
                entry.target.style.setProperty('--current-progress', progress);
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    skillBars.forEach(bar => {
        bar.style.setProperty('--current-progress', '0%');
        observer.observe(bar);
    });
}

// ========================================
// PROJECT CARDS INTERACTIONS
// ========================================

function initProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        // Add ripple effect on click
        card.addEventListener('click', function(e) {
            if (e.target.tagName !== 'A' && e.target.tagName !== 'BUTTON') {
                const ripple = document.createElement('div');
                ripple.className = 'ripple';
                
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            }
        });
    });
}

// ========================================
// MOBILE MENU
// ========================================

function initMobileMenu() {
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '☰';
    
    const header = document.querySelector('.cyber-header .container');
    if (header && window.innerWidth <= 768) {
        header.appendChild(mobileMenuBtn);
        
        mobileMenuBtn.addEventListener('click', function() {
            const nav = document.querySelector('.cyber-nav');
            if (nav) {
                nav.classList.toggle('mobile-active');
                this.innerHTML = nav.classList.contains('mobile-active') ? '✕' : '☰';
            }
        });
    }
}

// ========================================
// FLOATING PARTICLES
// ========================================

function createFloatingParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'floating-particles';
    document.body.appendChild(particleContainer);
    
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'float-particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 10 + 's';
        particle.style.animationDuration = (Math.random() * 15 + 15) + 's';
        
        const colors = ['#00ffff', '#ff00ff', '#00ff7f', '#ffff00'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        particleContainer.appendChild(particle);
    }
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
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

// ========================================
// PERFORMANCE OPTIMIZATIONS
// ========================================

// Optimize scroll events
window.addEventListener('scroll', throttle(function() {
    // Add any scroll-dependent logic here
}, 100));

// Optimize resize events
window.addEventListener('resize', debounce(function() {
    // Add any resize-dependent logic here
}, 250));

// ========================================
// EXPORT FUNCTIONS FOR GLOBAL ACCESS
// ========================================

window.changeSlide = changeSlide;
window.currentSlide = currentSlide;
window.toggleSlideshow = toggleSlideshow;
window.toggleVideo = toggleVideo;
window.toggleFullscreen = toggleFullscreen;
window.downloadCurrentImage = downloadCurrentImage;
window.scrollToSection = scrollToSection;

console.log('🚀 Portfolio Enhanced - All systems operational!');
