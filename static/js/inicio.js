// JavaScript específico para la página de inicio
document.addEventListener('DOMContentLoaded', function() {
    
    // Animación de contador para las estadísticas
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            const target = counter.textContent;
            let current = 0;
            const increment = target.includes('K') ? 
                parseInt(target.replace('K+', '')) * 1000 / 100 : 
                target === '24/7' ? 24 : parseInt(target.replace('+', '')) / 100;
            
            const timer = setInterval(() => {
                if (target.includes('K')) {
                    current += increment;
                    if (current >= parseInt(target.replace('K+', '')) * 1000) {
                        current = parseInt(target.replace('K+', '')) * 1000;
                        clearInterval(timer);
                    }
                    counter.textContent = (current / 1000).toFixed(0) + 'K+';
                } else if (target === '24/7') {
                    counter.textContent = '24/7';
                    clearInterval(timer);
                } else {
                    current += increment;
                    if (current >= parseInt(target.replace('+', ''))) {
                        current = parseInt(target.replace('+', ''));
                        clearInterval(timer);
                    }
                    counter.textContent = Math.ceil(current) + '+';
                }
            }, 30);
        });
    }

    // Intersection Observer para activar animaciones
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                animateCounters();
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);

    // Observar la sección de estadísticas
    const statsSection = document.querySelector('.cta-stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    // Animación de las tarjetas de características al hacer scroll
    const featureCards = document.querySelectorAll('.feature-card');
    const cardObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.animation = `fadeInUp 0.6s ease-out forwards`;
                    entry.target.style.opacity = '1';
                }, index * 200);
            }
        });
    }, { threshold: 0.3 });

    featureCards.forEach((card, index) => {
        card.style.opacity = '0';
        cardObserver.observe(card);
    });

    // Efecto parallax sutil en el hero
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroSection = document.querySelector('.hero-section');
        const floatingCard = document.querySelector('.floating-card');
        
        if (heroSection && scrolled < heroSection.offsetHeight) {
            const rate = scrolled * -0.5;
            heroSection.style.transform = `translate3d(0, ${rate}px, 0)`;
        }
        
        if (floatingCard && scrolled < window.innerHeight) {
            const rate = scrolled * 0.3;
            floatingCard.style.transform = `translateY(${rate}px)`;
        }
    });

    // Efecto de escritura para el título principal
    function typeWriterEffect() {
        const titleElement = document.querySelector('.hero-title');
        if (!titleElement) return;
        
        const originalText = titleElement.innerHTML;
        titleElement.innerHTML = '';
        titleElement.style.opacity = '1';
        
        let i = 0;
        const speed = 50;
        
        function typeWriter() {
            if (i < originalText.length) {
                titleElement.innerHTML += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, speed);
            }
        }
        
        // Iniciar después de un pequeño delay
        setTimeout(typeWriter, 500);
    }

    // Activar efecto de escritura cuando la página esté completamente cargada
    window.addEventListener('load', function() {
        setTimeout(typeWriterEffect, 300);
    });

    // Hover effects para los botones del hero
    const heroButtons = document.querySelectorAll('.btn-hero');
    heroButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Efecto de partículas de fútbol (opcional)
    function createFootballParticles() {
        const heroSection = document.querySelector('.hero-section');
        if (!heroSection) return;
        
        for (let i = 0; i < 5; i++) {
            const particle = document.createElement('div');
            particle.innerHTML = '⚽';
            particle.style.position = 'absolute';
            particle.style.fontSize = Math.random() * 20 + 10 + 'px';
            particle.style.opacity = '0.1';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animation = `float ${Math.random() * 10 + 5}s ease-in-out infinite`;
            particle.style.animationDelay = Math.random() * 5 + 's';
            particle.style.zIndex = '0';
            
            heroSection.appendChild(particle);
        }
    }

    // Crear partículas después de cargar la página
    setTimeout(createFootballParticles, 1000);

    // Lazy loading para mejorar el rendimiento
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Gestión de errores y logs
    console.log('RedGol - Página de inicio cargada correctamente');
    
    // Event listeners para analytics (si se implementa en el futuro)
    heroButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            console.log(`Hero button ${index + 1} clicked:`, this.textContent.trim());
        });
    });

    featureCards.forEach((card, index) => {
        card.addEventListener('click', function() {
            console.log(`Feature card ${index + 1} clicked:`, card.querySelector('.feature-title').textContent);
        });
    });
});