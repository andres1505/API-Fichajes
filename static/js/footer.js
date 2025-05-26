// Footer JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    
    // Social links interaction tracking
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach((link, index) => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Remove this in production when you have real social links
            
            const socialPlatforms = ['Facebook', 'Twitter', 'Instagram', 'YouTube'];
            const platform = socialPlatforms[index] || 'Social Media';
            
            console.log(`${platform} link clicked`);
            
            // Add click animation
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Here you would add your analytics tracking
            // gtag('event', 'click', {
            //     event_category: 'social',
            //     event_label: platform.toLowerCase()
            // });
        });
        
        // Add hover sound effect (optional)
        link.addEventListener('mouseenter', function() {
            // You could add a subtle sound effect here
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });

    // Footer animation on scroll
    const footer = document.querySelector('.footer-main');
    let footerAnimated = false;
    
    function animateFooter() {
        if (footerAnimated) return;
        
        const footerRect = footer.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        if (footerRect.top < windowHeight * 0.8) {
            footer.classList.add('animate-footer');
            footerAnimated = true;
            
            // Animate social links with delay
            socialLinks.forEach((link, index) => {
                setTimeout(() => {
                    link.style.animation = `fadeInUp 0.6s ease-out forwards`;
                    link.style.animationDelay = `${index * 0.1}s`;
                }, 200);
            });
        }
    }

    // Throttled scroll listener for footer animation
    let footerTicking = false;
    function requestFooterTick() {
        if (!footerTicking) {
            requestAnimationFrame(animateFooter);
            footerTicking = true;
            setTimeout(() => { footerTicking = false; }, 16);
        }
    }

    window.addEventListener('scroll', requestFooterTick);

    // Newsletter subscription (if you add it later)
    function initNewsletterForm() {
        const newsletterForm = document.querySelector('.newsletter-form');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const email = this.querySelector('input[type="email"]').value;
                
                if (email) {
                    console.log('Newsletter subscription:', email);
                    // Here you would handle the newsletter subscription
                    
                    // Show success message
                    const button = this.querySelector('button');
                    const originalText = button.textContent;
                    button.textContent = '¡Suscrito!';
                    button.style.background = '#28a745';
                    
                    setTimeout(() => {
                        button.textContent = originalText;
                        button.style.background = '';
                        this.reset();
                    }, 3000);
                }
            });
        }
    }

    initNewsletterForm();

    // Footer links smooth scroll (for future internal links)
    const footerLinks = document.querySelectorAll('.footer-main a[href^="#"]');
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header-main')?.offsetHeight || 0;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Back to top functionality (integrated with footer)
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopButton.className = 'back-to-top';
    backToTopButton.setAttribute('aria-label', 'Volver arriba');
    backToTopButton.setAttribute('title', 'Volver arriba');
    document.body.appendChild(backToTopButton);

    let backToTopVisible = false;
    function toggleBackToTop() {
        const scrollPosition = window.pageYOffset;
        const shouldShow = scrollPosition > 300;
        
        if (shouldShow && !backToTopVisible) {
            backToTopButton.classList.add('show');
            backToTopVisible = true;
        } else if (!shouldShow && backToTopVisible) {
            backToTopButton.classList.remove('show');
            backToTopVisible = false;
        }
    }

    // Throttled scroll for back to top button
    let backToTopTicking = false;
    function requestBackToTopTick() {
        if (!backToTopTicking) {
            requestAnimationFrame(toggleBackToTop);
            backToTopTicking = true;
            setTimeout(() => { backToTopTicking = false; }, 16);
        }
    }

    window.addEventListener('scroll', requestBackToTopTick);

    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // Add click animation
        this.style.transform = 'scale(0.9)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
    });

    // Keyboard accessibility for back to top
    backToTopButton.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.click();
        }
    });

    // Copyright year auto-update
    const copyrightElement = document.querySelector('.copyright');
    if (copyrightElement) {
        const currentYear = new Date().getFullYear();
        copyrightElement.textContent = copyrightElement.textContent.replace('2025', currentYear);
    }

    // Add ripple effect to social links
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    console.log('Footer JavaScript loaded successfully');
});