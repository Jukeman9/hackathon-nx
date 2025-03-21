'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader';
import { FontLoader } from 'three/addons/loaders/FontLoader';
import { TextGeometry } from 'three/addons/geometries/TextGeometry';

export default function ThreeScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    containerRef.current.appendChild(renderer.domElement);
    renderer.setClearColor(0x000000);
    scene.background = new THREE.Color(0x000000);

    // Camera position
    camera.position.z = 5; // Restore original camera distance

    // Globe setup
    const geometry = new THREE.IcosahedronGeometry(2, 5);

    // Add a visible globe sphere with proper depth sorting
    const globeGeometry = new THREE.SphereGeometry(2, 32, 32);
    const globeMaterial = new THREE.MeshPhongMaterial({
      color: 0x007bff,
      transparent: true,
      opacity: 0.1,
      wireframe: false,
      side: THREE.DoubleSide,
      depthWrite: false
    });
    const globe = new THREE.Mesh(globeGeometry, globeMaterial);
    scene.add(globe);

    // Add ambient light for better visibility
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Add directional light for better depth
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Original wireframe globe with adjusted material
    const material = new THREE.LineBasicMaterial({
      color: 0x007bff,
      linewidth: 2,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: true
    });

    const positions = geometry.attributes.position.array;
    const numVertices = geometry.attributes.position.count;
    const linesGeometry = new THREE.BufferGeometry();
    const linePositions = [];
    const colors = [];

    const color1 = new THREE.Color(0x007bff);
    const color2 = new THREE.Color(0xff00ff);

    for (let i = 0; i < numVertices; i++) {
      const x1 = positions[i * 3];
      const y1 = positions[i * 3 + 1];
      const z1 = positions[i * 3 + 2];

      linePositions.push(x1, y1, z1);
      colors.push(color1.r, color1.g, color1.b);

      for (let j = i + 1; j < Math.min(i + 5, numVertices); j++) {
        if (Math.random() < 0.5) {
          const x2 = positions[j * 3];
          const y2 = positions[j * 3 + 1];
          const z2 = positions[j * 3 + 2];

          linePositions.push(x1, y1, z1, x2, y2, z2);
          colors.push(color1.r, color1.g, color1.b, color1.r, color1.g, color1.b);
        }
      }
    }

    linesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    linesGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    const lines = new THREE.LineSegments(linesGeometry, material);
    scene.add(lines);

    // Logo loading setup
    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');
    loader.setDRACOLoader(dracoLoader);

    // Define logo configurations - include all logos, not just Bolt
    const logoConfigs = [
      { file: '/glb/bolt_logo_mesh.glb', scale: 0.5, orbit: 2.5, speed: -0.5, startAngle: Math.PI * 0.8, y: 0 },
      { file: '/glb/algorand.glb', scale: 0.35, orbit: 3.2, speed: -0.48, startAngle: Math.PI * 0.5, y: 0.8 },
      { file: '/glb/cloudflare.glb', scale: 0.35, orbit: 3.5, speed: -0.52, startAngle: Math.PI, y: -1.0 },
      { file: '/glb/exa.glb', scale: 0.35, orbit: 3.8, speed: -0.45, startAngle: Math.PI * 1.5, y: 1.2 },
      { file: '/glb/hsr.glb', scale: 0.35, orbit: 4.0, speed: -0.47, startAngle: Math.PI * 0.25, y: -0.9 },
      { file: '/glb/loops.glb', scale: 0.35, orbit: 4.2, speed: -0.51, startAngle: Math.PI * 0.75, y: 0.7 },
      { file: '/glb/netlify.glb', scale: 0.35, orbit: 4.4, speed: -0.46, startAngle: Math.PI * 1.25, y: -1.1 },
      { file: '/glb/sentry.glb', scale: 0.35, orbit: 4.6, speed: -0.49, startAngle: Math.PI * 1.75, y: 1.0 },
      { file: '/glb/supabase.glb', scale: 0.35, orbit: 4.8, speed: -0.53, startAngle: Math.PI * 0.125, y: -0.8 }
    ];

    // Store loaded logos
    const logos = new Map();

    // Load all logos
    logoConfigs.forEach(config => {
      loader.load(
        config.file,
        (gltf) => {
          const logo = gltf.scene;
          logo.scale.set(config.scale, config.scale, config.scale);

          // Setup logo material and orientation
          logo.traverse((child) => {
            if (child.isMesh) {
              const newMaterial = new THREE.MeshBasicMaterial({
                map: child.material.map,
                transparent: true,
                opacity: config.file.includes('bolt_logo_mesh') ? 1 : 0, // Initially hide non-Bolt logos
                side: THREE.DoubleSide
              });

              if (newMaterial.map) {
                newMaterial.map.needsUpdate = true;
                newMaterial.map.colorSpace = THREE.SRGBColorSpace;
              }

              child.material = newMaterial;
              child.scale.x *= -1;
            }
          });

          // Store logo with its configuration
          logos.set(logo, {
            orbit: config.orbit,
            speed: config.speed,
            angle: config.startAngle,
            y: config.y,
            file: config.file // Store filename to identify bolt logo later
          });

          scene.add(logo);
        },
        (xhr) => {
          console.log(`${config.file}: ${(xhr.loaded / xhr.total * 100)}% loaded`);
        },
        (error) => {
          console.error(`Error loading ${config.file}:`, error);
        }
      );
    });

    // Animation variables
    let time = 0;
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;

    function animate() {
      requestAnimationFrame(animate);

      // Update globe colors
      const colorsAttribute = linesGeometry.attributes.color;
      const colorsArray = colorsAttribute.array;

      for (let i = 0; i < numVertices * 3; i += 3) {
        const t = time + i * 0.01;
        const factor = Math.sin(t * 2) * 0.5 + 0.5;
        color1.lerpColors(color2, color1, factor);

        colorsArray[i] = color1.r;
        colorsArray[i + 1] = color1.g;
        colorsArray[i + 2] = color1.b;
      }
      colorsAttribute.needsUpdate = true;

      // Animate all logos
      time += 0.01;
      logos.forEach((config, logo) => {
        config.angle += config.speed * 0.01;

        // Calculate position on orbit (with y-axis offset for 3D effect)
        logo.position.x = Math.cos(config.angle) * config.orbit;
        logo.position.y = config.y;
        logo.position.z = Math.sin(config.angle) * config.orbit;

        // Make logo face outward
        logo.lookAt(0, 0, 0);

        // Add a slight rotation to the logo itself
        logo.rotation.y -= 0.02;
      });

      // Rotate the globe lines slightly for continuous motion
      lines.rotation.x += (targetRotationX - lines.rotation.x) * 0.05;
      lines.rotation.y += (targetRotationY - lines.rotation.y) * 0.05;
      globe.rotation.x += (targetRotationX - globe.rotation.x) * 0.05;
      globe.rotation.y += (targetRotationY - globe.rotation.y) * 0.05;

      renderer.render(scene, camera);
    }

    // Add scroll effect to fade logos based on scroll position
    function handleScroll() {
      // Get the sections
      const heroSection = document.getElementById('hero');
      const judgesSection = document.getElementById('judges');
      const sponsorsSection = document.getElementById('sponsors');
      const overviewSection = document.getElementById('overview');

      if (!judgesSection || !sponsorsSection || !overviewSection) return;

      // Get current scroll position
      const scrollPosition = window.scrollY;

      // Calculate section positions
      const judgesSectionTop = judgesSection.offsetTop;
      const sponsorsSectionTop = sponsorsSection.offsetTop;
      const sponsorsSectionBottom = sponsorsSectionTop + sponsorsSection.offsetHeight;
      const overviewSectionTop = overviewSection.offsetTop;

      // Calculate fade factors
      // 1. Fade in when approaching sponsors section (from judges)
      const fadeInStart = judgesSectionTop + (sponsorsSectionTop - judgesSectionTop) * 0.01;
      const fadeInEnd = sponsorsSectionTop;

      // 2. Fade out when approaching overview section
      const fadeOutStart = sponsorsSectionTop * 0.85;
      const fadeOutEnd = sponsorsSectionTop * 1.2;

      // Calculate opacity based on scroll position
      let opacity = 0;

      // Fade in calculation
      if (scrollPosition >= fadeInStart && scrollPosition <= fadeInEnd) {
        // Scroll is between judges and sponsors sections - fade in
        opacity = (scrollPosition - fadeInStart) / (fadeInEnd - fadeInStart);
      }
      // Full opacity in sponsors section
      else if (scrollPosition > fadeInEnd && scrollPosition < fadeOutStart) {
        opacity = 1;
      }
      // Fade out calculation
      else if (scrollPosition >= fadeOutStart && scrollPosition <= fadeOutEnd) {
        // Scroll is between sponsors and overview - fade out
        opacity = 1 - (scrollPosition - fadeOutStart) / (fadeOutEnd - fadeOutStart);
      }

      // Clamp opacity between 0 and 1
      opacity = Math.max(0, Math.min(1, opacity));

      // Apply opacity to all logos except bolt
      logos.forEach((config, logo) => {
        if (!config.file.includes('bolt_logo_mesh')) {
          logo.traverse((child) => {
            if (child.isMesh && child.material) {
              child.material.opacity = opacity;
              // If completely transparent, disable rendering for performance
              child.visible = child.material.opacity > 0.01;
            }
          });
        }
      });
    }

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    // Mouse move handler
    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

      targetRotationX = mouseY * 0.5;
      targetRotationY = mouseX * 0.5;
    };

    // Add event listeners
    window.addEventListener('resize', handleResize);
    document.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    // Initial call to set visibility state
    handleScroll();

    // Start animation
    animate();

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);

      // Clean up Three.js resources
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          if (object.geometry) object.geometry.dispose();
          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach((material) => material.dispose());
            } else {
              object.material.dispose();
            }
          }
        }
      });

      renderer.dispose();
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="scene-container" />;
}