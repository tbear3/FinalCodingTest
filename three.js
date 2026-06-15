<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <title>Three.js Rotating Triangle</title>
    <style>
        body {
            margin: 0;
            background-color: #0a0a0f;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            font-family: sans-serif;
        }
        h1 {
            color: #fff;
            margin-bottom: 1rem;
        }
        #canvas-container {
            width: 500px;
            height: 500px;
            border-radius: 1rem;
            overflow: hidden;
        }
    </style>
    <script type="importmap">
        {
            "imports": {
                "three": "https://unpkg.com/three@0.160.0/build/three.module.js"
            }
        }
    </script>
</head>
<body>

    <h1>⚡ Three.js Rainbow Triangle</h1>
    <div id="canvas-container"></div>

    <script type="module">
        import * as THREE from 'three';

        const container = document.getElementById('canvas-container');
        const width = 500;
        const height = 500;

        const scene = new THREE.Scene();
        scene.background = new THREE.Color('#0a0a0f');

        const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
        camera.position.z = 4;

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(width, height);
        container.appendChild(renderer.domElement);

        const geometry = new THREE.BufferGeometry();
        const size = 1.5;
        const h = (Math.sqrt(3) / 2) * size;

        const vertices = new Float32Array([
             0,         h * 0.667,  0,
            -size / 2, -h * 0.333,  0,
             size / 2, -h * 0.333,  0,
        ]);

        const colors = new Float32Array([
            1.0, 0.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 0.0, 1.0,
        ]);

        geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geometry.setIndex([0, 1, 2]);

        const material = new THREE.MeshBasicMaterial({
            vertexColors: true,
            side: THREE.DoubleSide
        });

        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        let lastTime = performance.now();

        function animate() {
            requestAnimationFrame(animate);

            const now = performance.now();
            const delta = (now - lastTime) / 1000;
            lastTime = now;

            mesh.rotation.z -= delta * 0.8;

            renderer.render(scene, camera);
        }

        animate();
    </script>
</body>
</html>
