/*!
 * Portfolio — Mohamed HARO
 * Scripts personnalisés (séparés du template Bootstrap)
 */

window.addEventListener('DOMContentLoaded', () => {

    /* =========================================================
       1. NAVBAR SHRINK AU SCROLL
       ========================================================= */
    const mainNav = document.getElementById('mainNav');

    const navbarShrink = () => {
        if (!mainNav) return;
        if (window.scrollY === 0) {
            mainNav.classList.remove('navbar-shrink');
        } else {
            mainNav.classList.add('navbar-shrink');
        }
    };

    navbarShrink();
    document.addEventListener('scroll', navbarShrink);


    /* =========================================================
       2. BOOTSTRAP SCROLLSPY — surligne le lien actif
       ========================================================= */
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    }


    /* =========================================================
       3. FERMETURE DU MENU MOBILE AU CLIC SUR UN LIEN
       ========================================================= */
    const navbarToggler   = document.querySelector('.navbar-toggler');
    const navLinks        = document.querySelectorAll('#navbarResponsive .nav-link:not(.dropdown-toggle)');
    const dropdownItems   = document.querySelectorAll('#navbarResponsive .dropdown-item');

    const closeNavbar = () => {
        if (navbarToggler && window.getComputedStyle(navbarToggler).display !== 'none') {
            navbarToggler.click();
        }
    };

    navLinks.forEach(link => link.addEventListener('click', closeNavbar));
    dropdownItems.forEach(item => item.addEventListener('click', closeNavbar));


    /* =========================================================
       4. SCROLL FLUIDE VERS LES ANCRES (liens de la navbar)
       ========================================================= */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href');

            // Ignorer les liens qui ouvrent une modal Bootstrap
            if (anchor.hasAttribute('data-bs-toggle')) return;
            // Ignorer "#" seul et "#page-top"
            if (!targetId || targetId === '#' || targetId === '#page-top') return;

            const target = document.querySelector(targetId);
            if (!target) return;

            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });


    /* =========================================================
       5. ANIMATION DES BARRES DE COMPÉTENCES
          Déclenché dès que la barre entre dans le viewport
       ========================================================= */
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fill = entry.target.dataset.fill;
                if (fill) {
                    entry.target.style.width = fill;
                }
                skillObserver.unobserve(entry.target); // Une seule fois
            }
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('.skill-bar-fill').forEach(bar => {
        // Lire la valeur CSS --fill et la stocker en data-fill
        const fill = getComputedStyle(bar).getPropertyValue('--fill').trim();
        bar.dataset.fill = fill;
        bar.style.width = '0'; // Forcer à 0 au départ
        skillObserver.observe(bar);
    });


    /* =========================================================
       6. EFFET DE TYPAGE ANIMÉ (masthead subheading)
          Boucle sur les titres de compétences
       ========================================================= */
    const typedEl = document.getElementById('typed-text');
    if (typedEl) {
        const phrases = [
            'Cybersécurité',
            'Hacking Éthique',
            'Web Design',
            'Ingénieur Réseau & Systèmes',
        ];
        let phraseIndex  = 0;
        let charIndex    = 0;
        let isDeleting   = false;
        const speed      = { type: 80, delete: 40, pause: 1800 };

        const type = () => {
            const current = phrases[phraseIndex];
            if (isDeleting) {
                typedEl.textContent = current.substring(0, charIndex--);
            } else {
                typedEl.textContent = current.substring(0, charIndex++);
            }

            let delay = isDeleting ? speed.delete : speed.type;

            if (!isDeleting && charIndex === current.length + 1) {
                delay = speed.pause;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
            }

            setTimeout(type, delay);
        };

        type();
    }


    /* =========================================================
       7. HIGHLIGHT DE CARTE PROJET AU SURVOL CLAVIER
          (accessibilité)
       ========================================================= */
    document.querySelectorAll('.project-card').forEach(card => {
        card.setAttribute('tabindex', '0');
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.click();
            }
        });
    });

});
