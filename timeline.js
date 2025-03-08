/**
 * ShanghaiWalk Timeline JavaScript
 * Handles timeline functionality, image loading, and interactions
 */
document.addEventListener('DOMContentLoaded', function() {
    // Get all timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    /**
     * Available timeline images by year
     * These images will be matched to timeline items based on year
     */
    const availableImages = [
        '1895-timeline.jpg',
        '1909-timeline.jpg',
        '1927-timeline.jpg',
        '1930-timeline.jpg',
        '1949-timeline.jpg',
        '1950-timeline.jpg',
        '1978-timeline.jpeg',
        '1990-timeline.jpg',
        '1991-timeline.jpg',
        '1995-timeline.jpg',
        '2001-timeline.jpeg',
        '2010-timeline.jpg',
        '2013-timeline.jpg',
        '2016-timeline.png',
        '2019-timeline.jpg',
        '2021-timeline.jpg',
        '2023-timeline.jpg'
    ];
    
    /**
     * Process each timeline item to add images and event handlers
     */
    timelineItems.forEach((item) => {
        // Extract year from the timeline item heading
        const yearElement = item.querySelector('h3');
        const yearMatch = yearElement ? yearElement.textContent.match(/\d{4}/) : null;
        const year = yearMatch ? yearMatch[0] : null;
        
        // Create image container
        const imageContainer = document.createElement('div');
        imageContainer.className = 'timeline-image';
        imageContainer.setAttribute('aria-hidden', 'true'); // Images are decorative
        
        // Find matching image for the year
        if (year) {
            const matchingImage = availableImages.find(img => img.startsWith(year));
            
            if (matchingImage) {
                // Create and configure image element
                const img = document.createElement('img');
                img.style.width = '100%';
                img.style.height = '100%';
                img.style.objectFit = 'cover';
                img.src = './images/timeline picture/' + matchingImage;
                img.alt = `Historical image from ${year}`; // Descriptive alt text
                imageContainer.appendChild(img);
            }
        }
        
        // Add image container to timeline item
        item.appendChild(imageContainer);
        
        // Add click event for expanding/collapsing timeline items
        item.addEventListener('click', function() {
            // Toggle active state for current item
            const isActive = item.classList.contains('active');
            
            // Remove active class from all items
            timelineItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                
                // Update ARIA attributes for accessibility
                otherItem.setAttribute('aria-expanded', 'false');
            });
            
            // If item wasn't active before, make it active now
            if (!isActive) {
                item.classList.add('active');
                item.setAttribute('aria-expanded', 'true');
            }
        });
        
        // Initialize ARIA attributes
        item.setAttribute('aria-expanded', 'false');
    });

    /**
     * Animate era titles on page load
     */
    const eraTitles = document.querySelectorAll('.era-title');
    eraTitles.forEach(title => {
        title.classList.add('animate');
    });
}); 