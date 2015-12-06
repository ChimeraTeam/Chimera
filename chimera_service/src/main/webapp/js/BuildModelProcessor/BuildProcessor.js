﻿BuildProcessor = function (strategy) {
    
    var buildStrategyInstance;
    var currentFrameData = [];
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    var renderer = new THREE.WebGLRenderer({ antialias: true });
    var particleSystem;
    var particlesTemporary = new THREE.Geometry();
    var particles = new THREE.Geometry();
    var max = -100, min = 100;
    var container = document.getElementById('container');

    renderer.setSize(container.offsetWidth, container.offsetHeight);
    container.appendChild(renderer.domElement);

    init(strategy);

    function init(st)
    {
        if (st == "Phase") {
            buildStrategyInstance = new PhaseVisualizationStrategy();
        }
        else {
            buildStrategyInstance = new FrequencyVisualizationStrategy();
        }

        initialiasePositions();
    }

    function initialiasePositions() {

        var value = Math.pow(Globals.OscillatorsNumber, 1 / 3);
        
        for (var p = 0; p < Globals.OscillatorsNumber; p++) {
            var pX = ((p) % Math.pow(value, 2)) % value / 3 - 8.3,
                    pY = ((p) % Math.pow(value, 2)) / value / 3 - 8.3,
                    pZ = p / Math.pow(value, 2) / 3 - 8.3,
                particle = new THREE.Vertex(
                new THREE.Vector3(pX, pY, pZ)
                );
            particlesTemporary.vertices.push(particle);
            particles.vertices = particlesTemporary.vertices;
        }

        /*var temp, mn = 1000, mx = 0, j = 0;

        for (var i = 0 ; i < line.length; i += 2) {
            if (j == Globals.OscillatorsNumber - 1) {
                arrayMin.push(mn);
                arrayMax.push(mx);
                mn = 1000;
                mx = 0;
                j = 0;
            }
            if (!line[i] && line[i + 1]) {
                temp = line[i].charCodeAt(0) + "." + line[i + 1].charCodeAt(0);
                if (temp > mx) mx = temp;
                if (temp < mn) mn = temp;
                j++;
            }
        }*/

    }

    function selectDataForCurrentFrame(data, frame) {

        var begin = (frame - 1) * Globals.OscillatorsNumber;
        var end = begin + Globals.OscillatorsNumber;
        
        if (data.length < end) {
            alert("unexpected time moment");
            return;
        }

        for (var i = begin; i < end; i++) {
            var value = data[i];

            if (value > max)
                max = value;
            if (value < min)
                min = value;

            currentFrameData.push(value);
        }

        buildStrategyInstance.min = min;
        buildStrategyInstance.max = max;
    }

    this.build = function(data, frame)
    {
        scene.remove(scene.children[0]);
        delete particleSystem;

        selectDataForCurrentFrame(data, frame);

        if (currentFrameData.length == 0)
            return;

        var colors = buildStrategyInstance.ConvertToColorMap(currentFrameData);

        particles.colors = colors;
        var pMaterial = new THREE.ParticleBasicMaterial({
            size: 0.8,
            shading: THREE.FlatShading,
            wireframe: true,
            transparent: true,
            opacity: 0.12,
            vertexColors: true
        });

        particleSystem = new THREE.ParticleSystem(
                    particles,
                    pMaterial);
        scene.add(particleSystem);
        camera.position.z = 40;

        particleSystem.rotation.x += 0.6;
        particleSystem.rotation.y -= 0.6;

        renderer.render(scene, camera);
    };;

    this.rotate_left = function () {
        particleSystem.rotation.y -= 0.05;
        renderer.render(scene, camera);
    };;

    this.rotate_right = function () {
        particleSystem.rotation.y += 0.05;
        renderer.render(scene, camera);
    };;

    this.rotate_down = function () {
        particleSystem.rotation.x += 0.05;
        renderer.render(scene, camera);
    };;

    this.rotate_up = function () {
        particleSystem.rotation.x -= 0.05;
        renderer.render(scene, camera);
    };;

    this.zoom = function () {
        camera.position.z -= 5;
        renderer.render(scene, camera);
    };;

    this.unzoom = function () {
        camera.position.z += 5;
        renderer.render(scene, camera);
    }

};;