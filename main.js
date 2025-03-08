/**
 * ShanghaiWalk Main JavaScript
 * Handles language switching, navigation, and UI interactions
 */
document.addEventListener('DOMContentLoaded', function() {
    // Language toggle elements
    const enBtn = document.getElementById('en-btn');
    const zhBtn = document.getElementById('zh-btn');
    const floatEnBtn = document.getElementById('float-en-btn');
    const floatZhBtn = document.getElementById('float-zh-btn');
    
    // Set initial language state
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage === 'english') {
        document.body.classList.add('english');
        enBtn.classList.add('active');
        zhBtn.classList.remove('active');
        if (floatEnBtn) floatEnBtn.classList.add('active');
        if (floatZhBtn) floatZhBtn.classList.remove('active');
    } else {
        zhBtn.classList.add('active');
        if (floatZhBtn) floatZhBtn.classList.add('active');
    }
    
    /**
     * Switch to English language
     * Updates UI and saves preference to localStorage
     */
    function switchToEnglish() {
        document.body.classList.add('english');
        enBtn.classList.add('active');
        zhBtn.classList.remove('active');
        if (floatEnBtn) floatEnBtn.classList.add('active');
        if (floatZhBtn) floatZhBtn.classList.remove('active');
        localStorage.setItem('language', 'english');
    }
    
    /**
     * Switch to Chinese language
     * Updates UI and saves preference to localStorage
     */
    function switchToChinese() {
        document.body.classList.remove('english');
        zhBtn.classList.add('active');
        enBtn.classList.remove('active');
        if (floatZhBtn) floatZhBtn.classList.add('active');
        if (floatEnBtn) floatEnBtn.classList.remove('active');
        localStorage.setItem('language', 'chinese');
    }
    
    // Bind language toggle events
    if (enBtn) enBtn.addEventListener('click', switchToEnglish);
    if (zhBtn) zhBtn.addEventListener('click', switchToChinese);
    if (floatEnBtn) floatEnBtn.addEventListener('click', switchToEnglish);
    if (floatZhBtn) floatZhBtn.addEventListener('click', switchToChinese);
    
    // Navigation elements
    const header = document.querySelector('header');
    const floatingNav = document.querySelector('.floating-nav');
    const moreActions = document.querySelector('.more-actions');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    
    // Navigation state variables
    let lastScrollY = window.scrollY;
    let headerHeight = header ? header.offsetHeight : 0;
    let isFloatingNavVisible = false;
    
    /**
     * Handle scroll events for navigation visibility
     * Uses throttling to improve performance
     */
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const currentScrollY = window.scrollY;
                
                // Show floating nav when scrolling down past header
                if (header && floatingNav && currentScrollY > headerHeight && currentScrollY > lastScrollY) {
                    if (!isFloatingNavVisible) {
                        header.style.transform = 'translateY(-100%)';
                        floatingNav.classList.add('visible');
                        isFloatingNavVisible = true;
                    }
                }
                // Hide floating nav when scrolling up to top
                else if (header && floatingNav && currentScrollY < headerHeight - 50) {
                    if (isFloatingNavVisible) {
                        header.style.transform = 'translateY(0)';
                        floatingNav.classList.remove('visible');
                        if (dropdownMenu) dropdownMenu.classList.remove('show');
                        isFloatingNavVisible = false;
                    }
                }
                
                lastScrollY = currentScrollY;
                ticking = false;
            });
            
            ticking = true;
        }
    });
    
    // More options dropdown toggle
    if (moreActions && dropdownMenu) {
        moreActions.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdownMenu.classList.toggle('show');
            
            // Update ARIA attributes for accessibility
            const isExpanded = dropdownMenu.classList.contains('show');
            moreActions.setAttribute('aria-expanded', isExpanded);
        });
        
        // Close dropdown when clicking elsewhere
        document.addEventListener('click', () => {
            if (dropdownMenu.classList.contains('show')) {
                dropdownMenu.classList.remove('show');
                moreActions.setAttribute('aria-expanded', 'false');
            }
        });
        
        // Prevent dropdown menu clicks from closing the menu
        dropdownMenu.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }
    
    /**
     * Lazy load images with data-src attribute
     * Uses Intersection Observer for better performance
     */
    const images = document.querySelectorAll('img[data-src]');
    if (images.length > 0) {
        const imageOptions = {
            threshold: 0,
            rootMargin: '0px 0px 50px 0px' // Load images slightly before they come into view
        };
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            });
        }, imageOptions);
        
        images.forEach(img => imageObserver.observe(img));
    }
}); 