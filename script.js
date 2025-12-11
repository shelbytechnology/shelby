document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');
    const pages = document.querySelectorAll('.main-content, .services-page, .team-page, .contact-page');

    function showPage(pageId) {
        pages.forEach(page => {
            page.style.display = 'none';
        });
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.style.display = 'block';
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    // Toggle mobile navigation menu
    menuToggle.addEventListener('click', () => {
        mainNav.classList.toggle('open');
    });

    // Add click event listeners to navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navLinks.forEach(nav => nav.classList.remove('active'));
            link.classList.add('active');
            const page = link.getAttribute('data-page');
            showPage(`${page}-page`);
            if (mainNav.classList.contains('open')) {
                mainNav.classList.remove('open');
            }
        });
    });

    // Add floating animation to service labels
    const serviceLabels = document.querySelectorAll('.service-label');
    serviceLabels.forEach((label, index) => {
        setInterval(() => {
            const randomY = Math.sin(Date.now() * 0.001 + index) * 5;
            const randomX = Math.cos(Date.now() * 0.0008 + index) * 3;
            label.style.transform = `translate(calc(-50% + ${randomX}px), calc(-50% + ${randomY}px))`;
        }, 50);
    });

    // Performance Improvement with IntersectionObserver
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    const animateElements = document.querySelectorAll('.feature-block, .feature-item, .service-item, .team-member-card');
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Enhanced CTA button interactions
    const ctaButtons = document.querySelectorAll('.cta-button, .contact-button, .trial-button');
    ctaButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
                button.style.transform = '';
            }, 100);
            console.log('Button clicked!');
        });

        button.addEventListener('mouseenter', () => {
            button.style.filter = 'brightness(1.1)';
        });

        button.addEventListener('mouseleave', () => {
            button.style.filter = '';
        });
    });

    // Parallax effect for background elements
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const backgroundGrid = document.querySelector('.background-grid');
        const backgroundBlur = document.querySelector('.background-blur');
        
        if (backgroundGrid) {
            backgroundGrid.style.transform = `perspective(2000px) rotateX(75deg) translateY(${scrolled * 0.5}px)`;
        }
        
        if (backgroundBlur) {
            backgroundBlur.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });

    // Service item hover effects
    const serviceItems = document.querySelectorAll('.service-item, .feature-item');
    serviceItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-8px) scale(1.02)';
            item.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
        });

        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0) scale(1)';
            item.style.boxShadow = '';
        });
    });

    // Add resize handler for responsive adjustments
    window.addEventListener('resize', () => {
        const isMobile = window.innerWidth <= 768;
        serviceLabels.forEach(label => {
            label.style.display = isMobile ? 'none' : 'block';
        });
    });

    // Initialize page and set initial visibility
    showPage('home-page');
    
    // Feature block stagger animation
    const featureBlocks = document.querySelectorAll('.feature-block');
    featureBlocks.forEach((block, index) => {
        block.style.animationDelay = `${index * 0.3}s`;
    });
});