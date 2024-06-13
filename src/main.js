import Globe from "./index.js";
import {
  AmbientLight,
  DirectionalLight,
  Color,
  Fog,
  PointLight,
  // AxesHelper,
  // DirectionalLightHelper,
  // CameraHelper,
  // HemisphereLight,
  // HemisphereLightHelper,
  // PointLightHelper,
} from "three";
import { GUI } from "dat.gui";

import countries from "./files/globe-data-min.json";
let renderer, camera, scene, controls;
let mouseX = 0;
let mouseY = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;
let GlobeGL;
let gui;

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
  // scene.background = new Color(0xffffff);

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

  camera.position.z = 250;
  camera.position.x = -100;
  camera.position.y = 100;

  // Additional effects
  scene.fog = new Fog(0x535ef3, 400, 2000);

  // Helpers
  // const axesHelper = new AxesHelper(800);
  // scene.add(axesHelper);
  // var helper = new DirectionalLightHelper(dLight);
  // scene.add(helper);
  // var helperCamera = new CameraHelper(camera);
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
  controls.autoRotate = true;
  controls.autoRotateSpeed = -2.5;

  controls.minPolarAngle = Math.PI / 3.5;
  controls.maxPolarAngle = Math.PI - Math.PI / 3;

  window.addEventListener("resize", onWindowResize, false);
  document.addEventListener("mousemove", onMouseMove);

  gui = new GUI({ width: 285 });
}

// SECTION Globe
function initGlobe() {

  let gData = [];
  let rgData = [];

  var labelData = [];

  const COLORS = [
    'green',
    'lime',
    'yellow',
    'orange',
    'red'
  ];

  function fmtNumber(n) {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const BASE_ANIM_TIME = 1300;
  const MIN_ARC_LENGTH = 0.15;
  const MAX_ARC_LENGTH = 0.30;
  const ARC_ANIM_VARIANCE = 3;

  const ANIM_TIME = BASE_ANIM_TIME * 2;
  const ARC_ANIM_DELAY_TIME = BASE_ANIM_TIME + (ANIM_TIME * ARC_ANIM_VARIANCE);

  function fmtNumber(n) {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  let day = 2;
  function getData() {
    fetch(`/src/files/data/__2023-01-${day.toString().padStart(2, '0') }.json`).then(response => response.json()).then(transactions => {
      day++;
      if (day > 9) {
        day = 2;
      }

      gData = [];
      var total_amount = 0;
      var total_transactions = 0;
      var max_top_risk = -1;
      var order_date;

      for (var transaction of transactions) {
        order_date = transaction.order_date;

        total_amount += transaction.order_total;
        total_transactions += transaction.order_total_count;

        if (transaction.lat === 0 && transaction.lon === 0) {
          continue;
        }

        if (Math.floor(transaction.risk_score) > max_top_risk) {
          max_top_risk = Math.floor(transaction.risk_score);
        }

        var s = transaction.order_total / (120 * 1000 * 10);
        s = Math.min(s, 0.70);
        s = Math.max(s, 0.03);

        var es = transaction.next_day_order_total / (120 * 1000 * 10);
        es = Math.min(es, 0.70);
        es = Math.max(es, 0.03);

        if (transaction.next_day_order_total === 0) {
          es = 0;
        }

        var r = transaction.order_total_count / (17 * 1000);
        r = Math.min(r, 2.2);
        r = Math.max(r, 0.4);

        var delay = ((transaction.lon + 180) / 360) * (Math.random() * 0.6 + 0.4);

        if (!transaction.continued_day) {
          s = -s;
          // delay = 0.00001;
        }

        gData.push({
          id: `${transaction.lat}|${transaction.lon}`,
          // tooltip: `${JSON.stringify(transaction)}`,
          lat: transaction.lat,
          lng: transaction.lon,
          size: s,
          end_size: es,
          point_delay: delay,
          color: COLORS[Math.floor(transaction.risk_score)],
          radius: r,
        });
      }

      console.log(order_date);
      GlobeGL.pointsData(gData);

      // find #info div and update the content
      var info = document.getElementById('info');
      var info_innerHTML = `<pre>`;
      info_innerHTML += `${order_date}\n`;
      info_innerHTML += `Total Amount: $${fmtNumber(Math.floor(total_amount))}\n`;
      info_innerHTML += `# of Transactions: ${total_transactions}\n`;
      info_innerHTML += `Average amount: $${fmtNumber(Math.floor(total_amount / total_transactions))}\n`;
      info.innerHTML = info_innerHTML;

      setTimeout(getData, ANIM_TIME + ARC_ANIM_DELAY_TIME);
    });
  }
  
  function getRemittanceData() {    
    fetch(`/src/files/remittance_data/2023-01-${day.toString().padStart(2, '0') }.json`).then(response => response.json()).then(rem_transactions => {
      if (day > 10) {
        day = 2;
      }

      rgData = [];
      var total_amount = 0;
      var total_transactions = 0;
      var order_date;

      for (var transaction of rem_transactions) {
        total_amount += transaction.total_amount;
        total_transactions += transaction.total_count;

        var dashLen = MIN_ARC_LENGTH + Math.random() * (MAX_ARC_LENGTH - MIN_ARC_LENGTH);
        var initGapExtra = Math.random() * ARC_ANIM_VARIANCE;

        var color_chances = [0.85, 0.95, 0.98, 1];
        var color = COLORS[0];
        var color_chance = Math.random();
        for (var j = 0; j < color_chances.length; j++) {
          if (color_chance < color_chances[j]) {
            color = COLORS[j];
            break;
          }
        }

        // haversine formula in km
        var distance = 6371 * Math.acos(
          Math.cos(transaction.from_lat) * Math.cos(transaction.to_lat) * Math.cos(transaction.to_lon - transaction.from_lon) +
          Math.sin(transaction.from_lat) * Math.sin(transaction.to_lat)
        );

        var animTime = ANIM_TIME * Math.random();
        if (distance > 100 * 1000) {
          animTime = ANIM_TIME;
        }

        animTime = Math.max(animTime, ANIM_TIME / 1.5);

        rgData.push({
          from_lat: transaction.from_lat,
          from_lon: transaction.from_lon,
          to_lat: transaction.to_lat,
          to_lon: transaction.to_lon,
          size: 0.85,
          color: color,
          DashLength: dashLen,
          DashGap: 1000,
          DashInitialGap: 1 + initGapExtra,
          DashAnimateTime: animTime,
        });
      }

      GlobeGL.arcsData(rgData);

      setTimeout(getRemittanceData, ANIM_TIME + ARC_ANIM_DELAY_TIME);
    });
  }
  // NOTE animations are followed after the globe enters the scene
  setTimeout(() => {
    GlobeGL
      .labelsData(labelData)
      .labelColor(() => "#ffcb21")
      .labelDotRadius(0.3)
      .labelSize((e) => e.size)
      .labelText("city")
      .labelResolution(6)
      .labelAltitude(0.01)
      .pointsTransitionDuration((ANIM_TIME + ARC_ANIM_DELAY_TIME) / 4)
      .pointId('id')
      .pointRadius('radius')
      .pointAltitude('size')
      .pointEndAltitude('end_size')
      .pointInitDelay('point_delay')
      .pointLabel('tooltip')
      .pointColor('color')
      .arcsTransitionDuration(0)
      .arcStroke('size')
      .arcDashLength('DashLength')
      .arcDashGap('DashGap')
      .arcDashInitialGap('DashInitialGap')
      .arcDashAnimateTime('DashAnimateTime')
      .arcColor('color')
      .arcStartLat("from_lat")
      .arcStartLng("from_lon")
      .arcEndLat("to_lat")
      .arcEndLng("to_lon");

    setTimeout(getData, ANIM_TIME);
    setTimeout(getRemittanceData, ANIM_TIME);
  }, 500);

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

  // camera.position.x += 0.1;
  // camera.position.y += 0.1;

  // camera.lookAt(scene.position);
  // controls.update();
  // renderer.render(scene, camera);
  // requestAnimationFrame(animate);
}
