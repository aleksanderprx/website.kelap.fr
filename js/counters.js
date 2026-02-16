/* ============================================
   KELAP - Animated Number Counters
   ============================================ */

const Counters = (() => {

    function easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    }

    function animateCounter(element, duration = 2000) {
        const target = parseInt(element.getAttribute('data-target'), 10);
        if (isNaN(target)) return;

        const start = performance.now();

        function update(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = easeOutCubic(progress);
            const current = Math.round(eased * target);

            element.textContent = current;

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        requestAnimationFrame(update);
    }

    function initAll(selector = '[data-target]') {
        const elements = document.querySelectorAll(selector);
        elements.forEach((el, i) => {
            setTimeout(() => animateCounter(el, 2000), i * 200);
        });
    }

    return { animateCounter, initAll };
})();
