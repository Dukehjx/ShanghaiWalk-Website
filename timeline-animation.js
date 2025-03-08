/**
 * ShanghaiWalk Timeline Animation JavaScript
 * Handles animations for timeline elements using Intersection Observer
 */
document.addEventListener('DOMContentLoaded', () => {
    // Get all timeline items and era titles
    const timelineItems = document.querySelectorAll('.timeline-item');
    const eraTitles = document.querySelectorAll('.era-title');
    
    /**
     * Create Intersection Observer to trigger animations
     * Elements will animate when they enter the viewport
     */
    const observerOptions = {
        threshold: 0.2, // Trigger when 20% of element is visible
        rootMargin: '0px 0px -100px 0px' // Adjust trigger point (negative bottom margin triggers earlier)
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animation class when element enters viewport
                entry.target.classList.add('animate');
                
                // Stop observing after animation is triggered
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all timeline items
    if (timelineItems.length > 0) {
        timelineItems.forEach(item => {
            observer.observe(item);
        });
    }

    // Observe all era titles
    if (eraTitles.length > 0) {
        eraTitles.forEach(title => {
            observer.observe(title);
        });
    }
}); 