let scene, camera, renderer, controls;
let sphere;
let movement = {
  up: false,
  down: false,
  left: false,
  right: false,
  touchX: 0,
  touchY: 0
};

// Initialize Three.js scene
function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Add OrbitControls to enable mouse control of the camera
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.25;

  const geometry = new THREE.SphereGeometry(1, 32, 32);
  const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  sphere = new THREE.Mesh(geometry, material);
  scene.add(sphere);

  const groundGeometry = new THREE.PlaneGeometry(10, 10, 10, 10);
  const groundMaterial = new THREE.MeshBasicMaterial({ color: 0x00008B, side: THREE.DoubleSide }); // Dark blue color
  const ground = new THREE.Mesh(groundGeometry, groundMaterial);
  ground.rotation.x = -Math.PI / 2;
  scene.add(ground);

  camera.position.z = 5;

  // Event listeners for arrow key movement
  document.addEventListener('keydown', onKeyDown);
  document.addEventListener('keyup', onKeyUp);

  // Event listeners for touch gestures
  document.addEventListener('touchstart', onTouchStart);
  document.addEventListener('touchmove', onTouchMove);
  document.addEventListener('touchend', onTouchEnd);

  animate();
}

// Handle key press events
function onKeyDown(event) {
  if (event.key === 'ArrowUp') movement.up = true;
  else if (event.key === 'ArrowDown') movement.down = true;
  else if (event.key === 'ArrowLeft') movement.left = true;
  else if (event.key === 'ArrowRight') movement.right = true;
}

// Handle key release events
function onKeyUp(event) {
  if (event.key === 'ArrowUp') movement.up = false;
  else if (event.key === 'ArrowDown') movement.down = false;
  else if (event.key === 'ArrowLeft') movement.left = false;
  else if (event.key === 'ArrowRight') movement.right = false;
}

// Handle touch start event
function onTouchStart(event) {
  movement.touchX = event.touches[0].clientX;
  movement.touchY = event.touches[0].clientY;
}

// Handle touch move event
function onTouchMove(event) {
  const deltaX = event.touches[0].clientX - movement.touchX;
  const deltaY = event.touches[0].clientY - movement.touchY;

  sphere.position.x += deltaX * 0.01;
  sphere.position.z -= deltaY * 0.01;

  movement.touchX = event.touches[0].clientX;
  movement.touchY = event.touches[0].clientY;
}

// Handle touch end event
function onTouchEnd() {
  // Optional: Additional logic when touch ends
}

// Animate the sphere movement
function animate() {
  requestAnimationFrame(animate);

  if (movement.up) sphere.position.z -= 0.1;
  if (movement.down) sphere.position.z += 0.1;
  if (movement.left) sphere.position.x -= 0.1;
  if (movement.right) sphere.position.x += 0.1;

  controls.update(); // Update the controls in the animation loop

  renderer.render(scene, camera);
}

// Resize handling
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize);

init();
