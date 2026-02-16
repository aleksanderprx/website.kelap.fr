/* ============================================
   KELAP - Portfolio Interactions
   ============================================ */

const Portfolio = (() => {

    function init() {
        const items = document.querySelectorAll('.portfolio__item');

        items.forEach(item => {
            item.addEventListener('mouseenter', () => {
                if (typeof gsap !== 'undefined') {
                    gsap.to(item, {
                        scale: 1.02,
                        duration: 0.4,
                        ease: 'power2.out'
                    });
                }
            });

            item.addEventListener('mouseleave', () => {
                if (typeof gsap !== 'undefined') {
                    gsap.to(item, {
                        scale: 1,
                        duration: 0.4,
                        ease: 'power2.out'
                    });
                }
            });
        });
    }

    return { init };
})();
