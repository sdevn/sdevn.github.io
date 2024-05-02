import Globe from "./index.js";
import { WebGLRenderer, Scene } from "three";
import {
  PerspectiveCamera,
  AmbientLight,
  DirectionalLight,
  Color,
  Fog,
  // AxesHelper,
  // DirectionalLightHelper,
  // CameraHelper,
  PointLight,
  SphereGeometry,
  Raycaster,
  Vector2,
} from "three";
import countries from "./files/globe-data-min.json";
import transactions from "./files/transactions_norm.json";
// let transactions = [];
let renderer, camera, scene, controls;
let mouseX = 0;
let mouseY = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;
let GlobeGL;

init();
initGlobe();
onWindowResize();
animate();

// SECTION Initializing core ThreeJS elements
function init() {
  // Initialize the Globe
  GlobeGL = new Globe()(document.getElementById('globeViz'))
    .hexPolygonsData(countries.features)
    .hexPolygonResolution(3)
    .hexPolygonMargin(0.7)
    .showAtmosphere(true)
    .atmosphereColor("#3a228a")
    .atmosphereAltitude(0.25)
    .hexPolygonColor((e) => {
      if (
        ["KGZ", "KOR", "THA", "RUS", "UZB", "IDN", "KAZ", "MYS"].includes(
          e.properties.ISO_A3
        )
      ) {
        return "rgba(255,255,255, 1)";
      } else return "rgba(255,255,255, 0.7)";
    });

  window.GlobeGL = GlobeGL;

  // Initialize renderer
  renderer = GlobeGL.renderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  // renderer.outputEncoding = THREE.sRGBEncoding;
  // document.body.appendChild(renderer.domElement);

  // Initialize scene, light
  scene = GlobeGL.scene();
  scene.add(new AmbientLight(0xbbbbbb, 0.3));
  scene.background = new Color(0x040d21);

  // Initialize camera, light
  camera = GlobeGL.camera();
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  var dLight = new DirectionalLight(0xffffff, 0.8);
  dLight.position.set(-800, 2000, 400);
  camera.add(dLight);

  var dLight1 = new DirectionalLight(0x7982f6, 1);
  dLight1.position.set(-200, 500, 200);
  camera.add(dLight1);

  var dLight2 = new PointLight(0x8566cc, 0.5);
  dLight2.position.set(-200, 500, 200);
  camera.add(dLight2);

  camera.position.z = 400;
  camera.position.x = 0;
  camera.position.y = 0;

  // Additional effects
  scene.fog = new Fog(0x535ef3, 400, 2000);

  // Helpers
  // const axesHelper = new AxesHelper(800);
  // scene.add(axesHelper);
  // var helper = new DirectionalLightHelper(dLight);
  // scene.add(helper);
  // var helperCamera = new CameraHelper(dLight.shadow.camera);
  // scene.add(helperCamera);

  // Initialize controls
  controls = GlobeGL.controls();
  controls.enableDamping = true;
  controls.dynamicDampingFactor = 0.01;
  controls.enablePan = false;
  controls.minDistance = 200;
  controls.maxDistance = 500;
  controls.rotateSpeed = 0.8;
  controls.zoomSpeed = 1;
  controls.autoRotate = false;

  controls.minPolarAngle = Math.PI / 3.5;
  controls.maxPolarAngle = Math.PI - Math.PI / 3;

  window.addEventListener("resize", onWindowResize, false);
  document.addEventListener("mousemove", onMouseMove);
}

// SECTION Globe
function initGlobe() {

  let gData = [];

  var labelData = [];
  // Object.entries(COUNTRIES).forEach(([key, val]) => {
  //   labelData.push({
  //     city: key,
  //     lat: val.lat,
  //     lng: val.lon,
  //     size: 1
  //   });
  // });

  const COLORS = [
    'green',
    'lime',
    'yellow',
    'orange',
    'red'
  ];

  const ANIMATION_TIME = 2000 * 1.5;
  const ANIMATION_DELAY_TIME = 2000 * 2.1;

  let i = 0;
  function getData() {
    var transactions_by_key = transactions[i];

    gData = [];

    for (var transaction_key in transactions_by_key) {
      var transaction = transactions_by_key[transaction_key];

      if (transaction.order_total_sum < 0 * 1000) {
        // console.log(transaction);
        continue;
      }
      else {
        // console.log(transaction, transaction_key);
      }

      var s = transaction.order_total_sum / (160 * 1000 * 10);
      s = Math.min(s, 0.1);
      s = Math.max(s, 0.02);

      var r = transaction.order_total_count / (17*1000);
      r = Math.min(r, 1.1);
      r = Math.max(r, 0.4);

      gData.push({
        lat: transaction.lat,
        lng: transaction.lon,
        size: s,
        color: COLORS[Math.floor(transaction.risk_score_mean)],
        radius: r,
        tooltip: `<pre>${transaction.city}:\n Total amount: $${transaction.order_total_sum}\n # of Transactions: ${transaction.order_total_count}</pre>`
      });
    }

    GlobeGL.pointsData(gData);

    i++;
    if (i >= Object.keys(transactions).length) {
      i = 0;
    }

    setTimeout(getData, ANIMATION_TIME + ANIMATION_DELAY_TIME);
  }

  // NOTE Arc animations are followed after the globe enters the scene
  setTimeout(() => {
    GlobeGL
      .labelsData(labelData)
      .labelColor(() => "#ffcb21")
      .labelDotRadius(0.3)
      .labelSize((e) => e.size)
      .labelText("city")
      .labelResolution(6)
      .labelAltitude(0.01)
      // .pointsData(gData)
      .pointsTransitionDuration(ANIMATION_TIME)
      .pointLabel("tooltip")
      .pointRadius('radius')
      .pointAltitude('size')
      .pointColor('color');

    setTimeout(getData, 2000);
  }, 1000);

  // set handlers for next and previous buttons
  // document.getElementById('next').addEventListener('click', function () {
  //   i++;
  //   getData();
  // });
  // document.getElementById('prev').addEventListener('click', function () {
  //   i--;
  //   if (i < 0) {
  //     i = 0;
  //     return;
  //   }
  //   getData();
  // });

  GlobeGL.rotateY = (-Math.PI * (5 / 9));
  GlobeGL.rotateZ = (-Math.PI / 6);
  const globeMaterial = GlobeGL.globeMaterial();
  globeMaterial.color = new Color(0x3a228a);
  globeMaterial.emissive = new Color(0x220038);
  globeMaterial.emissiveIntensity = 0.1;
  globeMaterial.shininess = 0.7;

  // NOTE Cool stuff
  // globeMaterial.wireframe = true;

}

function onMouseMove(event) {
  mouseX = event.clientX - windowHalfX;
  mouseY = event.clientY - windowHalfY;
  // console.log("x: " + mouseX + " y: " + mouseY);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  windowHalfX = window.innerWidth / 1.5;
  windowHalfY = window.innerHeight / 1.5;
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  // camera.position.x +=
  //   Math.abs(mouseX) <= windowHalfX / 2
  //     ? (mouseX / 2 - camera.position.x) * 0.005
  //     : 0;
  // camera.position.y += (-mouseY / 2 - camera.position.y) * 0.005;
  // camera.lookAt(scene.position);
  // controls.update();
  // renderer.render(scene, camera);
  // requestAnimationFrame(animate);
}
