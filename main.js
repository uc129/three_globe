import * as THREE from 'three';

import gsap from 'gsap';

import vertexShader from './shaders/vertex.glsl';
import fragmentShader from './shaders/fragment.glsl';

import atmosphereVertexShader from './shaders/atmosphereVertex.glsl';
import atmosphereFragmentShader from './shaders/atmosphereFragment.glsl';


const scene = new THREE.Scene();

const canvas_container = document.querySelector('#canvas_container');

const camera = new THREE.PerspectiveCamera(75, canvas_container.offsetWidth / canvas_container.offsetHeight, 0.1, 1000);

// const camera = new THREE.PerspectiveCamera(75, canvas_container.offsetWidth / canvas_container.offsetHeight, 0.1, 1000);


const renderer = new THREE.WebGLRenderer({
    antialias: true, // smooth edges
    canvas: document.querySelector('#canvas')
});



renderer.setSize(canvas_container.offsetWidth, canvas_container.offsetHeight);


renderer.setPixelRatio(window.devicePixelRatio);// higher resolution


// document.body.appendChild(renderer.domElement);    //remove and use canvas property in renderer, from the canvas in index.html

// create sphere properties
const sphere_geometry = new THREE.SphereGeometry(5, 50, 50);

// const sphere_material = new THREE.MeshBasicMaterial({
//     // color: 0xff0000,
//     map: new THREE.TextureLoader().load('./img/globe.jpeg'),
// });

//custom shader
// const shader_material = new THREE.ShaderMaterial({
//     vertexShader, //responsible for position of vertices
//     fragmentShader//responsible for color of each pixel between vertices

// })



const shader_material = new THREE.ShaderMaterial({
    vertexShader, //responsible for position of vertices
    fragmentShader,//responsible for color of each pixel between vertices
    uniforms: {  //uniforms are data passed from js to shader
        globeTexture: {
            value: new THREE.TextureLoader().load('./img/globe.jpeg')
        }
    }

})


// create sphere
const sphere = new THREE.Mesh(sphere_geometry, shader_material);
// add sphere to scene
// scene.add(sphere);

//move camera back from sphere
camera.position.z = 15;




//create atmosphere // another larger sphere with transparent material

const atmosphere_geometry = new THREE.SphereGeometry(5, 50, 50);
const atmosphere_material = new THREE.ShaderMaterial({
    vertexShader: atmosphereVertexShader,
    fragmentShader: atmosphereFragmentShader,
    blending: THREE.AdditiveBlending, // add color to existing color
    side: THREE.BackSide, // render on back side of sphere

});

const atmosphere = new THREE.Mesh(atmosphere_geometry, atmosphere_material);
atmosphere.scale.set(1.1, 1.1, 1.1);
atmosphere.renderOrder = 5; // render after globe so that it is visible
scene.add(atmosphere);



// data points on globe, connecting cities with lines



const cities = [
    { name: 'Patna', lat: 25.5941, lon: 85.1376 },
    { name: 'Sydney', lat: -33.8688, lon: 151.2093 },
    // Add more cities here
    { name: 'New York', lat: 40.7128, lon: -74.0060 },

    { name: 'London', lat: 51.5074, lon: -0.1278 },

    { name: 'Tokyo', lat: 35.6762, lon: 139.6503 },

    { name: 'Moscow', lat: 55.7558, lon: 37.6173 },

    { name: 'Cairo', lat: 30.0444, lon: 31.2357 },

    { name: 'Rio de Janeiro', lat: -22.9068, lon: -43.1729 },

    { name: 'Cape Town', lat: -33.9249, lon: 18.4241 },
];

const cityObjects = [];


// Convert latitude and longitude to 3D coordinates on a sphere
function convertCoordinatesTo3D(latitude, longitude, radius) {
    radius = radius || 5; // Default radius if not provided

    // Convert latitude and longitude from degrees to radians
    const latRad = (latitude * Math.PI) / 180;
    const lonRad = (longitude * Math.PI) / 180;

    // Calculate 3D position using spherical coordinates
    const x = radius * Math.cos(latRad) * Math.cos(lonRad);
    const y = radius * Math.cos(latRad) * Math.sin(lonRad);
    const z = radius * Math.sin(latRad);

    return new THREE.Vector3(x, y, z);
}
const group = new THREE.Group();

// Create 3D objects for each city and add them to the scene
cities.forEach((city) => {
    const position = convertCoordinatesTo3D(city.lat, city.lon); // Implement this function to convert lat/lon to 3D position

    const citySphereGeometry = new THREE.SphereGeometry(0.1, 32, 32); // You can customize the geometry
    const citySphereMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // Customize the material
    const citySphere = new THREE.Mesh(citySphereGeometry, citySphereMaterial);
    citySphere.position.copy(position);
    group.add(citySphere);
    cityObjects.push({ name: city.name, position });
});

// for (let i = 0; i < cities.length; i++) {
//     const start = cityObjects[i].position;

//     for (let j = 0; j < cities.length; j++) {
//         if (i !== j) {
//             const end = cityObjects[j].position;

//             // Calculate control point for the curve (you can adjust this as needed)
//             const controlPoint = new THREE.Vector3(
//                 (start.x + end.x) / 2,
//                 (start.y + end.y) / 2 + 1, // Adjust the height of the curve
//                 (start.z + end.z) / 2
//             );

//             // Create a quadratic Bezier curve
//             const curve = new THREE.QuadraticBezierCurve3(start, controlPoint, end);

//             // Create a line geometry based on the curve
//             const points = curve.getPoints(50); // Adjust the number of points for smoother or coarser curves
//             const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);

//             const lineMaterial = new THREE.LineBasicMaterial({
//                 color: 0x00ff00,
//                 // Customize line appearance
//             });

//             const line = new THREE.Line(lineGeometry, lineMaterial);

//             group.add(line); // Add the arc to the group
//         }
//     }
// }

function getRandomCityPair() {
    const city1Index = Math.floor(Math.random() * cities.length);
    let city2Index;

    do {
        city2Index = Math.floor(Math.random() * cities.length);
    } while (city2Index === city1Index); // Ensure city2 is different from city1

    return [city1Index, city2Index];
}



const numberOfConnections = cities.length - 1; // Change this to the desired number of connections

const tubeColors = [
    0xff0000, // Red
    0x00ff00, // Green
    0x0000ff, // Blue
    0xffff00, // Yellow
    0xff00ff, // Magenta
    0x00ffff, // Cyan
    0xff0000, // Red
    0x00ff00, // Green
    0x0000ff, // Blue
    0xffff00, // Yellow
    0xff00ff, // Magenta
    0x00ffff, // Cyan
    0xff0000, // Red
    0x00ff00, // Green
    0x0000ff, // Blue
    0xffff00, // Yellow
    0xff00ff, // Magenta
    0x00ffff, // Cyan
    0xff0000, // Red
    0x00ff00, // Green
    0x0000ff, // Blue
    0xffff00, // Yellow
    0xff00ff, // Magenta
    0x00ffff, // Cyan
    0xff0000, // Red
    0x00ff00, // Green
    0x0000ff, // Blue
    0xffff00, // Yellow
    0xff00ff, // Magenta
    0x00ffff, // Cyan
    // Add more colors here
];

const flightPaths = [];

for (let i = 0; i < numberOfConnections; i++) {
    const [cityIndex1, cityIndex2] = getRandomCityPair();
    const tubeColor = tubeColors[i + 1]; // Cycle through the colors   


    const start = cityObjects[cityIndex1].position;
    const end = cityObjects[cityIndex2].position;



    // Calculate control point for the curve (you can adjust this as needed)
    const controlPoint = new THREE.Vector3(
        (start.x + end.x) / 2,
        (start.y + end.y) / 2 + 9, // Adjust the height of the curve
        (start.z + end.z) / 2
    );

    // Create a quadratic Bezier curve
    const curve = new THREE.QuadraticBezierCurve3(start, controlPoint, end);

    function createTubeGeometry(path, segments, radius, radialSegments) {
        const tubeGeometry = new THREE.TubeGeometry(path, segments, radius, radialSegments);
        return tubeGeometry;
    }

    // Create a tube geometry based on the curve (thicker line)
    const tubeGeometry = createTubeGeometry(curve, 50, 0.05, 8); // Adjust radius and radialSegments as needed

    const lineMaterial = new THREE.MeshBasicMaterial({
        color: tubeColor,
        side: THREE.DoubleSide, // Ensure the material is visible from both sides
        depthTest: true,
    });

    const line = new THREE.Mesh(tubeGeometry, lineMaterial);
    line.renderOrder = 1; // Adjust this value as needed

    group.add(line); // Add the tube geometry to the group

    flightPaths.push({ line, start, end });

}

function animateFlightPaths() {
    flightPaths.forEach((flightPath) => {
        const { line, start, end } = flightPath;

        // Animate the line's position to the end point
        gsap.to(line.position, {
            y: start.y,
            z: end.z,
            // Adjust the duration as needed,
            ease: 'circ.inOut',
            // ease: "power2.inOut", // Adjust the easing as needed
            onComplete: () => {
                // Animation complete, you can update the color or perform other actions here
                // line.material.color.set(0xff0000); // Change the color to red (or any other desired color)
            },
        });
    });
}





group.add(sphere);




// add group to scene
scene.add(group);


//add stars

const star_geometry = new THREE.BufferGeometry();
const star_material = new THREE.PointsMaterial({
    color: 0xffffff
})

const star_vertices = [];

for (let i = 0; i < 10000; i++) {
    const x = (Math.random() - 0.5) * 2000;
    const y = (Math.random() - 0.5) * 2000;
    const z = -Math.random() * 2000;
    star_vertices.push(x, y, z);
}


star_geometry.setAttribute('position', new THREE.Float32BufferAttribute(star_vertices, 3));
const stars = new THREE.Points(star_geometry, star_material);
scene.add(stars);


let mouse = {
    x: undefined,
    y: undefined
}



function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);

    // group.rotation.y = mouse.x * 0.4;
    // group.rotation.x = mouse.y * 0.4;

    // gsap.to(group.rotation, {
    //     x: mouse.y * 0.3,
    //     y: mouse.x * 0.2,
    //     duration: 2
    // })


    group.rotation.y += 0.001;
    // animateFlightPaths();





}

animate();



canvas_container.addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = (event.clientY / window.innerHeight) * 2 + 1;
    console.log(mouse.x, mouse.y);
});

