// Ensure ThreeJS is in global scope for the 'examples/'
global.THREE = require("three");

// Include any additional ThreeJS examples below
require("three/examples/js/controls/OrbitControls");

const canvasSketch = require("canvas-sketch");

const settings = {
  // Dimension settings
  // dimensions: 'letter',
  // dimensions: [512, 512],
  // units: "in" (cm),
  // sacaleToView: true,
  // dimensions: 'A4', // if missing is full screen
  // orientation: 'landscape',
  // pixelsPerInch: 72,
  // pixelsPerInch: 300,
  // Make the loop animated
  animate: true,
  // Get a WebGL canvas rather than 2D
  context: "webgl"
};

const sketch = ({ context }) => {
  // Create a renderer
  const renderer = new THREE.WebGLRenderer({
    canvas: context.canvas
  });

  // WebGL background color
  renderer.setClearColor("black", 1);

  // Setup a camera
  const camera = new THREE.PerspectiveCamera(
    50, // distance
    1, // aspect ratio
    0.01, // near clipping
    100 // far clipping
  );
  camera.position.set(3, 3, -5);
  camera.lookAt(new THREE.Vector3());

  // Setup camera controller
  const controls = new THREE.OrbitControls(camera, context.canvas);

  // Setup your scene
  const scene = new THREE.Scene();

  // Setup a geometry
  const geometry = new THREE.SphereGeometry(1, 32, 16);

  const loader = new THREE.TextureLoader();
  const texture = loader.load('tiny-solar-system/earth.jpg');
  const moonTexture = loader.load('tiny-solar-system/moon.jpg');

  // Setup a material
  // MeshBasicMaterial does not accept light
  const material = new THREE.MeshStandardMaterial({
    map: texture,
    roughness: 1,
    metalness: 0,
  });

  // Setup a mesh with geometry + material
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  const moonGroup = new THREE.Group();
  const moonMaterial = new THREE.MeshStandardMaterial({
    map: moonTexture,
    roughness: 1,
    metalness: 0,
  });
  const moonMesh = new THREE.Mesh(geometry, moonMaterial);
  moonMesh.position.set(1.5, 1, 0);
  moonMesh.scale.setScalar(0.25)
  moonGroup.add(moonMesh);
  scene.add(moonGroup);

  const light = new THREE.PointLight('white', 2);
  light.position.setScalar(2);
  scene.add(light);
  const sunGroup = new THREE.Group();
  sunGroup.add(light);
  scene.add(sunGroup);




  // PointLightHelper allow us to see a light position
  scene.add(new THREE.PointLightHelper(light, 0.15));

  // GridHelper allow us to see the grid of our scene
  // scene.add(new THREE.GridHelper(5, 50));

  // AxesHelper allow us to see the axes
  // scene.add(new THREE.AxesHelper(5));

  // draw each frame
  return {
    // Handle resize events here
    resize({ pixelRatio, viewportWidth, viewportHeight }) {
      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(viewportWidth, viewportHeight, false);
      camera.aspect = viewportWidth / viewportHeight;
      camera.updateProjectionMatrix();
    },
    // Update & render your scene here
    render({ time }) {
      mesh.rotation.y = time * 0.15;
      moonMesh.rotation.y = time * 0.075;
      moonGroup.rotation.y = time * 0.33;
      sunGroup.rotation.y = time * 1;

      controls.update();
      renderer.render(scene, camera);
    },
    // Dispose of events & renderer for cleaner hot-reloading
    unload() {
      controls.dispose();
      renderer.dispose();
    }
  };
};

canvasSketch(sketch, settings);
