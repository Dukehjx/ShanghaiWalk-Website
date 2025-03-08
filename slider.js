/**
 * ShanghaiWalk Slider Functionality
 * Handles testimonial sliders and other carousel elements
 */
document.addEventListener('DOMContentLoaded', function() {
    // Testimonials slider
    initTestimonialsSlider();
    
    // Back to top button
    initBackToTop();
    
    /**
     * Initialize testimonials slider
     */
    function initTestimonialsSlider() {
        const slider = document.querySelector('.testimonials-slider');
        const items = document.querySelectorAll('.testimonial-item');
        const dots = document.querySelectorAll('.testimonial-dots .dot');
        const prevBtn = document.querySelector('.prev-testimonial');
        const nextBtn = document.querySelector('.next-testimonial');
        
        if (!slider || items.length === 0) return;
        
        let currentIndex = 0;
        let touchStartX = 0;
        let touchEndX = 0;
        
        // Set up initial state
        updateSlider();
        
        // Add event listeners
        if (prevBtn) prevBtn.addEventListener('click', showPreviousTestimonial);
        if (nextBtn) nextBtn.addEventListener('click', showNextTestimonial);
        
        // Add dot navigation
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentIndex = index;
                updateSlider();
            });
        });
        
        // Add touch events for mobile swipe
        slider.addEventListener('touchstart', handleTouchStart, false);
        slider.addEventListener('touchmove', handleTouchMove, false);
        slider.addEventListener('touchend', handleTouchEnd, false);
        
        // Auto-advance the slider
        let autoSlideInterval = setInterval(showNextTestimonial, 5000);
        
        // Pause auto-advance on hover
        slider.addEventListener('mouseenter', () => {
            clearInterval(autoSlideInterval);
        });
        
        slider.addEventListener('mouseleave', () => {
            autoSlideInterval = setInterval(showNextTestimonial, 5000);
        });
        
        /**
         * Show previous testimonial
         */
        function showPreviousTestimonial() {
            currentIndex = (currentIndex - 1 + items.length) % items.length;
            updateSlider();
        }
        
        /**
         * Show next testimonial
         */
        function showNextTestimonial() {
            currentIndex = (currentIndex + 1) % items.length;
            updateSlider();
        }
        
        /**
         * Update slider display
         */
        function updateSlider() {
            // Hide all items
            items.forEach(item => {
                item.style.opacity = '0';
                item.style.transform = 'translateX(20px)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            });
            
            // Show current item
            setTimeout(() => {
                items[currentIndex].style.display = 'block';
                setTimeout(() => {
                    items[currentIndex].style.opacity = '1';
                    items[currentIndex].style.transform = 'translateX(0)';
                }, 50);
            }, 300);
            
            // Update dots
            dots.forEach((dot, index) => {
                if (index === currentIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }
        
        /**
         * Handle touch start event
         * @param {TouchEvent} e - Touch event
         */
        function handleTouchStart(e) {
            touchStartX = e.touches[0].clientX;
        }
        
        /**
         * Handle touch move event
         * @param {TouchEvent} e - Touch event
         */
        function handleTouchMove(e) {
            touchEndX = e.touches[0].clientX;
        }
        
        /**
         * Handle touch end event
         */
        function handleTouchEnd() {
            const touchDiff = touchStartX - touchEndX;
            
            // If swipe distance is significant
            if (Math.abs(touchDiff) > 50) {
                if (touchDiff > 0) {
                    // Swipe left, show next
                    showNextTestimonial();
                } else {
                    // Swipe right, show previous
                    showPreviousTestimonial();
                }
            }
            
            // Reset touch positions
            touchStartX = 0;
            touchEndX = 0;
        }
    }
    
    /**
     * Initialize back to top button
     */
    function initBackToTop() {
        const backToTopBtn = document.getElementById('back-to-top');
        
        if (!backToTopBtn) return;
        
        // Show/hide button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        // Scroll to top when clicked
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}); 