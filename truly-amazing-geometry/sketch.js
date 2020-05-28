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
  renderer.setClearColor("#fff", 1);

  // Setup a camera
  const camera = new THREE.PerspectiveCamera(45, 1, 0.01, 100);
  camera.position.set(2, 2, -4);
  camera.lookAt(new THREE.Vector3());

  // Setup camera controller
  const controls = new THREE.OrbitControls(camera, context.canvas);
  controls.enableZoom = false;

  // Setup your scene
  const scene = new THREE.Scene();

  // A grid
  const gridScale = 10;
  scene.add(
    new THREE.GridHelper(gridScale, 10, "hsl(0, 0%, 50%)", "hsl(0, 0%, 70%)")
  );

  // Geometry from scratch!
  const geometry = new THREE.Geometry();

  // Geometry dots
  geometry.vertices = [
    new THREE.Vector3(-0.5, 0.5, 0),
    new THREE.Vector3(0.5, -0.5, 0),
    new THREE.Vector3(-0.5, -0.5, 0),
    new THREE.Vector3(0.5, 0.5, 0)
  ];

  // Tells how to join the dots
  geometry.faces = [
    new THREE.Face3(0, 1 , 2),
    new THREE.Face3(3, 1 , 0)
  ];

  // Tells where is this face or the vertex pointing at in the world
  geometry.computeVertexNormals();

  const mesh = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial(
    {
       color: 'red',
       side: THREE.DoubleSide
    }));

  scene.add(mesh);

  // A custom geometry
  // Buffer geometries are usefull to paint a huge amount of geometries by
  // reading from an external data set or randomly painging a bunch of 
  // geometries.
  const bufferGeometry = new THREE.BufferGeometry();

  // Define some vertices
  const verts = [
    new THREE.Vector3(-0.5, 0.5, 0),
    new THREE.Vector3(0.5, -0.5, 0),
    new THREE.Vector3(-0.5, -0.5, 0),
    new THREE.Vector3(0.5, 0.5, 0)
  ];

  // Flatten into buffer attribute
  const vertsFlat = verts.map(p => p.toArray()).flat();
  const vertsArray = new Float32Array(vertsFlat);
  const vertsAttrib = new THREE.BufferAttribute(vertsArray, 3);
  bufferGeometry.addAttribute("position", vertsAttrib);
  
  // List of face
  const faces = [
    [ 0, 1, 2 ],
    [ 0, 3, 1 ]
  ];
  
  // Flatten into buffer attribute
  const facesFlat = faces.flat();
  const facesArray = new Uint16Array(facesFlat);
  const facesAttrib = new THREE.BufferAttribute(facesArray, 1);
  bufferGeometry.setIndex(facesAttrib);

  // Update the face normals
  bufferGeometry.computeVertexNormals();

  const material = new THREE.MeshNormalMaterial({
    side: THREE.DoubleSide
  });

  // Create a mesh
  const mesh2 = new THREE.Mesh(bufferGeometry, material);
  mesh2.position.set(1, 1, 0 );

  // Add it to the scene
  scene.add(mesh2);

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
