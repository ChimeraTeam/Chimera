var UIManager = function () {
    var _uiCreator = new UICreator();

    var loadingSceneContainer = [ControlsNames.LoadingLabel, ControlsNames.LoadingProgressBar];
    var oneFrameVisualizationSceneContainer = [ControlsNames.TimeMomentsLabel, ControlsNames.SelectTimeMomentTextBox, ControlsNames.BuildFrameButton, ControlsNames.VideoButton,
                                                ControlsNames.SnapshotsManagerButton, ControlsNames.ChangeSettingButton, ControlsNames.AboutButton];
    var additionalFunctionalityContainer = [ControlsNames.CutButton, ControlsNames.OpacitySlider, ControlsNames.OpacityLabel, ControlsNames.PointSizeSlider, ControlsNames.PointSizeLabel,
                                                ControlsNames.ResetButton];
    var videoVisualizationSceneContainer = [ControlsNames.VideoBackButton, ControlsNames.VideoPauseButton, ControlsNames.VideoNextButton, ControlsNames.VideoCloseButton];
    var currentFrameInfoSceneContainer = [ControlsNames.CurrentFrameLabel];
    var cutSceneContainer = [ControlsNames.HorizontalCutButton, ControlsNames.VerticalCutButton, ControlsNames.CloseCutButton, ControlsNames.CurrentCutTypeLabel,
                                ControlsNames.SnapshotsManagerButton, ControlsNames.ChangeSettingButton, ControlsNames.AboutButton];
    var changeSettingsSceneContainer = [ControlsNames.OptionsContainer];
    var snapshotsManagerContainer = [ControlsNames.SnapshotsManagerContainer];
    var downloadVideoContainer = [ControlsNames.DownloadVideo];
    var currentScene = "";

    this.getCurrentScene = function () {
        return currentScene;
    }

    this.loadOneFrameVisualizationScene = function () {
        _uiCreator.setSceneVisibility(oneFrameVisualizationSceneContainer, true);
    }

    this.closeOneFrameVisualizationScene = function() {
        _uiCreator.setSceneVisibility(oneFrameVisualizationSceneContainer, false);
    }

    this.loadAdditionalFunctionalityScene = function () {
        var opacity = Options.GetValue(OptionNames.Opacity);
        var pointSize = Options.GetValue(OptionNames.PointSize);

        _uiCreator.setSceneVisibility(additionalFunctionalityContainer, true);
        document.getElementById(ControlsNames.OpacitySlider).value = opacity;
        document.getElementById(ControlsNames.OpacityLabel).value = 'Opacity: ' + opacity;
        document.getElementById(ControlsNames.PointSizeSlider).value = pointSize;
        document.getElementById(ControlsNames.PointSizeLabel).value = 'Point Size: ' + pointSize;
    }

    this.closeAdditionalFunctionalityScene = function () {
        _uiCreator.setSceneVisibility(additionalFunctionalityContainer, false);
    }

    this.loadVideoVisualizationScene = function () {
        _uiCreator.setSceneVisibility(videoVisualizationSceneContainer, true);
    }

    this.closeVideoVisualizationScene = function () {
        _uiCreator.setSceneVisibility(videoVisualizationSceneContainer, false);
    }

    this.loadCurrentFrameInfoScene = function () {
        _uiCreator.setSceneVisibility(currentFrameInfoSceneContainer, true);
    }

    this.closeCurrentFrameInfoScene = function () {
        _uiCreator.setSceneVisibility(currentFrameInfoSceneContainer, false);
    }

    this.loadDownloadVideoScene = function () {
        _uiCreator.setSceneVisibility(downloadVideoContainer, true);
    }

    this.closeDownloadVideoScene = function () {
        _uiCreator.setSceneVisibility(downloadVideoContainer, false);
    }

    this.loadCutScene = function () {
        _uiCreator.setVisibilityControlProperty(ControlsNames.CutButton, false);
        this.closeOneFrameVisualizationScene();
        this.closeVideoVisualizationScene();
        _uiCreator.setSceneVisibility(cutSceneContainer, true);
        currentScene = "CutScene";
    }

    this.closeCutScene = function () {
        _uiCreator.setVisibilityControlProperty(ControlsNames.CutButton, true);
        _uiCreator.setSceneVisibility(cutSceneContainer, false);
        this.loadOneFrameVisualizationScene();
        currentScene = "";
    }

    this.loadLoadingScene = function (value) {
        _uiCreator.setControlValue(ControlsNames.LoadingLabel, 'Loaded frames: ' + value + ' from ' + Globals.MaxTimeFrame);
        _uiCreator.setControlValue(ControlsNames.LoadingProgressBar, 100 * value / Globals.MaxTimeFrame);
        _uiCreator.setSceneVisibility(loadingSceneContainer, true);
    }

    this.closeLoadingScene = function () {
        _uiCreator.setSceneVisibility(loadingSceneContainer, false);
    }

    this.loadChangeSettingsScene = function () {
        var handlers = new OptionWindowHandlers();
        handlers.setChildControlsVisibility(true);
        _uiCreator.setSceneVisibility(changeSettingsSceneContainer, true);
    }

    this.closeChangeSettingsScene = function () {
        var handlers = new OptionWindowHandlers();
        handlers.setChildControlsVisibility(false);
        _uiCreator.setSceneVisibility(changeSettingsSceneContainer, false);
    }

    this.loadSnapshotsManagerScene = function () {
        var handlers = new SnapshotsManagerWindowHandlers();
        handlers.setChildControlsVisibility(true);
        _uiCreator.setSceneVisibility(snapshotsManagerContainer, true);
    }

    this.closeSnapshotsManagerScene = function () {
        var handlers = new SnapshotsManagerWindowHandlers();
        handlers.setChildControlsVisibility(false);
        _uiCreator.setSceneVisibility(snapshotsManagerContainer, false);
    }

    this.calculatePositions = function (pageGrid) {
        _uiCreator.setPosition(loadingSceneContainer, pageGrid);
        _uiCreator.setPosition(oneFrameVisualizationSceneContainer, pageGrid);
        _uiCreator.setPosition(additionalFunctionalityContainer, pageGrid);
        _uiCreator.setPosition(videoVisualizationSceneContainer, pageGrid);
        _uiCreator.setPosition(currentFrameInfoSceneContainer, pageGrid);
        _uiCreator.setPosition(cutSceneContainer, pageGrid);
        _uiCreator.setPosition(changeSettingsSceneContainer, pageGrid);
        _uiCreator.setPosition(snapshotsManagerContainer, pageGrid);
        _uiCreator.setPosition(downloadVideoContainer, pageGrid);
    }

    this.getUICreator = function () {
        return _uiCreator;
    }
}