import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.setClearColor(0x000000);
scene.background = new THREE.Color( 0x000000 );

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
camera.position.z = 5;

// Globe Objects
let globeGroup = new THREE.Group(); // Group to hold globe objects for easy removal
scene.add(globeGroup);

const geometry = new THREE.IcosahedronGeometry(2, 5);
const material = new THREE.LineBasicMaterial({
    color: 0x007bff,
    linewidth: 2,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
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
globeGroup.add(lines); // Add globe lines to the group


// Cyberpunk Stage Objects and Functions
let stageGroup = new THREE.Group(); // Group to hold stage objects
let videoPlaceholder;

function createCyberpunkStage() {
    stageGroup.remove(...stageGroup.children); // Clear previous stage if exists

    // Stage Floor
    const floorGeometry = new THREE.PlaneGeometry(50, 50);
    const floorMaterial = new THREE.MeshStandardMaterial({ color: 0x003344, roughness: 0.8, metalness: 0.5 }); // Dark blue-green floor
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    stageGroup.add(floor);

    // Backdrop - simple curved wall
    const backdropGeometry = new THREE.CylinderGeometry(25, 25, 15, 32, 1, true); // Open cylinder
    const backdropMaterial = new THREE.MeshStandardMaterial({
        color: 0x00AA88, // Neon Green backdrop
        emissive: 0x00AA88,
        emissiveIntensity: 0.5,
        side: THREE.DoubleSide // Ensure visible from both sides
    });
    const backdrop = new THREE.Mesh(backdropGeometry, backdropMaterial);
    backdrop.position.y = 7.5; // Half of height
    backdrop.position.z = -15;
    backdrop.rotation.y = Math.PI; // Face inwards
    stageGroup.add(backdrop);

    // Video Placeholder (Plane)
    const videoPlaceholderGeometry = new THREE.PlaneGeometry(16, 9); // 16:9 aspect ratio
    const videoPlaceholderMaterial = new THREE.MeshBasicMaterial({ color: 0x555555 }); // Grey placeholder
    videoPlaceholder = new THREE.Mesh(videoPlaceholderGeometry, videoPlaceholderMaterial);
    videoPlaceholder.position.set(0, 8, -14.9); // Slightly in front of backdrop
    stageGroup.add(videoPlaceholder);

    // Lights - Neon Style Point Lights
    const pointLight1 = new THREE.PointLight(0x00ffff, 1, 50); // Cyan light
    pointLight1.position.set(10, 10, 10);
    stageGroup.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x00ff00, 1, 50); // Green light
    pointLight2.position.set(-10, 10, 10);
    stageGroup.add(pointLight2);

    const ambientLight = new THREE.AmbientLight(0x002233); // Darker ambient
    stageGroup.add(ambientLight);

    stageGroup.visible = false; // Initially hide the stage
    scene.add(stageGroup);
}

createCyberpunkStage(); // Create stage initially but hide it

let isGlobeVisible = true; // State to track scene
let isTransforming = false; // Flag to prevent button spam during transformation

function transformToCyberpunkScene() {
    if (isTransforming) return; // Prevent multiple clicks during animation
    isTransforming = true;

    if (isGlobeVisible) {
        // Zoom in and switch to stage
        const targetPosition = new THREE.Vector3(0, 0, 0); // Zoom to globe center
        const targetCameraPositionStage = new THREE.Vector3(0, 5, 20); // Position for stage view

        // Animation for Zoom and Camera Position
        const zoomDuration = 2000; // milliseconds
        const startTime = performance.now();

        function zoomAnimate() {
            const currentTime = performance.now();
            const elapsedTime = currentTime - startTime;
            let progress = Math.min(elapsedTime / zoomDuration, 1); // 0 to 1 progress

            // Zoom into globe center
            camera.position.lerp(targetPosition.clone().setLength(5), progress); // Zoom in

            if (progress === 1) {
                // Switch scenes after zoom in
                globeGroup.visible = false;
                stageGroup.visible = true;

                // Animate camera to stage position
                const stageCameraDuration = 2000;
                const stageStartTime = performance.now();

                function stageCameraAnimate() {
                    const currentTimeStage = performance.now();
                    const elapsedTimeStage = currentTimeStage - stageStartTime;
                    let stageProgress = Math.min(elapsedTimeStage / stageCameraDuration, 1);

                    camera.position.lerp(targetCameraPositionStage, stageProgress);
                    controls.target.set(0, 5, 0); // Focus controls on stage center

                    if (stageProgress === 1) {
                        isGlobeVisible = false;
                        isTransforming = false;
                        controls.enabled = true; // Enable controls in stage scene
                        controls.update(); // Important to update controls after target change
                    } else {
                        requestAnimationFrame(stageCameraAnimate);
                    }
                }
                controls.enabled = false; // Disable controls during transition
                stageCameraAnimate();

            } else {
                requestAnimationFrame(zoomAnimate);
            }
        }
        controls.enabled = false; // Disable controls during transition
        zoomAnimate();


    } else {
        // Switch back to globe (Reverse Transformation - optional for now, can be added later)
        // For now, just reset camera and scene visibility for demonstration
        globeGroup.visible = true;
        stageGroup.visible = false;
        camera.position.set(0, 0, 5);
        controls.target.set(0, 0, 0);
        controls.enabled = true;
        controls.update();
        isGlobeVisible = true;
        isTransforming = false;
    }
}


// Button Event Listener
document.getElementById('transformButton').addEventListener('click', transformToCyberpunkScene);


function animate() {
    requestAnimationFrame(animate);

    controls.update();

    if (isGlobeVisible) {
        const time = performance.now() * 0.001;
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
    }

    renderer.render(scene, camera);
}

animate();