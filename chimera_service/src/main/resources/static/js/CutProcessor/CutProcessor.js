CutProcessor = function (processor, snapshotsManager) {

    var buildProcessor = processor;
    var inProgress = false;
    var currentStrategy = "";
    var cutParticles = buildProcessor.getParticles();
    var previouslyStatesStack = [];
    buildProcessor.setCutInProgress(true);

    this.onHorizontalCutButtonClick = function () {
        buildProcessor.rotate_none();
        inProgress = true;
        currentStrategy = Globals.CutHorizontal;
    }

    this.onVerticalCutButtonClick = function () {
        buildProcessor.rotate_none();
        inProgress = true;
        currentStrategy = Globals.CutVertical;
    }

    this.exit = function () {
        if (!Options.GetBoolValue(OptionSchema.DefaultRotationZoomAutomaticReset)) {
            snapshotsManager.takeSnapshot('temp1', cutParticles, false);
        }

        buildProcessor.setCutInProgress(false);
        resetValues();
    }

    this.setCurrentType = function (value) {
        document.getElementById(ControlsNames.CurrentCutTypeLabel).value = value;
    }

    this.getCutParticles = function () {
        return cutParticles;
    }

    function resetValues() {
        inProgress = false;
        currentStrategy = "";
        buildProcessor.removeCustomObjects();
        document.getElementById(ControlsNames.CurrentCutTypeLabel).value = 'Current Cut type: none';
    }

    function cutHorizontalPart(event, cutVector) {

        var vector = buildProcessor.translateCoordinatesFromEvent(event);
        var newParticles = new THREE.Geometry();

        if (cutVector == 1) {
            for (var i = 0; i < cutParticles.vertices.length; i++) {
                if (cutParticles.vertices[i].y < vector.y) {
                    newParticles.vertices.push(cutParticles.vertices[i]);
                    newParticles.colors.push(cutParticles.colors[i]);
                }
            }
        }
        else {
            for (var i = 0; i < cutParticles.vertices.length; i++) {
                if (cutParticles.vertices[i].y > vector.y) {
                    newParticles.vertices.push(cutParticles.vertices[i]);
                    newParticles.colors.push(cutParticles.colors[i]);
                }
            }
        }

        saveCurrentState();
        cutParticles = newParticles;
        buildProcessor.process(new BuildOptions(cutParticles, null, null, null, false));
    }

    function cutVerticalPart(event, cutVector) {

        var vector = buildProcessor.translateCoordinatesFromEvent(event);
        var newParticles = new THREE.Geometry();

        if (cutVector == 1) {
            for (var i = 0; i < cutParticles.vertices.length; i++) {
                if (cutParticles.vertices[i].x < vector.x) {
                    newParticles.vertices.push(cutParticles.vertices[i]);
                    newParticles.colors.push(cutParticles.colors[i]);
                }
            }
        }
        else {
            for (var i = 0; i < cutParticles.vertices.length; i++) {
                if (cutParticles.vertices[i].x > vector.x) {
                    newParticles.vertices.push(cutParticles.vertices[i]);
                    newParticles.colors.push(cutParticles.colors[i]);
                }
            }
        }

        saveCurrentState();
        cutParticles = newParticles;
        buildProcessor.process(
            new BuildOptions(cutParticles, null, null, null, false));
    }

    function saveCurrentState() {
        previouslyStatesStack.push(cutParticles);
    }

    function drawHorizontalHelpLine(event) {
        var vector = buildProcessor.translateCoordinatesFromEvent(event);

        var geometry = new THREE.Geometry();
        geometry.vertices.push(new THREE.Vector3(-20, vector.y, 0));
        geometry.vertices.push(new THREE.Vector3(20, vector.y, 0));

        var material = new THREE.LineBasicMaterial({
            color: 0xff0000,
            linewidth: 0
        });

        var line = new THREE.Line(geometry, material);

        buildProcessor.addCustomObject(line);
    }

    function drawVerticalHelpLine(event) {
        var vector = buildProcessor.translateCoordinatesFromEvent(event);

        var geometry = new THREE.Geometry();
        geometry.vertices.push(new THREE.Vector3(vector.x, -20, 0));
        geometry.vertices.push(new THREE.Vector3(vector.x, 20, 0));

        var material = new THREE.LineBasicMaterial({
            color: 0xff0000,
            linewidth: 0
        });

        var line = new THREE.Line(geometry, material);

        buildProcessor.addCustomObject(line);
    }

    function undo() {
        if (previouslyStatesStack.length == 0)
            return;

        var particles = previouslyStatesStack.pop();
        cutParticles = particles;

        buildProcessor.process(
            new BuildOptions(particles, null, null, null, false));
    }

    window.onmousemove = function (event) {
        if (!inProgress)
            return;

        switch (currentStrategy) {
            case Globals.CutHorizontal:
                drawHorizontalHelpLine(event);
                break;
            case Globals.CutVertical:
                drawVerticalHelpLine(event);
                break;
        }
    }

    window.onkeydown = function (event) {
        if (event.which == 90 && event.ctrlKey) {
            undo();
        }
    }

    window.onmousedown = function (event) {
        if (!inProgress)
            return;

        var cutVector;

        if (event.which === 1)
            cutVector = 1;
        else
            cutVector = 2;

        switch (currentStrategy) {
            case Globals.CutHorizontal:
                cutHorizontalPart(event, cutVector);
                break;
            case Globals.CutVertical:
                cutVerticalPart(event, cutVector);
                break;
            default:
                return;
        }

        resetValues();
    }
}