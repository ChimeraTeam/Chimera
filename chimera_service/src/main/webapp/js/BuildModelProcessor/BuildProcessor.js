BuildProcessor = function (strategy) {
    
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    var renderer = new THREE.WebGLRenderer({ antialias: true });
    var particleSystem;
    var particlesTemporary = new THREE.Geometry();
    var particles = new THREE.Geometry();
    var container = document.getElementById('container');
    var buildStrategyInstance;
    var currentFrameData = [];
    var max = -100, min = 100;
    var cookies = new Cookies();

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
            particles.vertices.push(particle);
        }
    }

    function selectDataForCurrentFrame(data, frame) {

        var begin = (frame - 1) * Globals.OscillatorsNumber;
        var end = begin + Globals.OscillatorsNumber;

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

    function saveData()
    {
        cookies.setCookie('timemoment', '1');
    }
    
    this.clearScene = function() {
        scene.remove(scene.children[0]);
        delete particleSystem;
        currentFrameData.length = 0;
        CloseCurrentFrameInfoScene();
        CloseAdditionalFunctionalityScene();

        renderer.render(scene, camera);
    }

    this.build = function(data, frame, isVideo)
    {
        if (frame < 1 || frame > Globals.MaxTimeFrame) {
            alert("unexpected time moment");
            return false;
        }

        this.clearScene();

        LoadAdditionalFunctionalityScene();

        selectDataForCurrentFrame(data, frame);

        if (currentFrameData.length == 0)
            return;
        
        var colors = buildStrategyInstance.ConvertToColorMap(currentFrameData);

        particles.colorsNeedUpdate = true;
        particles.colors = colors;

        saveData();

        var pMaterial = new THREE.ParticleBasicMaterial({
            size: 0.8,
            shading: THREE.FlatShading,
            wireframe: true,
            transparent: true,
            opacity: Options.DefaultOpacity,
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

        LoadCurrentFrameInfoScene();
        SetCurrentFrameValue(frame);

        return true;
    }

    this.updateOpacity = function (value) {
        scene.remove(scene.children[0]);

        var pMaterial = new THREE.ParticleBasicMaterial({
            size: 0.8,
            shading: THREE.FlatShading,
            wireframe: true,
            transparent: true,
            opacity: value,
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
    }

    this.getCurrentFrameData = function() {
        return currentFrameData;
    }

    this.rotate_left = function () {
        particleSystem.rotation.y -= 0.05;
        renderer.render(scene, camera);
    }

    this.rotate_right = function () {
        particleSystem.rotation.y += 0.05;
        renderer.render(scene, camera);
    }

    this.rotate_down = function () {
        particleSystem.rotation.x += 0.05;
        renderer.render(scene, camera);
    }

    this.rotate_up = function () {
        particleSystem.rotation.x -= 0.05;
        renderer.render(scene, camera);
    }

    this.zoom = function () {
        camera.position.z -= 5;
        renderer.render(scene, camera);
    }

    this.unzoom = function () {
        camera.position.z += 5;
        renderer.render(scene, camera);
    }

}