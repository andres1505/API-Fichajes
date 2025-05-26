// Header JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    
    // Active navigation link highlighting
    function setActiveNavLink() {
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        const currentPath = window.location.pathname;
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const linkPath = new URL(link.href).pathname;
            
            if (linkPath === currentPath || 
                (currentPath === '/' && linkPath === '/') ||
                (currentPath.startsWith('/fichajes') && linkPath.includes('/fichajes')) ||
                (currentPath.startsWith('/partidos') && linkPath.includes('/partidos'))) {
                link.classList.add('active');
            }
        });
    }

    // Initialize active nav link
    setActiveNavLink();

    // Navbar background change on scroll
    const navbar = document.querySelector('.navbar');
    let isScrolled = false;
    
    function handleScroll() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 50 && !isScrolled) {
            navbar.classList.add('scrolled');
            isScrolled = true;
        } else if (currentScrollY <= 50 && isScrolled) {
            navbar.classList.remove('scrolled');
            isScrolled = false;
        }
    }

    // Throttle scroll events for better performance
    let ticking = false;
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(handleScroll);
            ticking = true;
            setTimeout(() => { ticking = false; }, 16); // ~60fps
        }
    }

    window.addEventListener('scroll', requestTick);

    // Mobile menu functionality
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    // Close mobile menu when clicking on a link
    if (navbarCollapse && navbarToggler) {
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (navbarCollapse.classList.contains('show')) {
                    navbarToggler.click();
                }
            });
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navbarCollapse?.contains(event.target) || 
                                navbarToggler?.contains(event.target);
        
        if (!isClickInsideNav && navbarCollapse?.classList.contains('show')) {
            navbarToggler.click();
        }
    });

    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Check if it's an anchor link on the same page
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                
                if (targetElement) {
                    const headerHeight = navbar.offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Brand logo animation on hover
    const navbarBrand = document.querySelector('.navbar-brand');
    if (navbarBrand) {
        navbarBrand.addEventListener('mouseenter', function() {
            const logo = this.querySelector('.fas.fa-futbol');
            if (logo) {
                logo.style.animation = 'spin 1s ease-in-out';
            }
        });
        
        navbarBrand.addEventListener('mouseleave', function() {
            const logo = this.querySelector('.fas.fa-futbol');
            if (logo) {
                setTimeout(() => {
                    logo.style.animation = '';
                }, 1000);
            }
        });
    }

    // Add loading effect to navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (!this.href.startsWith('#')) {
                this.style.opacity = '0.7';
                this.style.pointerEvents = 'none';
                
                // Reset after 2 seconds in case navigation fails
                setTimeout(() => {
                    this.style.opacity = '';
                    this.style.pointerEvents = '';
                }, 2000);
            }
        });
    });

    // Keyboard accessibility for navbar toggler
    if (navbarToggler) {
        navbarToggler.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    }

    // Add animation class to navigation items on page load
    navLinks.forEach((link, index) => {
        link.style.animationDelay = `${index * 0.1}s`;
        link.classList.add('nav-item-animate');
    });

    console.log('Header JavaScript loaded successfully');
});