import * as THREE from 'three';

export function celebrate(container) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    const canvas = renderer.domElement;
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '1000';
    document.body.appendChild(canvas);

    const particles = [];
    const geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
    const colors = [0xff9a8b, 0xffcc70, 0x8bc6ec, 0x84fab0];

    for (let i = 0; i < 50; i++) {
        const material = new THREE.MeshBasicMaterial({ color: colors[Math.floor(Math.random() * colors.length)] });
        const particle = new THREE.Mesh(geometry, material);
        particle.position.set(0, 0, 0);
        particle.velocity = new THREE.Vector3(
            (Math.random() - 0.5) * 0.2,
            Math.random() * 0.2,
            (Math.random() - 0.5) * 0.2
        );
        scene.add(particle);
        particles.push(particle);
    }

    camera.position.z = 5;

    let frames = 0;
    function animate() {
        if (frames > 120) {
            document.body.removeChild(canvas);
            return;
        }
        requestAnimationFrame(animate);
        particles.forEach(p => {
            p.position.add(p.velocity);
            p.velocity.y -= 0.005; // Gravity
            p.rotation.x += 0.1;
            p.rotation.y += 0.1;
        });
        renderer.render(scene, camera);
        frames++;
    }
    animate();
}
