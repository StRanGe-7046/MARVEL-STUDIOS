import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function InfinityThreeScene() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene, Camera, Renderer Setup
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x070a0f, 0.012);

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 12;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // 1. Infinity Stone Particle Field
    const particleCount = 2000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    // 6 Infinity Stone Colors
    const stoneColors = [
      new THREE.Color(0x00d2ff), // Space - Blue
      new THREE.Color(0xffd700), // Mind - Gold
      new THREE.Color(0xff0055), // Reality - Red
      new THREE.Color(0xa100ff), // Power - Purple
      new THREE.Color(0x00ff88), // Time - Green
      new THREE.Color(0xff7700), // Soul - Orange
    ];

    for (let i = 0; i < particleCount; i++) {
      const radius = 10 + Math.random() * 40;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      const color = stoneColors[Math.floor(Math.random() * stoneColors.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.18,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // 2. Central 3D Infinity Artifact (Torus Knot Core)
    const knotGeo = new THREE.TorusKnotGeometry(2.2, 0.45, 120, 24, 2, 3);
    const knotMat = new THREE.MeshPhysicalMaterial({
      color: 0x7df4ff,
      emissive: 0x052e42,
      roughness: 0.2,
      metalness: 0.8,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    });
    const torusKnot = new THREE.Mesh(knotGeo, knotMat);
    scene.add(torusKnot);

    // 3. Orbital Energy Rings
    const ringGroup = new THREE.Group();

    const ring1Geo = new THREE.TorusGeometry(4.2, 0.03, 16, 100);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: 0x7df4ff,
      transparent: true,
      opacity: 0.4,
      wireframe: true,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    ringGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(5.2, 0.03, 16, 100);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0xe50914,
      transparent: true,
      opacity: 0.3,
      wireframe: true,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.y = Math.PI / 4;
    ringGroup.add(ring2);

    scene.add(ringGroup);

    // 4. Lighting
    const pointLight1 = new THREE.PointLight(0x7df4ff, 2, 50);
    pointLight1.position.set(10, 10, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xe50914, 1.5, 50);
    pointLight2.position.set(-10, -10, -10);
    scene.add(pointLight2);

    const ambientLight = new THREE.AmbientLight(0x1a2636, 1);
    scene.add(ambientLight);

    // Mouse & Scroll Interaction State
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (event) => {
      mouseX = (event.clientX - window.innerWidth / 2) * 0.001;
      mouseY = (event.clientY - window.innerHeight / 2) * 0.001;
    };

    window.addEventListener('mousemove', onMouseMove);

    // Animation Loop
    let animId;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth Mouse Interp
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      // Rotate Artifacts
      torusKnot.rotation.x = elapsedTime * 0.2 + targetY;
      torusKnot.rotation.y = elapsedTime * 0.25 + targetX;

      ringGroup.rotation.x = elapsedTime * 0.1;
      ringGroup.rotation.y = elapsedTime * 0.15;
      ringGroup.rotation.z = elapsedTime * 0.05;

      // Rotate Particles
      particleSystem.rotation.y = elapsedTime * 0.03 + targetX * 0.5;
      particleSystem.rotation.x = targetY * 0.5;

      // Pulsing Knot Scale
      const pulse = 1 + Math.sin(elapsedTime * 1.5) * 0.05;
      torusKnot.scale.set(pulse, pulse, pulse);

      renderer.render(scene, camera);
    };

    animate();

    // Window Resize Handler
    const onResize = () => {
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', onResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      knotGeo.dispose();
      knotMat.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="infinity-threejs-container"
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 1,
        overflow: 'hidden',
      }}
    />
  );
}
