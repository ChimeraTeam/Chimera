ChimeraVisualizationManager = function () {
    var isSettingsChangeWindowVisible = false;

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
        if (videoProcessor.isVideoEnd() || videoProcessor.isVideoOnPause()) {
            uiManager.closeVideoVisualizationScene();
            uiManager.loadOneFrameVisualizationScene();

            videoProcessor.close();
        }
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
            if (!videoProcessor.isVideoEnd()) {
                videoProcessor.resume();
                uiManager.getUICreator().setControlValue(NameList.VideoPause, "Pause");
                uiManager.getUICreator().setDisabledButtonProperty(NameList.VideoBack, true);
                uiManager.getUICreator().setDisabledButtonProperty(NameList.VideoNext, true);
            }
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
    
    this.reset = function () {
        if (Options.IsDirty()) {
            Options.Reset();
            buildProcessor.rebuild();
        }
        else {
            Messaging.ShowMessage(Messaging.Info, "no dirty options for reset");
        }
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
            buildProcessor.customParticlesBuild(value, Options.GetValue(OptionNames.PointSize), cutProcessor.getCutParticles());
        }
        else {
            buildProcessor.updateOpacity(value);
        }

        document.getElementById(NameList.OpacityLabel).value = 'Opacity: ' + value;
        Options.SetValue(OptionNames.Opacity, value);
    };

    this.onPointSizeChanged = function () {
        var value = getPointSizeSliderValue();

        if (uiManager.getCurrentScene() == 'CutScene') {
            buildProcessor.customParticlesBuild(Options.GetValue(OptionNames.Opacity), value, cutProcessor.getCutParticles());
        }
        else {
            buildProcessor.updatePointSize(value);
        }

        document.getElementById(NameList.PointSizeLabel).value = 'Point Size: ' + value;
        Options.GetValue(OptionNames.PointSize);
    }
    
    this.applySettings = function () {
        var handlers = new OptionWindowHandlers();
        handlers.applySettings();
        this.changeSettings();

        if (buildProcessor.isNeedRebuild()) {
            buildProcessor.rebuild();
        }
    }
    
    this.onDataChanged = function () {
        var dataDecryptService = new DataDecryptedService();
        var container = document.getElementById("sockerDataTransferContainer");

        chimeraData = dataDecryptService.decryptData(container.innerHTML);
    }
    
    this.changeSettings = function () {
        if (!isSettingsChangeWindowVisible) {
            uiManager.loadChangeSettingsScene();
            isSettingsChangeWindowVisible = true;
        }
        else {
            uiManager.closeChangeSettingsScene();
            isSettingsChangeWindowVisible = false;
        }
    }
    
    this.onWaitAllFramesCheckBoxClicked = function () {
        Messaging.ShowMessage(Messaging.Warning, 'wait for all frames option will be applied only if save cookie option is enable and after page restart');
    }
    
    this.onSaveCookieCheckBoxClicked = function () {
        if (!document.getElementById(OptionsWindowControlNames.SaveCookiesCheckBox.checked))
            Messaging.ShowMessage(Messaging.Warning, 'your custom settings will be reset after page unload if you disable this option');
    }

    this.about = function () {
        var tab = window.open('html/pages/about.html', '_blank');
        tab.focus();
    }
}