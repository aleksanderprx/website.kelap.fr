/* ============================================
   KELAP - Three.js Hero Background
   3D floating logo particles with mouse parallax
   Uses logo.glb model
   ============================================ */

const HeroBackground = (() => {
    let scene, camera, renderer, particles, mouseX = 0, mouseY = 0;
    let animationId;
    let isActive = true;
    let isMobile = false;

    function init() {
        const canvas = document.getElementById('hero-canvas');
        if (!canvas) return;

        scene = new THREE.Scene();

        camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
        camera.position.z = 30;

        renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            alpha: true,
            antialias: true
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        const colors = [
            new THREE.Color('#3B4F61'),
            new THREE.Color('#5F7182'),
            new THREE.Color('#2C3E50'),
            new THREE.Color('#2C3B42'),
            new THREE.Color('#1a252f')
        ];

        isMobile = window.innerWidth < 768;
        const count = isMobile ? 20 : 45;
        particles = [];

        // Load GLB model
        const loader = new THREE.GLTFLoader();
        loader.load('/assets/logo.glb', (gltf) => {
            // Extract geometry from the loaded model
            let geometry = null;
            gltf.scene.traverse((child) => {
                if (child.isMesh && !geometry) {
                    geometry = child.geometry.clone();
                    geometry.center();
                }
            });

            if (!geometry) return;

            for (let i = 0; i < count; i++) {
                const colorIndex = Math.floor(Math.random() * colors.length);
                const material = new THREE.MeshBasicMaterial({
                    color: colors[colorIndex],
                    transparent: true,
                    opacity: 0.08 + Math.random() * 0.2,
                    side: THREE.DoubleSide
                });

                const mesh = new THREE.Mesh(geometry, material);

                mesh.position.x = (Math.random() - 0.5) * (isMobile ? 25 : 45);
                mesh.position.y = (Math.random() - 0.5) * (isMobile ? 20 : 35);
                mesh.position.z = (Math.random() - 0.5) * (isMobile ? 15 : 25);

                // GLB model is ~1 unit tall, scale up for visibility
                const scale = isMobile ? (2 + Math.random() * 4) : (3 + Math.random() * 6);
                mesh.scale.set(scale, scale, scale);

                mesh.rotation.x = Math.random() * Math.PI;
                mesh.rotation.y = Math.random() * Math.PI;
                mesh.rotation.z = Math.random() * Math.PI;

                mesh.userData = {
                    speedY: 0.003 + Math.random() * 0.008,
                    speedRotX: (Math.random() - 0.5) * 0.003,
                    speedRotY: (Math.random() - 0.5) * 0.005,
                    speedRotZ: (Math.random() - 0.5) * 0.002,
                    originX: mesh.position.x,
                    originY: mesh.position.y
                };

                scene.add(mesh);
                particles.push(mesh);
            }

            // Start animation after model is loaded
            animate();
        });

        // Mouse parallax
        document.addEventListener('mousemove', onMouseMove);
        window.addEventListener('resize', onResize);
    }

    function onMouseMove(e) {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    }

    function onResize() {
        if (!camera || !renderer) return;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function animate() {
        if (!isActive) return;
        animationId = requestAnimationFrame(animate);

        particles.forEach(p => {
            // Slow upward drift
            p.position.y += p.userData.speedY;

            // Gentle rotation
            p.rotation.x += p.userData.speedRotX;
            p.rotation.y += p.userData.speedRotY;
            p.rotation.z += p.userData.speedRotZ;

            // Reset position when too high
            const resetY = isMobile ? 12 : 20;
            if (p.position.y > resetY) {
                p.position.y = -resetY;
                p.position.x = (Math.random() - 0.5) * (isMobile ? 25 : 45);
            }
        });

        // Camera parallax following mouse
        camera.position.x += (mouseX * 3 - camera.position.x) * 0.02;
        camera.position.y += (-mouseY * 2 - camera.position.y) * 0.02;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
    }

    function dispose() {
        isActive = false;
        if (animationId) cancelAnimationFrame(animationId);
        if (renderer) renderer.dispose();
        document.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('resize', onResize);
    }

    return { init, dispose };
})();
