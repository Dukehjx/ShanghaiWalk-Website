/**
 * ShanghaiWalk Timeline Functionality
 * Handles timeline interactions and animations
 */
document.addEventListener('DOMContentLoaded', function() {
    // Timeline elements
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineEras = document.querySelectorAll('.era-title');
    
    // Initialize timeline
    initTimeline();
    
    /**
     * Initialize timeline functionality
     */
    function initTimeline() {
        // Add click handlers for timeline items
        if (timelineItems.length > 0) {
            timelineItems.forEach(item => {
                item.addEventListener('click', handleTimelineItemClick);
            });
        }
        
        // Animate timeline eras on scroll
        if (timelineEras.length > 0) {
            animateTimelineErasOnScroll();
        }
    }
    
    /**
     * Handle timeline item click
     * @param {Event} e - Click event
     */
    function handleTimelineItemClick(e) {
        // Remove active class from all items
        timelineItems.forEach(item => {
            item.classList.remove('active');
        });
        
        // Add active class to clicked item
        this.classList.add('active');
        
        // Create or update image element
        updateTimelineImage(this);
        
        // Scroll to center the active item if needed
        scrollToActiveItem(this);
        
        // Prevent event bubbling
        e.stopPropagation();
    }
    
    /**
     * Update timeline image for the active item
     * @param {Element} item - The active timeline item
     */
    function updateTimelineImage(item) {
        const timelineImage = item.querySelector('.timeline-image');
        if (!timelineImage) return;
        
        // Clear existing content
        timelineImage.innerHTML = '';
        
        // Get year from the heading
        const yearElement = item.querySelector('h3');
        if (!yearElement) return;
        
        // Extract year, handling both "1895年" and "1895" formats
        // Also handle decade formats like "1930年代" or "1930s"
        let yearText = yearElement.textContent.trim();
        let year = yearText.replace('年', '').replace('s', '').replace('年代', '');
        
        // Create image element
        const img = document.createElement('img');
        img.alt = `Historical image of Shanghai from ${year}`;
        
        // Set image source with appropriate path to timeline picture folder
        // Try different file extensions and formats
        if (year === '1950') {
            // Special case for 1950s
            img.src = `./images/timeline picture/1950-timeline.jpg`;
        } else if (year === '1930') {
            // Special case for 1930s
            img.src = `./images/timeline picture/1930-timeline.jpg`;
        } else if (year === '1978') {
            // Special case for 1978 (jpeg)
            img.src = `./images/timeline picture/1978-timeline.jpeg`;
        } else if (year === '2001') {
            // Special case for 2001 (jpeg)
            img.src = `./images/timeline picture/2001-timeline.jpeg`;
        } else if (year === '2016') {
            // Special case for 2016 (png)
            img.src = `./images/timeline picture/2016-timeline.png`;
        } else {
            // Standard format
            img.src = `./images/timeline picture/${year}-timeline.jpg`;
        }
        
        // Handle image loading error
        img.onerror = function() {
            console.log(`Image for year ${year} not found, using default image.`);
            // Try to find a close match or use a default
            if (year.startsWith('19')) {
                img.src = `./images/timeline picture/1930-timeline.jpg`;
            } else {
                img.src = `./images/timeline picture/2010-timeline.jpg`;
            }
            img.alt = 'Historical image of Shanghai';
        };
        
        // Add image to container without animation class
        timelineImage.appendChild(img);
    }
    
    /**
     * Scroll to center the active timeline item
     * @param {Element} item - The active timeline item
     */
    function scrollToActiveItem(item) {
        const rect = item.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // If item is not fully visible, scroll to center it
        if (rect.top < 100 || rect.bottom > windowHeight - 100) {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const targetY = scrollTop + rect.top - (windowHeight / 2) + (rect.height / 2);
            
            window.scrollTo({
                top: targetY,
                behavior: 'smooth'
            });
        }
    }
    
    /**
     * Animate timeline eras on scroll
     */
    function animateTimelineErasOnScroll() {
        // Use Intersection Observer to detect when eras come into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        // Observe all era titles
        timelineEras.forEach(era => {
            observer.observe(era);
        });
    }
    
    // Add document click handler to close active timeline item when clicking outside
    document.addEventListener('click', function(e) {
        // Check if click is outside any timeline item
        if (!e.target.closest('.timeline-item')) {
            // Close all active items
            timelineItems.forEach(item => {
                item.classList.remove('active');
            });
        }
    });
}); 