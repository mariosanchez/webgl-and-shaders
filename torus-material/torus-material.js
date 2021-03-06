// Ensure ThreeJS is in global scope for the 'examples/'
global.THREE = require("three");

// Include any additional ThreeJS examples below
require("three/examples/js/controls/OrbitControls");

const canvasSketch = require("canvas-sketch");

const settings = {
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
  const camera = new THREE.PerspectiveCamera(50, 1, 0.01, 500);
  camera.position.set(3, 3, -5);
  camera.lookAt(new THREE.Vector3());

  // Setup camera controller
  const controls = new THREE.OrbitControls(camera, context.canvas);

  // Setup your scene
  const scene = new THREE.Scene();

  // Setup a geometry
  const geometry = new THREE.TorusGeometry(1, 0.5, 32, 64);

  const loader = new THREE.TextureLoader();
  const map = loader.load('torus-material/brick-diffuse.png');
  
  // Sci Fi material
  // const map = loader.load('torus-material/map.png');

  // We need these to repeat along the surface
  map.wrapS = map.wrapT = THREE.RepeatWrapping;
  // With this it will just wrapp all the texture around without repeating it
  map.repeat.set(2, 1).multiplyScalar(2);

  const normalMap = loader.load('torus-material/brick-normal.png');
  
  // Sci Fi material
  // const normalMap = loader.load('torus-material/normal.png');

  // We need these to repeat along the surface
  normalMap.wrapS = normalMap.wrapT = THREE.RepeatWrapping;
  normalMap.repeat.copy(map.repeat);

  const displacementMap = loader.load('torus-material/brick-displacement.png')
  
  // Sci Fi material
  // const displacementMap = loader.load('torus-material/displacement.png')
  
  // We need these to repeat along the surface
  displacementMap.wrapS = displacementMap.wrapT = THREE.RepeatWrapping;
  displacementMap.repeat.copy(map.repeat);

  // Setup a material
  const normalStrength = 0.5;
  const material = new THREE.MeshStandardMaterial({
    // Strenght or smooth normal effect
    // normalStrength: 10,
    roughness: 0.85,
    metalnes: 0.5,
    // We can play with this to adjust it to be more realistic
    normalScale: new THREE.Vector2(1, 1).multiplyScalar(normalStrength),
    // Without the normal map the texture will be plain
    normalMap,
    displacementMap,
    displacementScale: 0.05,
    map
  });

  // Setup a mesh with geometry + material
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  const lightGroup = new THREE.Group();
  const light = new THREE.PointLight("white", 2);
  light.position.set(2, 2, 0);
  lightGroup.add(light);
  scene.add(lightGroup);

  scene.add(new THREE.PointLightHelper(light, 0.15));

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
      lightGroup.rotation.y = time * 0.5;
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