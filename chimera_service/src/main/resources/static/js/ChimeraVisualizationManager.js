var ChimeraVisualizationManager = function () {
    var isSettingsChangeWindowVisible = false;
    var isSnapshotsManagerWindowVisible = false;
    var pageGrid = new PageGrid();
    var snapshotsManager = new SnapshotsManager();
    var uiManager;
    var buildProcessor;
    var cutProcessor;
    var videoProcessor;
    var chimeraData = [];

    this.init = function()
    {
        var dataProcessor = new DataProcessor();
        uiManager = new UIManager();
        Options.TryGetSettingsFromCookies();

        dataProcessor.process(DataReadyCallback, uiManager.loadLoadingScene);

        var visualizationType = dataProcessor.getType(Globals.VisualizationType);
        var oscillatorsCount = dataProcessor.getOscillatorNumber(Globals.FilePath);

        Globals.OscillatorsNumber = oscillatorsCount;

        switch (oscillatorsCount) {
            case Globals.MediumOsillatorsCount:
                Options.SetValue(OptionNames.CameraPosition, Globals.CameraPositionMedium);
                break;
            case Globals.LargeOsillatorsCount:
                Options.SetValue(OptionNames.CameraPosition, Globals.CameraPositionLarge);
                break;
            default:
                break;
        }

        buildProcessor = new BuildProcessor(visualizationType, this);
    }

    this.getChimeraData = function () {
        return chimeraData;
    }

    this.getUIManager = function() {
        return uiManager;
    }

    window.onload = function onload() {
        chimeraManager.init();

        pageGrid = new PageGrid();

        pageGrid.createGrid(window.innerWidth, window.innerHeight);
        uiManager.calculatePositions(pageGrid);
    }

    window.onunload = function () {
        if (Options.GetBoolValue(OptionNames.NeedSaveSettingsToCookies)) {
            Options.Save();
        } else {
            Options.CleanCookies();
        }
    }

    window.onoffline = function () {
        ChimeraMessage.ShowMessage(ChimeraMessage.Warning, ChimeraMessage.OnOfflineWarning);
    }

    function DataReadyCallback()
    {
        if (Options.GetBoolValue(OptionNames.WaitAllFrames)) {
            var dataDecryptService = new DataDecryptor();
            var container = document.getElementById("sockerDataTransferContainer");

            chimeraData = dataDecryptService.decrypt(container.innerHTML);

            uiManager.closeLoadingScene();
        }

        uiManager.closeLoadingScene();
        uiManager.loadOneFrameVisualizationScene();
    }

    this.onresize = function() {
        pageGrid.createGrid(window.innerWidth, window.innerHeight);
        uiManager.calculatePositions(pageGrid);
    }

    this.startVisualization = function () {
        var currentFrame = document.getElementById(ControlsNames.SelectTimeMomentTextBox).value;
        buildProcessor.build(currentFrame, false);
    }

    this.playVideo = function () {
        uiManager.getUICreator().setControlValue(ControlsNames.VideoPauseButton, "Pause");

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
        var value = document.getElementById(ControlsNames.VideoPauseButton).value;

        if (value == "Pause") {
            videoProcessor.pause();
            uiManager.getUICreator().setControlValue(ControlsNames.VideoPauseButton, "Resume");
            uiManager.getUICreator().setDisabledButtonProperty(ControlsNames.VideoBackButton, false);
            uiManager.getUICreator().setDisabledButtonProperty(ControlsNames.VideoNextButton, false);
        }
        else {
            if (!videoProcessor.isVideoEnd()) {
                videoProcessor.resume();
                uiManager.getUICreator().setControlValue(ControlsNames.VideoPauseButton, "Pause");
                uiManager.getUICreator().setDisabledButtonProperty(ControlsNames.VideoBackButton, true);
                uiManager.getUICreator().setDisabledButtonProperty(ControlsNames.VideoNextButton, true);
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
        cutProcessor = new CutProcessor(buildProcessor, snapshotsManager);
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
            Options.ResetButton();
            buildProcessor.rebuild();
        }
        else {
            ChimeraMessage.ShowMessage(ChimeraMessage.Info, "no dirty options for reset");
        }
    }

    this.closeCut = function () {
        cutProcessor.exit();
        cutProcessor = null;
        uiManager.closeCutScene();
        buildProcessor.rebuild();
    }

    function getOpacitySliderValue() {
        return document.getElementById(ControlsNames.OpacitySlider).value;
    }

    function getPointSizeSliderValue() {
        return document.getElementById(ControlsNames.PointSizeSlider).value;
    }

    this.onOpacityChanged = function () {
        var value = getOpacitySliderValue();

        if (uiManager.getCurrentScene() == 'CutScene') {
            buildProcessor.customParticlesBuild(value, Options.GetValue(OptionNames.PointSize), cutProcessor.getCutParticles());
        }
        else {
            buildProcessor.updateOpacity(value);
        }

        document.getElementById(ControlsNames.OpacityLabel).value = Templates.OpacityLabelTemplate + value;
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

        document.getElementById(ControlsNames.PointSizeLabel).value = Templates.PointSizeLabelTemplate + value;
        Options.GetValue(OptionNames.PointSize);
    }

    this.snapshotsManagerButton_OnClick = function () {
        if (!isSnapshotsManagerWindowVisible) {
            if (isSettingsChangeWindowVisible) {
                uiManager.closeChangeSettingsScene();
                isSettingsChangeWindowVisible = false;
            }

            uiManager.loadSnapshotsManagerScene();
            isSnapshotsManagerWindowVisible = true;
        } else {
            uiManager.closeSnapshotsManagerScene();
            isSnapshotsManagerWindowVisible = false;
        }
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
        var dataDecryptService = new DataDecryptor();
        var container = document.getElementById("sockerDataTransferContainer");

        chimeraData = dataDecryptService.decrypt(container.innerHTML);
    }

    this.changeSettings = function () {
        if (!isSettingsChangeWindowVisible) {
            if (isSnapshotsManagerWindowVisible) {
                uiManager.closeSnapshotsManagerScene();
                isSnapshotsManagerWindowVisible = false;
            }

            uiManager.loadChangeSettingsScene();
            isSettingsChangeWindowVisible = true;
        }
        else {
            uiManager.closeChangeSettingsScene();
            isSettingsChangeWindowVisible = false;
        }
    }

    this.onWaitAllFramesCheckBoxClicked = function () {
        ChimeraMessage.ShowMessage(ChimeraMessageType.Warning, 'wait for all frames option will be applied only if save cookie option is enable and after page restart');
    }

    this.onSaveCookieCheckBoxClicked = function () {
        if (!document.getElementById(ControlsNames.SaveCookiesCheckBox.checked))
            ChimeraMessage.ShowMessage(ChimeraMessageType.Warning, 'your custom settings will be reset after page unload if you disable this option');
    }

    this.takeSnapshot = function () {
        var name = uiManager.getUICreator().getControlValue(ControlsNames.SnapshotNameTextBox);
        var tmpl = document.getElementById('snapshot-template');

        if (name == "") {
            ChimeraMessage.ShowMessage(ChimeraMessageType.Warning, 'Please input snapshot name');
            return;
        }

        var snapshotsCount = snapshotsManager.getUserSnapshots().length;
        var particles = buildProcessor.getCutInProgress() ? cutProcessor.getCutParticles() : buildProcessor.getParticles();
        var snapshot = new Snapshot(name, particles, Options.GetValue(OptionNames.Opacity),
            Options.GetValue(OptionNames.PointSize), true);
        var res = snapshotsManager.takeSnapshot(snapshot);

        if (!res) {
            ChimeraMessage.ShowMessage(ChimeraMessageType.Warning, 'Another snapshot with the same name is exist');
            return;
        }

        var d = tmpl.content.querySelectorAll("DIV")[0];
        var label = d.querySelectorAll("LABEL")[0];
        label.textContent = name + ' - ' + snapshot.dateTime.toString();

        var revertButton = d.querySelectorAll("BUTTON")[0];
        revertButton.id = 'revertTo' + snapshotsCount + 1;

        document.getElementById(ControlsNames.SnapshotsManagerContainer).appendChild(tmpl.content.cloneNode(true));
        uiManager.getUICreator().setControlValue(ControlsNames.SnapshotNameTextBox, "");
    }

    function getNameFromTarget(target) {
        var text = target.parentElement.firstElementChild.textContent;
        return getNameFromText(text);
    }

    function getNameFromText(text) {
        var name = text.split(' - ');
        return name[0];
    }

    this.revertSnapshot = function () {
        var name = getNameFromTarget(event.currentTarget);
        var snapshotInfo = snapshotsManager.getSnapshot(name);
        var particles = snapshotInfo.particles;
        snapshotsManager.revertSnapshot(snapshotInfo);
        buildProcessor.customParticlesBuild(snapshotInfo.opacity, snapshotInfo.pointSize, particles);
        uiManager.loadAdditionalFunctionalityScene();
        UIUpdater.update(uiManager);
        this.removeSnapshot();
    }

    this.removeSnapshot = function () {
        var name = getNameFromTarget(event.currentTarget);
        snapshotsManager.removeSnapshot(name);

        var container = document.getElementById(ControlsNames.SnapshotsManagerContainer);

        for (var i = 0; i < container.childNodes.length; i++){
            var node = container.childNodes[i];
            if (node.nodeName == "DIV" && getNameFromText(node.innerText) == name){
                container.removeChild(container.childNodes[i]);
            }
        }
    }

    this.about = function () {
        var tab = window.open('html/pages/about.html', '_blank');
        tab.focus();
    }

    this.keyEvent = function(event) {
        switch (event.keyCode) {
            case 37:
                buildProcessor.rotate_left();
                break;
            case 38:
                buildProcessor.rotate_up();
                break;
            case 39:
                buildProcessor.rotate_right();
                break;
            case 40:
                buildProcessor.rotate_down();
                break;
            case 107:
                buildProcessor.zoom();
                break;
            case 109:
                buildProcessor.unzoom();
                break;
            case 27:
                if (cutProcessor != null) {
                    uiManager.getUICreator().setControlValue(ControlsNames.CurrentCutTypeLabel, 'Current Cut type: none');
                    cutProcessor.exit();
                }
                break;
            default:
                break;
        }
    }
}