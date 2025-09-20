// Video control variables
var video = document.getElementById("urvid");
var pauseBtn = document.getElementById("pause_button");

// Slideshow variables
var currentSlide = 0;
var slides = [];
var indicators = [];
var autoTimer = null;
var isPlaying = true;

// Video control function
function toggleVideo() {
  if (video) {
    if (video.paused) {
      video.play();
      pauseBtn.innerHTML = "Pause Video";
    } else {
      video.pause();
      pauseBtn.innerHTML = "Play Video";
    }
  }
}

// Legacy function name for backward compatibility
function myFunction() {
  toggleVideo();
}

// Initialize slideshow
function initSlides() {
  slides = Array.from(document.querySelectorAll(".slide"));
  indicators = Array.from(document.querySelectorAll(".indicator"));
  
  if (slides.length === 0) return;
  
  // Reset all slides and indicators
  slides.forEach(slide => slide.classList.remove("active"));
  indicators.forEach(indicator => indicator.classList.remove("active"));
  
  // Set first slide as active
  currentSlide = 0;
  slides[currentSlide].classList.add("active");
  if (indicators[currentSlide]) {
    indicators[currentSlide].classList.add("active");
  }
  
  // Start auto-slideshow
  startAutoSlideshow();
  
  // Add keyboard navigation
  document.addEventListener('keydown', handleKeyPress);
  
  // Add touch/swipe support for mobile
  addTouchSupport();
}

// Show specific slide
function showSlide(n) {
  if (slides.length === 0) return;
  
  // Remove active class from current slide and indicator
  slides[currentSlide].classList.remove("active");
  if (indicators[currentSlide]) {
    indicators[currentSlide].classList.remove("active");
  }
  
  // Calculate new slide index (with wrapping)
  currentSlide = (n + slides.length) % slides.length;
  
  // Add active class to new slide and indicator
  slides[currentSlide].classList.add("active");
  if (indicators[currentSlide]) {
    indicators[currentSlide].classList.add("active");
  }
  
  // Restart auto-slideshow timer
  if (isPlaying) {
    startAutoSlideshow();
  }
}

// Navigate to next slide
function nextSlide() {
  showSlide(currentSlide + 1);
}

// Navigate to previous slide
function prevSlide() {
  showSlide(currentSlide - 1);
}

// Change slide by offset
function changeSlide(offset) {
  showSlide(currentSlide + offset);
}

// Go to specific slide (1-indexed for UI)
function currentSlide(n) {
  showSlide(n - 1);
}

// Start automatic slideshow
function startAutoSlideshow() {
  stopAutoSlideshow();
  autoTimer = setInterval(nextSlide, 4000); // Change slide every 4 seconds
}

// Stop automatic slideshow
function stopAutoSlideshow() {
  if (autoTimer) {
    clearInterval(autoTimer);
    autoTimer = null;
  }
}

// Toggle slideshow play/pause
function toggleSlideshow() {
  const toggleBtn = document.getElementById("slideshow_toggle");
  
  if (isPlaying) {
    stopAutoSlideshow();
    isPlaying = false;
    if (toggleBtn) toggleBtn.innerHTML = "Play Slideshow";
  } else {
    startAutoSlideshow();
    isPlaying = true;
    if (toggleBtn) toggleBtn.innerHTML = "Pause Slideshow";
  }
}

// Keyboard navigation
function handleKeyPress(event) {
  switch (event.key) {
    case 'ArrowLeft':
      event.preventDefault();
      prevSlide();
      break;
    case 'ArrowRight':
      event.preventDefault();
      nextSlide();
      break;
    case ' ': // Spacebar
      event.preventDefault();
      toggleSlideshow();
      break;
    case 'Home':
      event.preventDefault();
      showSlide(0);
      break;
    case 'End':
      event.preventDefault();
      showSlide(slides.length - 1);
      break;
  }
}

// Touch/Swipe support for mobile
function addTouchSupport() {
  let touchStartX = 0;
  let touchEndX = 0;
  const slideshow = document.querySelector('.slideshow');
  
  if (!slideshow) return;
  
  slideshow.addEventListener('touchstart', function(event) {
    touchStartX = event.changedTouches[0].screenX;
  });
  
  slideshow.addEventListener('touchend', function(event) {
    touchEndX = event.changedTouches[0].screenX;
    handleSwipe();
  });
  
  function handleSwipe() {
    const swipeThreshold = 50;
    const swipeDistance = touchEndX - touchStartX;
    
    if (Math.abs(swipeDistance) > swipeThreshold) {
      if (swipeDistance > 0) {
        prevSlide(); // Swipe right - go to previous slide
      } else {
        nextSlide(); // Swipe left - go to next slide
      }
    }
  }
}

// Pause slideshow when tab is not visible (performance optimization)
function handleVisibilityChange() {
  if (document.hidden) {
    stopAutoSlideshow();
  } else if (isPlaying) {
    startAutoSlideshow();
  }
}

// Pause slideshow when hovering over it
function addHoverPause() {
  const slideshow = document.querySelector('.slideshow');
  if (!slideshow) return;
  
  slideshow.addEventListener('mouseenter', function() {
    if (isPlaying) {
      stopAutoSlideshow();
    }
  });
  
  slideshow.addEventListener('mouseleave', function() {
    if (isPlaying) {
      startAutoSlideshow();
    }
  });
}

// Preload images for smoother transitions
function preloadImages() {
  slides.forEach(function(slide) {
    const img = new Image();
    img.src = slide.src;
  });
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", function() {
  initSlides();
  preloadImages();
  addHoverPause();
  
  // Add visibility change listener
  document.addEventListener('visibilitychange', handleVisibilityChange);
  
  // Add smooth loading effect
  setTimeout(function() {
    document.body.classList.add('loaded');
  }, 100);
});

// Cleanup on page unload
window.addEventListener('beforeunload', function() {
  stopAutoSlideshow();
});

// Smooth page transitions
window.addEventListener('load', function() {
  document.body.style.opacity = '1';
});

// Handle window resize for responsive adjustments
window.addEventListener('resize', function() {
  // Recalculate slideshow dimensions if needed
  const slideshow = document.querySelector('.slideshow');
  if (slideshow) {
    slideshow.style.transition = 'none';
    setTimeout(function() {
      slideshow.style.transition = '';
    }, 100);
  }
});

// Error handling for missing elements
function safeElementOperation(elementId, operation) {
  const element = document.getElementById(elementId);
  if (element && typeof operation === 'function') {
    try {
      operation(element);
    } catch (error) {
      console.warn(`Error operating on element ${elementId}:`, error);
    }
  }
}

// Enhanced video controls with error handling
function initVideoControls() {
  safeElementOperation('urvid', function(video) {
    video.addEventListener('loadstart', function() {
      console.log('Video loading started');
    });
    
    video.addEventListener('error', function() {
      console.warn('Video failed to load');
      // Hide video controls if video fails
      safeElementOperation('pause_button', function(btn) {
        btn.style.display = 'none';
      });
    });
    
    video.addEventListener('canplay', function() {
      console.log('Video ready to play');
    });
  });
}

// Initialize video controls
document.addEventListener("DOMContentLoaded", function() {
  initVideoControls();
});
