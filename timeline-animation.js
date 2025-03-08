/**
 * ShanghaiWalk Timeline Animations
 * Handles advanced animations and effects for the timeline
 */
document.addEventListener('DOMContentLoaded', function() {
    // Timeline elements
    const timeline = document.querySelector('.timeline');
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    // Initialize animations
    initTimelineAnimations();
    
    /**
     * Initialize timeline animations
     */
    function initTimelineAnimations() {
        if (!timeline) return;
        
        // Add scroll-triggered animations to timeline items
        addScrollAnimations();
        
        // Add hover effects to timeline items
        addHoverEffects();
        
        // Add parallax effect to timeline
        addParallaxEffect();
    }
    
    /**
     * Add scroll-triggered animations to timeline items
     */
    function addScrollAnimations() {
        // Use Intersection Observer for efficient scroll detection
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add animation class based on position
                    const item = entry.target;
                    const isEven = Array.from(timelineItems).indexOf(item) % 2 === 0;
                    
                    if (isEven) {
                        item.classList.add('slide-in-right');
                    } else {
                        item.classList.add('slide-in-left');
                    }
                    
                    // Stop observing after animation is applied
                    observer.unobserve(item);
                }
            });
        }, { threshold: 0.2, rootMargin: '0px 0px -100px 0px' });
        
        // Observe all timeline items
        timelineItems.forEach(item => {
            observer.observe(item);
        });
    }
    
    /**
     * Add hover effects to timeline items
     */
    function addHoverEffects() {
        timelineItems.forEach(item => {
            // Add hover class for styling
            item.classList.add('hover-lift');
            
            // Add shimmer effect on hover
            item.addEventListener('mouseenter', function() {
                const shimmer = document.createElement('div');
                shimmer.className = 'shimmer-effect';
                shimmer.style.position = 'absolute';
                shimmer.style.top = '0';
                shimmer.style.left = '0';
                shimmer.style.width = '100%';
                shimmer.style.height = '100%';
                shimmer.style.zIndex = '0';
                shimmer.style.pointerEvents = 'none';
                
                this.appendChild(shimmer);
                
                // Remove shimmer after animation completes
                setTimeout(() => {
                    if (shimmer.parentNode === this) {
                        this.removeChild(shimmer);
                    }
                }, 2000);
            });
        });
    }
    
    /**
     * Add parallax effect to timeline
     */
    function addParallaxEffect() {
        // Add parallax effect to timeline background
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            const timelineRect = timeline.getBoundingClientRect();
            
            // Only apply effect when timeline is in viewport
            if (timelineRect.top < window.innerHeight && timelineRect.bottom > 0) {
                // Calculate parallax offset
                const parallaxOffset = scrollPosition * 0.1;
                
                // Apply parallax effect to timeline line
                const timelineLine = document.querySelector('.timeline::before');
                if (timelineLine) {
                    timelineLine.style.transform = `translateY(${parallaxOffset}px)`;
                }
            }
        });
    }
    
    /**
     * Add year marker animation
     * This adds animated year markers along the timeline
     */
    function addYearMarkers() {
        // This is a placeholder for potential future enhancement
        // Could add floating year markers along the timeline
        console.log('Year markers animation could be added here');
    }
}); 