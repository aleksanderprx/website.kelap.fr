/* ============================================
   KELAP - Main Animation Orchestrator
   GSAP ScrollTrigger + entrance animations
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // Mark JS as loaded
    document.documentElement.classList.add('js-loaded');

    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, Observer);

    // Init modules
    HeroBackground.init();
    CustomCursor.init();
    Portfolio.init();

    // ==========================================
    // GSAP.SET — Hide elements before animating
    // ==========================================
    gsap.set('.hero__logo', { opacity: 0 });
    gsap.set('.hero__nav-right', { opacity: 0, y: -10 });
    gsap.set('.hero__eyebrow', { opacity: 0, y: 20 });
    gsap.set('.hero__title-line', { opacity: 0, y: 60 });
    gsap.set('.hero__subtitle', { opacity: 0, y: 30 });
    gsap.set('.hero__cta-btn', { opacity: 0, y: 20 });
    gsap.set('.hero__scroll', { opacity: 0 });

    gsap.set('.value__headline span', { opacity: 0, clipPath: 'inset(0 100% 0 0)' });
    gsap.set('.value__description', { opacity: 0, y: 30 });
gsap.set('.stat', { opacity: 0, y: 40 });

    gsap.set('.faq__title', { opacity: 0, y: 30 });
    gsap.set('.faq__item', { opacity: 0, y: 20 });

    gsap.set('.portfolio__title', { opacity: 0, y: 20 });
    gsap.set('.portfolio__subtitle', { opacity: 0, y: 20 });
    // Cards: first visible, rest hidden below the stack
    const portfolioCards = gsap.utils.toArray('.portfolio__card');
    portfolioCards.forEach((card, i) => {
        if (i === 0) {
            gsap.set(card, { yPercent: 0, zIndex: 10 });
        } else {
            gsap.set(card, { yPercent: 100, zIndex: 10 + i });
        }
    });

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
        .to('.hero__cta-btn', {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out'
        }, '-=0.2')
        .to('.hero__nav-right', {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power2.out'
        }, '-=0.4')
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

    // Pinned portfolio with stacking cards + snap
    if (portfolioCards.length > 1) {
        const pinSection = document.querySelector('.portfolio__pinned');
        const totalCards = portfolioCards.length;
        const moreText = document.querySelector('.portfolio__more');

        // Build snap points: one per card transition
        const snapValues = [0];
        for (let i = 1; i < totalCards; i++) {
            snapValues.push(i / (totalCards - 1));
        }

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.section--portfolio',
                start: 'top top',
                end: '+=' + (totalCards * 150) + '%',
                pin: pinSection,
                scrub: 3,
                snap: {
                    snapTo: (value) => {
                        // Find closest snap point
                        let closest = snapValues[0];
                        let minDist = Math.abs(value - closest);
                        for (let i = 1; i < snapValues.length; i++) {
                            const dist = Math.abs(value - snapValues[i]);
                            if (dist < minDist) {
                                minDist = dist;
                                closest = snapValues[i];
                            }
                        }
                        // Snap interval per card
                        const step = 1 / (totalCards - 1);
                        const fraction = minDist / step;
                        // Only snap if within first 1/5 or last 1/5 of the transition
                        if (fraction < 0.2 || fraction > 0.8) {
                            return closest;
                        }
                        // Otherwise stay where you are
                        return value;
                    },
                    duration: { min: 0.6, max: 1.2 },
                    delay: 0.1,
                    ease: 'power1.inOut'
                },
                onLeave: () => moreText && moreText.classList.add('portfolio__more--visible'),
                onEnterBack: () => moreText && moreText.classList.remove('portfolio__more--visible'),
            }
        });

        // Each card slides up directly — no pause between
        portfolioCards.forEach((card, i) => {
            if (i > 0) {
                tl.to(card, {
                    yPercent: 0,
                    duration: 1,
                    ease: 'power2.inOut'
                });
            }
        });
    }

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

    // ==========================================
    // SMOOTH SCROLL — Anchor links (#cta, etc.)
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (!targetId || targetId === '#') return;
            const target = document.querySelector(targetId);
            if (!target) return;
            e.preventDefault();
            gsap.to(window, {
                scrollTo: { y: target, offsetY: 0 },
                duration: 1,
                ease: 'power2.inOut'
            });
        });
    });

    // Handle hash in URL on page load (e.g. /#cta)
    if (window.location.hash) {
        const target = document.querySelector(window.location.hash);
        if (target) {
            window.scrollTo(0, 0);
            gsap.to(window, {
                scrollTo: { y: target, offsetY: 0 },
                duration: 1,
                delay: 0.5,
                ease: 'power2.inOut'
            });
        }
    }

    // ==========================================
    // CALLBACK FORM
    // ==========================================
    const callbackForm = document.getElementById('callback-form');
    if (callbackForm) {
        const isFr = document.documentElement.lang === 'fr';

        // Init country picker
        CountryPicker.init('callback-country', isFr ? 'FR' : 'US', document.documentElement.lang);

        callbackForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const phoneInput = document.getElementById('callback-phone');
            const countryPicker = document.getElementById('callback-country');
            const status = document.getElementById('callback-status');
            const phone = phoneInput.value.trim();
            const countryCode = countryPicker.getValue();

            if (!phone || phone.length < 6) {
                status.textContent = isFr ? 'Num\u00e9ro invalide.' : 'Invalid number.';
                status.className = 'cta__callback-status cta__callback-status--error';
                return;
            }

            const fullPhone = countryCode + ' ' + phone;

            // Send to Discord webhook
            fetch('https://discord.com/api/webhooks/1473507987313393838/HE-vvDYh-MmivXQdfpRd7irmowsI5BZ3ZhFRuqzNo1NIUidBPmRsC3Vm2LGzB8I-4Ghn', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    embeds: [{
                        title: '\ud83d\udcde Demande de rappel',
                        color: 2067276,
                        fields: [
                            { name: 'T\u00e9l\u00e9phone', value: fullPhone, inline: true },
                            { name: 'Langue', value: isFr ? 'Fran\u00e7ais' : 'English', inline: true },
                            { name: 'Page', value: window.location.href, inline: false }
                        ],
                        timestamp: new Date().toISOString()
                    }]
                })
            }).catch(() => {});

            status.textContent = isFr ? 'Demande envoy\u00e9e ! On vous rappelle tr\u00e8s vite.' : 'Request sent! We\'ll call you back soon.';
            status.className = 'cta__callback-status cta__callback-status--success';
            phoneInput.value = '';

            setTimeout(() => {
                status.textContent = '';
                status.className = 'cta__callback-status';
            }, 4000);
        });
    }

    // ==========================================
    // FAQ ENTRANCE ANIMATIONS
    // ==========================================
    gsap.utils.toArray('.faq__title').forEach((title, i) => {
        gsap.to(title, {
            scrollTrigger: {
                trigger: '.faq__header',
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: i * 0.15,
            ease: 'power2.out'
        });
    });

    gsap.utils.toArray('.faq__item').forEach((item, i) => {
        gsap.to(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 90%',
                toggleActions: 'play none none none'
            },
            opacity: 1,
            y: 0,
            duration: 0.5,
            delay: i * 0.05,
            ease: 'power2.out'
        });
    });

    // ==========================================
    // FAQ ACCORDION ANIMATION
    // ==========================================
    const faqItems = document.querySelectorAll('.faq__item');

    function closeFaqItem(item) {
        const answer = item.querySelector('.faq__answer');
        if (!answer) return;
        answer.style.height = answer.scrollHeight + 'px';
        requestAnimationFrame(() => {
            answer.style.height = '0px';
        });
        answer.addEventListener('transitionend', () => {
            item.open = false;
            answer.style.height = '';
        }, { once: true });
    }

    faqItems.forEach(item => {
        const answer = item.querySelector('.faq__answer');
        const inner = item.querySelector('.faq__answer-inner');
        if (!answer || !inner) return;

        item.addEventListener('click', e => {
            e.preventDefault();

            if (item.open) {
                // Closing current
                closeFaqItem(item);
            } else {
                // Close any other open item first
                faqItems.forEach(other => {
                    if (other !== item && other.open) {
                        closeFaqItem(other);
                    }
                });

                // Opening
                item.open = true;
                const h = inner.offsetHeight;
                answer.style.height = '0px';
                requestAnimationFrame(() => {
                    answer.style.height = h + 'px';
                });
                answer.addEventListener('transitionend', () => {
                    answer.style.height = '';
                }, { once: true });
            }
        });
    });
});
