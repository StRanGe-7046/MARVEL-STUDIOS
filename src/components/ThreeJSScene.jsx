import { useEffect, useRef } from 'react';

export default function ThreeJSScene() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Dynamically load Three.js
    const script = document.createElement('script');
    script.src = 'https://ajax.googleapis.com/ajax/libs/threejs/r125/three.min.js';
    script.onload = () => {
      const THREE = window.THREE;
      if (!THREE) return;

      const width = container.clientWidth || window.innerWidth;
      const height = container.clientHeight || window.innerHeight;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(width, height);
      container.appendChild(renderer.domElement);

      // Wireframe icosahedron (reality anchor)
      const geometry = new THREE.IcosahedronGeometry(1.5, 4);
      const material = new THREE.MeshPhongMaterial({
        color: 0x00f0ff,
        emissive: 0x004466,
        shininess: 100,
        wireframe: true,
      });
      const core = new THREE.Mesh(geometry, material);
      scene.add(core);

      // Inner solid sphere
      const innerGeo = new THREE.SphereGeometry(0.8, 32, 32);
      const innerMat = new THREE.MeshPhongMaterial({
        color: 0xff1100,
        emissive: 0x440000,
        transparent: true,
        opacity: 0.8,
      });
      const innerSphere = new THREE.Mesh(innerGeo, innerMat);
      scene.add(innerSphere);

      const light = new THREE.PointLight(0xffffff, 1, 100);
      light.position.set(5, 5, 5);
      scene.add(light);
      scene.add(new THREE.AmbientLight(0x404040));

      camera.position.z = 5;

      let animId;
      function animate(time) {
        animId = requestAnimationFrame(animate);
        core.rotation.y += 0.005;
        core.rotation.x += 0.003;
        innerSphere.scale.setScalar(1 + Math.sin(time * 0.002) * 0.1);
        renderer.render(scene, camera);
      }
      animate(0);

      const onResize = () => {
        const w = container.clientWidth || window.innerWidth;
        const h = container.clientHeight || window.innerHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      window.addEventListener('resize', onResize);

      // Store cleanup on container
      container._cleanup = () => {
        cancelAnimationFrame(animId);
        window.removeEventListener('resize', onResize);
        renderer.dispose();
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      };
    };
    document.head.appendChild(script);

    return () => {
      if (container._cleanup) container._cleanup();
      if (document.head.contains(script)) document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="hero-threejs-wrapper" ref={containerRef} />
  );
}
