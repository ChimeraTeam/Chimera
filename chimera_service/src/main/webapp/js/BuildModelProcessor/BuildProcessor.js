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
    var currentFrame;
    var max = -100, min = 100;
    var cutInProgress = false;
    
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    container.appendChild(renderer.domElement);
    
    init(strategy);

    function init(st) {
        if (st == "Phase") {
            buildStrategyInstance = new PhaseVisualizationStrategy();
        }
        else {
            buildStrategyInstance = new FrequencyVisualizationStrategy();
        }
        
        initPositions();
    }

    function initPositions() {
        var value = Math.pow(Globals.OscillatorsNumber, 1 / 3);
        
        for (var p = 0; p < Globals.OscillatorsNumber; p++) {
            var pX = ((p) % Math.pow(value, 2)) % value / 3 - 8.3,
                    pY = ((p) % Math.pow(value, 2)) / value / 3 - 8.3,
                    pZ = p / Math.pow(value, 2) / 3 - 8.3,
                particle = new THREE.Vector3(pX, pY, pZ);
            particles.vertices.push(particle);
        }
    }

    function selectDataForCurrentFrame(frame) {

        var begin = (frame - 1) * Globals.OscillatorsNumber;
        var end = begin + Globals.OscillatorsNumber;

        for (var i = begin; i < end; i++) {
            currentFrameData.push(parseFloat(chimeraData[i]));
        }
    }

    function createMaterial(opacity, size) {
        var material = new THREE.PointCloudMaterial({
            size: size,
            blending: THREE.FlatShading,
            wireframe: true,
            transparent: true,
            depthWrite: false,
            opacity: opacity,
            sizeAttenuation: false,
            vertexColors: true
        });

        return material;
    }

    function renderModel(opacity, size, particlesForRendering) {
        var pMaterial = createMaterial(opacity, size);

        particleSystem = new THREE.PointCloud(
                    particlesForRendering,
                    pMaterial);
        scene.add(particleSystem);

        camera.position.z = Options.DefaultCameraPosition;

        particleSystem.rotationAutoUpdate = true;
        particleSystem.rotation.x += 0.6;
        particleSystem.rotation.y -= 0.6;

        renderer.render(scene, camera);
    }

    function particlesBuild(opacity, size) {

        renderModel(opacity, size, particles);
    }

    this.customParticlesBuild = function (opacity, size, particlesArray) {
        scene.remove(scene.children[0]);

        renderModel(opacity, size, particlesArray);
    }

    function setCurrentFrameValue(value) {
        uiManager.getUICreator().setControlValue(NameList.CurrentFrameLabel, 'Current Frame: ' + value);
    }

    this.translateCoordinatesFromEvent = function (event) {
        var elem = renderer.domElement,
            boundingRect = elem.getBoundingClientRect(),
            x = (event.clientX - boundingRect.left) * (elem.width / boundingRect.width),
            y = (event.clientY - boundingRect.top) * (elem.height / boundingRect.height);

        var vector = new THREE.Vector3(
            ((x / window.innerWidth) * 2 - 1) * 24,
            (-(y / window.innerHeight) * 2 + 1) * 24,
            0.5
        );

        return vector;
    }
    
    this.clearScene = function() {
        scene.remove(scene.children[0]);
        delete particleSystem;
        currentFrameData.length = 0;
        uiManager.closeCurrentFrameInfoScene();
        uiManager.closeAdditionalFunctionalityScene();

        renderer.render(scene, camera);
    }

    this.rebuild = function () {
        this.build(currentFrame, false);
    }

    this.build = function (frame, isVideo) {

        if (parseInt(frame) < 1 || parseInt(frame) > Globals.MaxTimeFrame) {
            Messaging.ShowMessage(Messaging.Error, Messaging.TimeMomentRangeError);
            return false;
        }

        this.clearScene();
        uiManager.loadAdditionalFunctionalityScene();

        selectDataForCurrentFrame(frame);

        if (currentFrameData.length == 0)
            return;
        
        var colors = buildStrategyInstance.ConvertToColorMap(currentFrameData);

        particles.colorsNeedUpdate = true;
        particles.colors = colors;

        particlesBuild(Options.DefaultOpacity, Options.DefaultPointSize);

        uiManager.loadCurrentFrameInfoScene();
        setCurrentFrameValue(frame);
        currentFrame = frame;

        return true;
    }

    this.addCustomObject = function (object) {
        this.removeCustomObjects();
        object.name = 'customLine';

        scene.add(object);
        renderer.render(scene, camera);
    }

    this.removeCustomObjects = function () {
        
        for (var i = 0; i < scene.children.length; i++) {
            if (scene.children[i].name == 'customLine') {
                scene.remove(scene.children[i]);
                break;
            }
        }

        renderer.render(scene, camera);
    }

    this.updateOpacity = function (opacity) {
        scene.remove(scene.children[0]);

        particlesBuild(opacity, Options.DefaultPointSize);
    }

    this.updatePointSize = function (size) {
        scene.remove(scene.children[0]);

        particlesBuild(Options.DefaultOpacity, size);
    }

    this.getCurrentFrameData = function() {
        return currentFrameData;
    }

    this.getParticles = function () {
        return particles;
    }

    this.setCutInProgress = function(value) {
        cutInProgress = value;
    }

    this.rotate_none = function () {
        particleSystem.rotation.x = 0;
        particleSystem.rotation.y = 0;
        particleSystem.rotation.z = 0;
        renderer.render(scene, camera);
    }

    this.rotate_left = function () {
        if (!cutInProgress) {
            particleSystem.rotation.y -= 0.05;
            renderer.render(scene, camera);
        }
    }

    this.rotate_right = function () {
        if (!cutInProgress) {
            particleSystem.rotation.y += 0.05;
            renderer.render(scene, camera);
        }
    }

    this.rotate_down = function () {
        if (!cutInProgress) {
            particleSystem.rotation.x += 0.05;
            renderer.render(scene, camera);
        }
    }

    this.rotate_up = function () {
        if (!cutInProgress) {
            particleSystem.rotation.x -= 0.05;
            renderer.render(scene, camera);
        }
    }

    this.zoom = function () {
        if (!cutInProgress) {
            camera.position.z -= 5;
            renderer.render(scene, camera);
        }
    }

    this.unzoom = function () {
        if (!cutInProgress) {
            camera.position.z += 5;
            renderer.render(scene, camera);
        }
    }

}