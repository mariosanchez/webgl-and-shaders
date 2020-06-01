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
  const camera = new THREE.PerspectiveCamera(50, 1, 0.01, 100);
  camera.position.set(0, 0, -4);
  camera.lookAt(new THREE.Vector3());

  // Setup camera controller
  const controls = new THREE.OrbitControls(camera, context.canvas);

  // Setup your scene
  const scene = new THREE.Scene();

  //  It's like a waterfall!
  // Setup a geometry - Waterfall jump 1
  const geometry = new THREE.SphereGeometry(1, 32, 16);

  // Define a vertex shader - Waterfall jump 2
  const vertexShader = /* glsl */ `
    varying vec2 vUv;
    void main() {
      vUv = uv; // texture cordinates
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position.xyz, 1.0);
    }
  `;

  // Define a fragment shader - Waterfall jump 3
  const fragmentShader = /* glsl */ `
    varying vec2 vUv;
    uniform vec3 color;
    uniform float time;
    void main() {
      vec2 center = vec2(0.5, 0.5); // the center is half of the size
      vec2 q = vUv;
      q.x *= 2.0; // this will squash de circles horizontally
      vec2 pos = mod(q * 10.0, 1.0); // mod is equal to % in JavaScript, this controll the number of circles
      float d = distance(pos, center); // distance of the pixel to the center
      float circlesSizeVariation = 0.25 + sin(time + vUv.x * 2.0) * 0.25; // just playing around with numbers
      float mask = step(circlesSizeVariation, d); // same as d > 0.25 ? 1.0 : 0.0; white if is farest of 0.25 black if not
      mask = 1.0 - mask; // inverse mask

      vec3 fragColor = mix(color, vec3(1), mask); // mix interpolates between 2 colors

      gl_FragColor = vec4(vec3(fragColor), 1.0); 
    }
  `;

  // Setup a material
  const material = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      color: { value: new THREE.Color('tomato') }
    },
    vertexShader,
    fragmentShader,
  });

  // Setup a mesh with geometry + material
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

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
      material.uniforms.time.value = time;
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
