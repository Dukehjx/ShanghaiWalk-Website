/**
 * ShanghaiWalk Scroll Effects
 * Handles scroll-based animations and effects
 */
document.addEventListener('DOMContentLoaded', function() {
    // Elements to animate on scroll
    const scrollElements = document.querySelectorAll('.scroll-fade-in, .scroll-slide-left, .scroll-slide-right');
    const header = document.querySelector('header');
    
    // Timeline elements
    const timelineEras = document.querySelectorAll('.era-title');
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    // Parallax elements
    const parallaxLayers = document.querySelectorAll('.parallax-layer');
    
    /**
     * Check if element is in viewport
     * @param {Element} el - The element to check
     * @param {Number} offset - Offset from viewport edge
     * @returns {Boolean} - True if element is in viewport
     */
    function isElementInViewport(el, offset = 150) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight - offset) &&
            rect.bottom >= offset &&
            rect.left <= (window.innerWidth - offset) &&
            rect.right >= offset
        );
    }
    
    /**
     * Handle scroll animations
     */
    function handleScrollAnimations() {
        // Header scroll effect
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Animate elements when they enter viewport
        scrollElements.forEach(element => {
            if (isElementInViewport(element)) {
                element.classList.add('visible');
            }
        });
        
        // Timeline animations
        if (timelineEras) {
            timelineEras.forEach(era => {
                if (isElementInViewport(era, 100)) {
                    era.classList.add('animate');
                }
            });
        }
        
        // Parallax effect
        if (parallaxLayers.length > 0) {
            const scrollPosition = window.pageYOffset;
            parallaxLayers.forEach(layer => {
                const speed = layer.getAttribute('data-speed') || 0.5;
                const yPos = -(scrollPosition * speed);
                layer.style.transform = `translateY(${yPos}px)`;
            });
        }
    }
    
    // Add click handlers for timeline items
    if (timelineItems) {
        timelineItems.forEach(item => {
            item.addEventListener('click', function() {
                // Remove active class from all items
                timelineItems.forEach(i => i.classList.remove('active'));
                
                // Add active class to clicked item
                this.classList.add('active');
                
                // Create image element if it doesn't exist
                if (!this.querySelector('.timeline-image img')) {
                    const timelineImage = this.querySelector('.timeline-image');
                    if (timelineImage) {
                        const year = this.querySelector('h3').textContent.trim();
                        const img = document.createElement('img');
                        img.src = `./images/timeline/${year}.jpg`;
                        img.alt = `Historical image from ${year}`;
                        img.onerror = function() {
                            this.src = './images/timeline/default.jpg';
                            this.alt = 'Historical image of Shanghai';
                        };
                        timelineImage.appendChild(img);
                    }
                }
            });
        });
    }
    
    // Initialize counters for statistics
    function initCounters() {
        const counters = document.querySelectorAll('.counter');
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000; // 2 seconds
            const step = Math.ceil(target / (duration / 16)); // 60fps
            let current = 0;
            
            const updateCounter = () => {
                current += step;
                if (current >= target) {
                    counter.textContent = target.toLocaleString();
                    return;
                }
                counter.textContent = current.toLocaleString();
                requestAnimationFrame(updateCounter);
            };
            
            // Start counter when element is in viewport
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        updateCounter();
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(counter);
        });
    }
    
    // Initialize image comparison sliders
    function initImageComparison() {
        const comparisons = document.querySelectorAll('.image-comparison');
        comparisons.forEach(comparison => {
            const slider = comparison.querySelector('.comparison-slider');
            const before = comparison.querySelector('.before');
            const after = comparison.querySelector('.after');
            
            // Set initial position
            slider.style.left = '50%';
            before.style.width = '50%';
            
            // Add event listeners
            slider.addEventListener('mousedown', startSliding);
            slider.addEventListener('touchstart', startSliding);
            
            function startSliding(e) {
                e.preventDefault();
                
                // Add event listeners for move and end
                document.addEventListener('mousemove', slide);
                document.addEventListener('touchmove', slide);
                document.addEventListener('mouseup', stopSliding);
                document.addEventListener('touchend', stopSliding);
            }
            
            function slide(e) {
                let pos;
                
                // Get position based on event type
                if (e.type === 'touchmove') {
                    const touch = e.touches[0] || e.changedTouches[0];
                    pos = touch.pageX - comparison.getBoundingClientRect().left;
                } else {
                    pos = e.pageX - comparison.getBoundingClientRect().left;
                }
                
                // Constrain position to comparison container
                if (pos < 0) pos = 0;
                if (pos > comparison.offsetWidth) pos = comparison.offsetWidth;
                
                // Update slider and image positions
                const percentage = (pos / comparison.offsetWidth) * 100;
                slider.style.left = `${percentage}%`;
                before.style.width = `${percentage}%`;
            }
            
            function stopSliding() {
                document.removeEventListener('mousemove', slide);
                document.removeEventListener('touchmove', slide);
                document.removeEventListener('mouseup', stopSliding);
                document.removeEventListener('touchend', stopSliding);
            }
        });
    }
    
    // Initialize image gallery with lightbox
    function initGallery() {
        const galleryItems = document.querySelectorAll('.gallery-item');
        const lightbox = document.querySelector('.lightbox');
        const lightboxImage = document.querySelector('.lightbox-image');
        const lightboxClose = document.querySelector('.lightbox-close');
        const lightboxCaption = document.querySelector('.lightbox-caption');
        const lightboxPrev = document.querySelector('.lightbox-prev');
        const lightboxNext = document.querySelector('.lightbox-next');
        
        let currentIndex = 0;
        
        if (galleryItems.length > 0 && lightbox) {
            galleryItems.forEach((item, index) => {
                item.addEventListener('click', () => {
                    currentIndex = index;
                    const imgSrc = item.querySelector('img').getAttribute('data-full') || 
                                  item.querySelector('img').src;
                    const caption = item.querySelector('img').alt;
                    
                    lightboxImage.src = imgSrc;
                    lightboxCaption.textContent = caption;
                    lightbox.classList.add('active');
                    document.body.style.overflow = 'hidden';
                });
            });
            
            // Close lightbox
            lightboxClose.addEventListener('click', () => {
                lightbox.classList.remove('active');
                document.body.style.overflow = '';
            });
            
            // Navigate through gallery
            lightboxPrev.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
                updateLightbox();
            });
            
            lightboxNext.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % galleryItems.length;
                updateLightbox();
            });
            
            // Update lightbox with current image
            function updateLightbox() {
                const item = galleryItems[currentIndex];
                const imgSrc = item.querySelector('img').getAttribute('data-full') || 
                              item.querySelector('img').src;
                const caption = item.querySelector('img').alt;
                
                lightboxImage.src = imgSrc;
                lightboxCaption.textContent = caption;
            }
            
            // Close lightbox on escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    lightbox.classList.remove('active');
                    document.body.style.overflow = '';
                }
                if (e.key === 'ArrowLeft') {
                    currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
                    updateLightbox();
                }
                if (e.key === 'ArrowRight') {
                    currentIndex = (currentIndex + 1) % galleryItems.length;
                    updateLightbox();
                }
            });
        }
    }
    
    // Initialize all effects
    function initEffects() {
        handleScrollAnimations();
        initCounters();
        initImageComparison();
        initGallery();
        
        // Add scroll event listener
        window.addEventListener('scroll', handleScrollAnimations);
        
        // Add resize event listener
        window.addEventListener('resize', handleScrollAnimations);
    }
    
    // Initialize effects
    initEffects();
}); 