ChimeraVisualizationManager = function () {
    this.init = function () {

    }

    this.startVisualization = function () {
        var currentFrame = document.getElementById(NameList.SelectTimeMomentTextBox).value;
        buildProcessor.build(currentFrame, false);
    }

    this.playVideo = function () {
        uiManager.getUICreator().setControlValue(NameList.VideoPause, "Pause");

        uiManager.closeOneFrameVisualizationScene();
        uiManager.loadVideoVisualizationScene();

        videoProcessor = new VideoProcessor()
        videoProcessor.init(buildProcessor);
        videoProcessor.play();
    }

    this.videoClose = function () {
        uiManager.closeVideoVisualizationScene();
        uiManager.loadOneFrameVisualizationScene();

        videoProcessor.close();
    }

    this.videoPause = function () {
        var value = document.getElementById(NameList.VideoPause).value;

        if (value == "Pause") {
            videoProcessor.pause();
            uiManager.getUICreator().setControlValue(NameList.VideoPause, "Resume");
            uiManager.getUICreator().setDisabledButtonProperty(NameList.VideoBack, false);
            uiManager.getUICreator().setDisabledButtonProperty(NameList.VideoNext, false);
        }
        else {
            videoProcessor.resume();
            uiManager.getUICreator().setControlValue(NameList.VideoPause, "Pause");
            uiManager.getUICreator().setDisabledButtonProperty(NameList.VideoBack, true);
            uiManager.getUICreator().setDisabledButtonProperty(NameList.VideoNext, true);
        }
    }

    this.videoBack = function () {
        videoProcessor.back();
    }

    this.videoNext = function () {
        videoProcessor.next();
    }

    this.cut = function () {
        cutProcessor = new CutProcessor(buildProcessor);
        uiManager.loadCutScene();
    }

    this.horizontalCut = function () {
        cutProcessor.setCurrentType('Current Cut type: horizontal');
        cutProcessor.onHorizontalCutButtonClick();
    }

    this.verticalCut = function () {
        cutProcessor.setCurrentType('Current Cut type: vertical');
        cutProcessor.onVerticalCutButtonClick();
    }

    this.closeCut = function () {
        cutProcessor.exit();
        cutProcessor = null;
        uiManager.closeCutScene();
        buildProcessor.rebuild();
    }

    function getOpacitySliderValue() {
        return document.getElementById(NameList.OpacitySlider).value;
    }

    function getPointSizeSliderValue() {
        return document.getElementById(NameList.PointSizeSlider).value;
    }

    this.onOpacityChanged = function () {
        var value = getOpacitySliderValue();

        if (uiManager.getCurrentScene() == 'CutScene') {
            buildProcessor.customParticlesBuild(value, Options.DefaultPointSize, cutProcessor.getCutParticles());
        }
        else {
            buildProcessor.updateOpacity(value);
        }

        document.getElementById(NameList.OpacityLabel).value = 'Opacity: ' + value;
        Options.DefaultOpacity = value;
    }

    this.onPointSizeChanged = function () {
        var value = getPointSizeSliderValue();

        if (uiManager.getCurrentScene() == 'CutScene') {
            buildProcessor.customParticlesBuild(Options.DefaultOpacity, value, cutProcessor.getCutParticles());
        }
        else {
            buildProcessor.updatePointSize(value);
        }

        document.getElementById(NameList.PointSizeLabel).value = 'Point Size: ' + value;
        Options.DefaultPointSize = value;
    }
}