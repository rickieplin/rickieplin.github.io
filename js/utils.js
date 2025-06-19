/**
 * Utility functions with robust error handling
 */
(function() {
    'use strict';
    
    // Global error handler
    window.addEventListener('error', function(event) {
        console.error('Global error:', event.error);
        // Prevent default error handling in production
        if (window.location.hostname !== 'localhost') {
            event.preventDefault();
        }
    });
    
    // Promise rejection handler
    window.addEventListener('unhandledrejection', function(event) {
        console.error('Unhandled promise rejection:', event.reason);
        event.preventDefault();
    });
    
    // Utility namespace
    window.Utils = {
        /**
         * Safely execute a function with error handling
         */
        safeExecute: function(fn, fallback = null) {
            try {
                return fn();
            } catch (error) {
                console.error('Safe execute error:', error);
                return typeof fallback === 'function' ? fallback(error) : fallback;
            }
        },
        
        /**
         * Debounce function for performance
         */
        debounce: function(func, wait = 300) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        },
        
        /**
         * Throttle function for performance
         */
        throttle: function(func, limit = 100) {
            let inThrottle;
            return function(...args) {
                if (!inThrottle) {
                    func.apply(this, args);
                    inThrottle = true;
                    setTimeout(() => inThrottle = false, limit);
                }
            };
        },
        
        /**
         * Lazy load images with intersection observer
         */
        lazyLoadImages: function() {
            const images = document.querySelectorAll('img[data-src]');
            
            if ('IntersectionObserver' in window) {
                const imageObserver = new IntersectionObserver((entries, observer) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const img = entry.target;
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                            img.classList.add('fade-in');
                            observer.unobserve(img);
                        }
                    });
                }, {
                    rootMargin: '50px 0px',
                    threshold: 0.01
                });
                
                images.forEach(img => imageObserver.observe(img));
            } else {
                // Fallback for browsers without IntersectionObserver
                images.forEach(img => {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                });
            }
        },
        
        /**
         * Animate elements on scroll
         */
        animateOnScroll: function() {
            const elements = document.querySelectorAll('[data-animate]');
            
            if ('IntersectionObserver' in window) {
                const animationObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const element = entry.target;
                            const animation = element.dataset.animate || 'fade-in';
                            element.classList.add(animation);
                            element.removeAttribute('data-animate');
                        }
                    });
                }, {
                    threshold: 0.1,
                    rootMargin: '0px 0px -50px 0px'
                });
                
                elements.forEach(el => animationObserver.observe(el));
            } else {
                // Immediate animation for unsupported browsers
                elements.forEach(el => {
                    const animation = el.dataset.animate || 'fade-in';
                    el.classList.add(animation);
                });
            }
        },
        
        /**
         * Check if element is in viewport
         */
        isInViewport: function(element) {
            const rect = element.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        },
        
        /**
         * Smooth scroll to element
         */
        smoothScrollTo: function(element, offset = 0) {
            const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;
            
            if ('scrollBehavior' in document.documentElement.style) {
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            } else {
                // Fallback for browsers without smooth scroll
                window.scrollTo(0, targetPosition);
            }
        },
        
        /**
         * Get preferred color scheme
         */
        getPreferredColorScheme: function() {
            if (window.matchMedia) {
                if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    return 'dark';
                } else {
                    return 'light';
                }
            }
            return 'light';
        },
        
        /**
         * Apply theme with fallback
         */
        applyTheme: function(theme) {
            try {
                if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                } else {
                    document.documentElement.classList.remove('dark');
                }
                localStorage.setItem('theme', theme);
            } catch (e) {
                console.warn('Could not save theme preference:', e);
            }
        },
        
        /**
         * Load saved theme or use system preference
         */
        loadTheme: function() {
            try {
                const savedTheme = localStorage.getItem('theme');
                const theme = savedTheme || this.getPreferredColorScheme();
                this.applyTheme(theme);
            } catch (e) {
                console.warn('Could not load theme:', e);
                this.applyTheme(this.getPreferredColorScheme());
            }
        },
        
        /**
         * Performance monitoring
         */
        measurePerformance: function(name, fn) {
            if ('performance' in window && 'mark' in window.performance) {
                const startMark = `${name}-start`;
                const endMark = `${name}-end`;
                
                performance.mark(startMark);
                const result = fn();
                performance.mark(endMark);
                
                try {
                    performance.measure(name, startMark, endMark);
                    const measure = performance.getEntriesByName(name)[0];
                    console.log(`${name} took ${measure.duration.toFixed(2)}ms`);
                } catch (e) {
                    // Ignore measurement errors
                }
                
                return result;
            } else {
                return fn();
            }
        },
        
        /**
         * Initialize all utilities
         */
        init: function() {
            // Load theme
            this.loadTheme();
            
            // Set up lazy loading
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => {
                    this.lazyLoadImages();
                    this.animateOnScroll();
                });
            } else {
                this.lazyLoadImages();
                this.animateOnScroll();
            }
            
            // Re-run on dynamic content changes
            const observer = new MutationObserver(this.debounce(() => {
                this.lazyLoadImages();
                this.animateOnScroll();
            }, 500));
            
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        }
    };
    
    // Initialize utilities
    Utils.init();
})();