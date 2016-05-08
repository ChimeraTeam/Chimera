var ChimeraVisualizationManager = function () {
    var isSettingsChangeWindowVisible = false;
    var isSnapshotsManagerWindowVisible = false;
    var pageGrid = new PageGrid();
    var snapshotsManager = new SnapshotsManager();
    var uiManager;
    var buildProcessor;
    var cutProcessor;
    var videoProcessor;
    var visualizationType;
    var oscilatorsCount;
    var chimeraData = [];

    this.init = function()
    {
        var inspector = new SocketDataInspector();
        uiManager = new UIManager();
        Options.TryGetSettingsFromCookies();

        inspector.init(DataReadyCallback, uiManager.loadLoadingScene);

        visualizationType = inspector.getType(Globals.VisualizationType);
        oscilatorsCount = inspector.getOscillatorNumber(Globals.FilePath);

        Globals.OscillatorsNumber = oscilatorsCount;

        switch (oscilatorsCount) {
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
            var dataDecryptService = new DataDecryptedService();
            var container = document.getElementById("sockerDataTransferContainer");

            chimeraData = dataDecryptService.decryptData(container.innerHTML);

            uiManager.closeLoadingScene();
        }

        uiManager.loadOneFrameVisualizationScene();
    }

    this.onresize = function() {
        pageGrid.createGrid(window.innerWidth, window.innerHeight);
        uiManager.calculatePositions(pageGrid);
    }

    this.startVisualization = function () {
        var currentFrame = document.getElementById(NameList.SelectTimeMomentTextBox).value;
        buildProcessor.build(currentFrame, false);
    }

    this.playVideo = function () {
        uiManager.getUICreator().setControlValue(NameList.VideoPauseButton, "Pause");

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
        var value = document.getElementById(NameList.VideoPauseButton).value;

        if (value == "Pause") {
            videoProcessor.pause();
            uiManager.getUICreator().setControlValue(NameList.VideoPauseButton, "Resume");
            uiManager.getUICreator().setDisabledButtonProperty(NameList.VideoBackButton, false);
            uiManager.getUICreator().setDisabledButtonProperty(NameList.VideoNextButton, false);
        }
        else {
            if (!videoProcessor.isVideoEnd()) {
                videoProcessor.resume();
                uiManager.getUICreator().setControlValue(NameList.VideoPauseButton, "Pause");
                uiManager.getUICreator().setDisabledButtonProperty(NameList.VideoBackButton, true);
                uiManager.getUICreator().setDisabledButtonProperty(NameList.VideoNextButton, true);
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
        var dataDecryptService = new DataDecryptedService();
        var container = document.getElementById("sockerDataTransferContainer");

        chimeraData = dataDecryptService.decryptData(container.innerHTML);
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
        if (!document.getElementById(OptionsWindowControlNames.SaveCookiesCheckBox.checked))
            ChimeraMessage.ShowMessage(ChimeraMessageType.Warning, 'your custom settings will be reset after page unload if you disable this option');
    }

    this.takeSnapshot = function () {
        var name = uiManager.getUICreator().getControlValue(SnapshotsManagerWindowControlNames.SnapshotNameTextBox);
        var tmpl = document.getElementById('snapshot-template');

        if (name == "") {
            ChimeraMessage.ShowMessage(ChimeraMessageType.Warning, 'Please input snapshot name');
            return;
        }

        var snapshotsCount = snapshotsManager.getUserSnapshots().length;
        var snapshot = new Snapshot(name, null, true);
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

        document.getElementById(NameList.SnapshotsManagerContainer).appendChild(tmpl.content.cloneNode(true));
        uiManager.getUICreator().setControlValue(SnapshotsManagerWindowControlNames.SnapshotNameTextBox, "");
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
        var particles = snapshotsManager.getSnapshot(name);
    }

    this.removeSnapshot = function () {
        var name = getNameFromTarget(event.currentTarget);
        snapshotsManager.removeSnapshot(name);

        var g = document.getElementById(NameList.SnapshotsManagerContainer);

        for (var i = 0; i < g.childNodes.length; i++){
            var node = g.childNodes[i];
            if (node.nodeName == "DIV" && getNameFromText(node.innerText) == name){
                g.removeChild(g.childNodes[i]);
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
                    uiManager.getUICreator().setControlValue(NameList.CurrentCutTypeLabel, 'Current Cut type: none');
                    cutProcessor.exit();
                }
                break;
            default:
                break;
        }
    }
}