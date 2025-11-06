/**
 * Claude Literary Magazine - Main JavaScript
 * Handles navigation, mobile menu, and general interactivity
 */

(function() {
    'use strict';

    /**
     * Mobile Menu Toggle
     */
    function initMobileMenu() {
        const menuToggle = document.querySelector('.menu-toggle');
        const siteNav = document.querySelector('.site-nav');

        if (menuToggle && siteNav) {
            menuToggle.addEventListener('click', function() {
                siteNav.classList.toggle('active');

                // Update ARIA label
                const isExpanded = siteNav.classList.contains('active');
                menuToggle.setAttribute('aria-expanded', isExpanded);
                menuToggle.setAttribute('aria-label', isExpanded ? 'Close menu' : 'Toggle menu');
            });

            // Close menu when clicking outside
            document.addEventListener('click', function(event) {
                if (!menuToggle.contains(event.target) && !siteNav.contains(event.target)) {
                    siteNav.classList.remove('active');
                    menuToggle.setAttribute('aria-expanded', 'false');
                    menuToggle.setAttribute('aria-label', 'Toggle menu');
                }
            });

            // Close menu when pressing Escape
            document.addEventListener('keydown', function(event) {
                if (event.key === 'Escape' && siteNav.classList.contains('active')) {
                    siteNav.classList.remove('active');
                    menuToggle.setAttribute('aria-expanded', 'false');
                    menuToggle.setAttribute('aria-label', 'Toggle menu');
                    menuToggle.focus();
                }
            });
        }
    }

    /**
     * Smooth Scroll for Anchor Links
     */
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');

                // Don't prevent default for # links (back to top without target)
                if (href === '#') {
                    e.preventDefault();
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                    return;
                }

                // Smooth scroll to target element
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const headerOffset = 80; // Account for sticky header
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });

                    // Update URL without jumping
                    if (history.pushState) {
                        history.pushState(null, null, href);
                    }
                }
            });
        });
    }

    /**
     * Add Active State to Current Nav Item
     */
    function highlightCurrentPage() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.site-nav a');

        navLinks.forEach(link => {
            const linkPage = link.getAttribute('href');
            if (linkPage === currentPage) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    /**
     * Lazy Load Images (if any are added in future)
     */
    function initLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                            imageObserver.unobserve(img);
                        }
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        } else {
            // Fallback for browsers without IntersectionObserver
            document.querySelectorAll('img[data-src]').forEach(img => {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            });
        }
    }

    /**
     * Print Styles Helper
     */
    function initPrintHelper() {
        // Before printing, close mobile menu if open
        window.addEventListener('beforeprint', function() {
            const siteNav = document.querySelector('.site-nav');
            if (siteNav && siteNav.classList.contains('active')) {
                siteNav.classList.remove('active');
            }
        });
    }

    /**
     * Enhance Accessibility
     */
    function enhanceAccessibility() {
        // Add skip to main content link
        const header = document.querySelector('.site-header');
        const main = document.querySelector('main');

        if (header && main && !document.querySelector('.skip-to-main')) {
            const skipLink = document.createElement('a');
            skipLink.href = '#main-content';
            skipLink.className = 'skip-to-main';
            skipLink.textContent = 'Skip to main content';
            skipLink.style.cssText = `
                position: absolute;
                top: -40px;
                left: 0;
                background: var(--color-accent);
                color: var(--color-cream);
                padding: 8px;
                text-decoration: none;
                z-index: 10000;
            `;
            skipLink.addEventListener('focus', function() {
                this.style.top = '0';
            });
            skipLink.addEventListener('blur', function() {
                this.style.top = '-40px';
            });

            main.id = 'main-content';
            document.body.insertBefore(skipLink, document.body.firstChild);
        }

        // Ensure all images have alt text
        document.querySelectorAll('img:not([alt])').forEach(img => {
            console.warn('Image missing alt text:', img.src);
            img.setAttribute('alt', '');
        });
    }

    /**
     * Initialize All Functions
     */
    function init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
            return;
        }

        initMobileMenu();
        initSmoothScroll();
        highlightCurrentPage();
        initLazyLoading();
        initPrintHelper();
        enhanceAccessibility();

        // Log successful initialization (can be removed in production)
        console.log('Claude Literary Magazine initialized successfully');
    }

    // Start initialization
    init();

})();
