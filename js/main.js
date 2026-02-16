/* ============================================
   KELAP - Main Animation Orchestrator
   GSAP ScrollTrigger + entrance animations
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // Mark JS as loaded
    document.documentElement.classList.add('js-loaded');

    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    // Init modules
    HeroBackground.init();
    CustomCursor.init();
    Portfolio.init();

    // ==========================================
    // GSAP.SET — Hide elements before animating
    // ==========================================
    gsap.set('.hero__logo', { opacity: 0 });
    gsap.set('.hero__eyebrow', { opacity: 0, y: 20 });
    gsap.set('.hero__title-line', { opacity: 0, y: 60 });
    gsap.set('.hero__subtitle', { opacity: 0, y: 30 });
    gsap.set('.hero__scroll', { opacity: 0 });

    gsap.set('.value__headline span', { opacity: 0, clipPath: 'inset(0 100% 0 0)' });
    gsap.set('.value__description', { opacity: 0, y: 30 });
    gsap.set('.value__line', { scaleX: 0 });
    gsap.set('.stat', { opacity: 0, y: 40 });

    gsap.set('.portfolio__title', { opacity: 0, y: 20 });
    gsap.set('.portfolio__subtitle', { opacity: 0, y: 20 });
    gsap.set('.portfolio__item', { opacity: 0, scale: 0.92 });

    gsap.set('.services__title', { opacity: 0, y: 30 });
    gsap.set('.service-item', { opacity: 0, x: -60 });

    gsap.set('.trust__badge', { opacity: 0, y: 30 });

    gsap.set('.cta__title span', { opacity: 0, y: 40 });
    gsap.set('.cta__subtitle', { opacity: 0, y: 20 });
    gsap.set('.cta__buttons', { opacity: 0, y: 30 });

    // ==========================================
    // HERO ENTRANCE ANIMATION
    // ==========================================
    const heroTl = gsap.timeline({ delay: 0.3 });

    heroTl
        .to('.hero__logo', {
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out'
        })
        .to('.hero__eyebrow', {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power2.out'
        }, '-=0.2')
        .to('.hero__title-line', {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.15,
            ease: 'power3.out'
        }, '-=0.2')
        .to('.hero__subtitle', {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out'
        }, '-=0.3')
        .to('.hero__scroll', {
            opacity: 1,
            duration: 0.5,
            ease: 'power2.out'
        }, '-=0.2');

    // Hero parallax on scroll
    gsap.to('.hero__content', {
        scrollTrigger: {
            trigger: '.section--hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 0.5
        },
        y: -150,
        opacity: 0
    });

    gsap.to('.hero__scroll', {
        scrollTrigger: {
            trigger: '.section--hero',
            start: '10% top',
            end: '30% top',
            scrub: true
        },
        opacity: 0
    });

    // ==========================================
    // VALUE PROPOSITION SECTION
    // ==========================================

    // Headline word reveal with clipPath
    gsap.utils.toArray('.value__headline span').forEach((span, i) => {
        gsap.to(span, {
            scrollTrigger: {
                trigger: span,
                start: 'top 85%',
                end: 'top 60%',
                scrub: 0.5
            },
            opacity: 1,
            clipPath: 'inset(0 0% 0 0)',
            ease: 'power2.out'
        });
    });

    // Description fade in
    gsap.to('.value__description', {
        scrollTrigger: {
            trigger: '.value__description',
            start: 'top 85%',
            toggleActions: 'play none none none'
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out'
    });

    // Horizontal line draw
    gsap.to('.value__line', {
        scrollTrigger: {
            trigger: '.value__line',
            start: 'top 85%',
            end: 'top 60%',
            scrub: 0.5
        },
        scaleX: 1,
        ease: 'none'
    });

    // Stats animation
    const statsElements = gsap.utils.toArray('.stat');
    statsElements.forEach((stat, i) => {
        gsap.to(stat, {
            scrollTrigger: {
                trigger: stat,
                start: 'top 88%',
                toggleActions: 'play none none none',
                onEnter: () => {
                    const numberEl = stat.querySelector('.stat__number');
                    if (numberEl && numberEl.textContent === '0') {
                        Counters.animateCounter(numberEl, 2000);
                    }
                }
            },
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: i * 0.15,
            ease: 'power2.out'
        });
    });

    // ==========================================
    // PORTFOLIO SECTION
    // ==========================================

    gsap.to('.portfolio__title', {
        scrollTrigger: {
            trigger: '.portfolio__header',
            start: 'top 85%',
            toggleActions: 'play none none none'
        },
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power2.out'
    });

    gsap.to('.portfolio__subtitle', {
        scrollTrigger: {
            trigger: '.portfolio__header',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        opacity: 1,
        y: 0,
        duration: 0.7,
        delay: 0.2,
        ease: 'power2.out'
    });

    gsap.utils.toArray('.portfolio__item').forEach((item, i) => {
        gsap.to(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 90%',
                toggleActions: 'play none none none'
            },
            opacity: 1,
            scale: 1,
            duration: 0.7,
            delay: i * 0.1,
            ease: 'power2.out'
        });
    });

    // ==========================================
    // SERVICES SECTION
    // ==========================================

    gsap.utils.toArray('.services__title').forEach((title, i) => {
        gsap.to(title, {
            scrollTrigger: {
                trigger: '.services__header',
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: i * 0.15,
            ease: 'power3.out'
        });
    });

    gsap.utils.toArray('.service-item').forEach((item, i) => {
        gsap.to(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 92%',
                toggleActions: 'play none none none'
            },
            opacity: 1,
            x: 0,
            duration: 0.7,
            delay: i * 0.08,
            ease: 'power3.out'
        });
    });

    // ==========================================
    // TRUST / SOCIAL PROOF SECTION
    // ==========================================

    // Quote word-by-word reveal
    const quoteText = document.querySelector('.trust__quote blockquote p');
    if (quoteText) {
        const words = quoteText.textContent.trim().split(/\s+/);
        quoteText.innerHTML = words.map(word =>
            `<span class="word">${word}</span>`
        ).join('');

        // Set initial state for words
        gsap.set('.trust__quote .word', { opacity: 0 });
        gsap.set('.trust__quote cite', { opacity: 0 });

        const quoteContainer = document.querySelector('.trust__quote');

        ScrollTrigger.create({
            trigger: '.trust__quote',
            start: 'top 80%',
            onEnter: () => {
                quoteContainer.classList.add('is-visible');
            }
        });

        gsap.utils.toArray('.trust__quote .word').forEach((word, i) => {
            gsap.to(word, {
                scrollTrigger: {
                    trigger: '.trust__quote',
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                },
                opacity: 1,
                duration: 0.3,
                delay: i * 0.05,
                ease: 'power2.out'
            });
        });

        // Citation fade in
        gsap.to('.trust__quote cite', {
            scrollTrigger: {
                trigger: '.trust__quote',
                start: 'top 75%',
                toggleActions: 'play none none none'
            },
            opacity: 1,
            duration: 0.6,
            delay: words.length * 0.05 + 0.3,
            ease: 'power2.out'
        });
    }

    // Trust badges
    gsap.utils.toArray('.trust__badge').forEach((badge, i) => {
        gsap.to(badge, {
            scrollTrigger: {
                trigger: '.trust__badges',
                start: 'top 88%',
                toggleActions: 'play none none none',
                onEnter: () => {
                    const numberEl = badge.querySelector('.trust__badge-number');
                    if (numberEl && numberEl.textContent === '0') {
                        Counters.animateCounter(numberEl, 1500);
                    }
                }
            },
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: i * 0.15,
            ease: 'power2.out'
        });
    });

    // ==========================================
    // CTA SECTION
    // ==========================================

    gsap.utils.toArray('.cta__title span').forEach((line, i) => {
        gsap.to(line, {
            scrollTrigger: {
                trigger: '.cta__title',
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: i * 0.15,
            ease: 'power3.out'
        });
    });

    gsap.to('.cta__subtitle', {
        scrollTrigger: {
            trigger: '.cta__subtitle',
            start: 'top 88%',
            toggleActions: 'play none none none'
        },
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out'
    });

    gsap.to('.cta__buttons', {
        scrollTrigger: {
            trigger: '.cta__buttons',
            start: 'top 90%',
            toggleActions: 'play none none none'
        },
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'back.out(1.4)'
    });

    // ==========================================
    // PERFORMANCE: Dispose Three.js when past hero
    // ==========================================
    ScrollTrigger.create({
        trigger: '.section--value',
        start: 'top top',
        onEnter: () => {
            HeroBackground.dispose();
        },
        once: true
    });
});
