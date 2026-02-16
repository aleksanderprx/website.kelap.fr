/* ============================================
   KELAP - Custom Cursor
   ============================================ */

const CustomCursor = (() => {
    let cursor;
    let posX = 0, posY = 0;
    let currentX = 0, currentY = 0;

    function init() {
        // Disable custom cursor on touch devices
        if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
            const cursorEl = document.getElementById('cursor');
            if (cursorEl) cursorEl.style.display = 'none';
            document.documentElement.classList.remove('js-loaded');
            return;
        }

        cursor = document.getElementById('cursor');
        if (!cursor) return;

        document.addEventListener('mousemove', onMove);

        // Hover detection for interactive elements
        const hoverTargets = document.querySelectorAll(
            'a, button, .portfolio__item, .service-item, .cta__whatsapp, .cta__secondary'
        );

        hoverTargets.forEach(el => {
            el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
            el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
        });

        // Hide cursor when leaving window
        document.addEventListener('mouseleave', () => {
            cursor.style.opacity = '0';
        });
        document.addEventListener('mouseenter', () => {
            cursor.style.opacity = '1';
        });

        animate();
    }

    function onMove(e) {
        posX = e.clientX;
        posY = e.clientY;
    }

    function animate() {
        // Smooth follow with lerp
        currentX += (posX - currentX) * 0.15;
        currentY += (posY - currentY) * 0.15;

        if (cursor) {
            cursor.style.transform = `translate(${currentX}px, ${currentY}px)`;
        }

        requestAnimationFrame(animate);
    }

    return { init };
})();
