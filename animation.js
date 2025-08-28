// ====== MENU HAMBURGER RESPONSIVE ======

function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.querySelector('.hamburger');
    
    if (navLinks && hamburger) {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    }
}

// ====== INITIALISATION ======

document.addEventListener('DOMContentLoaded', function() {
    // Initialiser les icônes Lucide
    try {
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    } catch (error) {
        console.warn('Lucide icons could not be initialized:', error);
    }
    
    // Gestion du menu hamburger
    initMobileMenu();
    
    // Animations au scroll
    initScrollAnimations();
    
    // Header scroll effect
    initHeaderEffects();
});

// ====== GESTION DU MENU MOBILE ======

function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');
    
    if (!hamburger || !navLinks) return;
    
    // Fermer le menu quand on clique sur un lien
    navLinksItems.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
    
    // Fermer le menu quand on clique en dehors
    document.addEventListener('click', function(event) {
        const nav = document.querySelector('nav');
        const isClickInsideNav = nav && nav.contains(event.target);
        
        if (!isClickInsideNav && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
    
    // Fermer le menu lors du redimensionnement vers desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
}

// ====== ANIMATIONS AU SCROLL ======

function initScrollAnimations() {
    // Animation du panneau overlay qui glisse par-dessus l'image hero
    const contentOverlay = document.querySelector('.content-overlay');
    if (contentOverlay) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        });
        
        observer.observe(contentOverlay);
    }
    
    // Animation des éléments individuels
    const animatedElements = document.querySelectorAll('.simple-animate, .service-item, .feature-card, .storage-item, .skill-card');
    if (animatedElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        });
        
        // Initialiser l'état des éléments
        animatedElements.forEach((element) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'all 0.6s ease-out';
            observer.observe(element);
        });
    }
}

// ====== HEADER SCROLL EFFECTS ======

function initHeaderEffects() {
    const header = document.querySelector('header');
    if (!header) return;
    
    let lastScrollTop = 0;
    
    const handleScroll = function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Effet de transparence et ombre
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Effet de cache/affichage du header (optionnel - peut être commenté)
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scroll vers le bas - cacher le header
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scroll vers le haut - montrer le header
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    };
    
    // Utiliser throttle pour optimiser les performances
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(function() {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    });
}

// ====== SMOOTH SCROLL ======

document.addEventListener('DOMContentLoaded', function() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight || 0;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// ====== FONCTION POUR LES CONTACTS ======

function showContact(type) {
    switch(type) {
        case 'LinkedIn':
            alert('Ajoutez votre lien LinkedIn ici');
            break;
        case 'Email':
            // Géré par mailto: dans le HTML
            break;
        default:
            console.log('Contact type non reconnu:', type);
    }
}

// ====== GESTION DES ERREURS ======

window.addEventListener('error', (e) => {
    console.warn('JavaScript Error:', e.error);
});

// ====== ACCESSIBILITÉ ======

// Gestion du focus visible pour navigation clavier
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('click', () => {
    document.body.classList.remove('keyboard-navigation');
});

console.log('🚀 Menu hamburger et animations chargés avec succès!');