UIManager = function () {
    var _uiCreator = new UICreator();

    var loadingSceneContainer = [NameList.LoadingLabel, NameList.LoadingProgressBar];
    var oneFrameVisualizationSceneContainer = [NameList.TimeMomentsLabel, NameList.SelectTimeMomentTextBox, NameList.BuildFrameButton, NameList.VideoButton];
    var additionalFunctionalityContainer = [NameList.CutButton, NameList.OpacitySlider, NameList.OpacityLabel, NameList.PointSizeSlider, NameList.PointSizeLabel,
                                                NameList.Reset];
    var videoVisualizationSceneContainer = [NameList.VideoBack, NameList.VideoPause, NameList.VideoNext, NameList.VideoClose];
    var currentFrameInfoSceneContainer = [NameList.CurrentFrameLabel];
    var cutSceneContainer = [NameList.HorizontalCut, NameList.VerticalCut, NameList.CloseCut, NameList.CurrentCutType];
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
        document.getElementById(NameList.OpacitySlider).value = opacity;
        document.getElementById(NameList.OpacityLabel).value = 'Opacity: ' + opacity;
        document.getElementById(NameList.PointSizeSlider).value = pointSize;
        document.getElementById(NameList.PointSizeLabel).value = 'Point Size: ' + pointSize;
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

    this.loadCutScene = function () {
        _uiCreator.setVisibilityControlProperty(NameList.CutButton, false);
        _uiCreator.setSceneVisibility(cutSceneContainer, true);
        this.closeOneFrameVisualizationScene();
        this.closeVideoVisualizationScene();
        currentScene = "CutScene";
    }

    this.closeCutScene = function () {
        _uiCreator.setVisibilityControlProperty(NameList.CutButton, true);
        _uiCreator.setSceneVisibility(cutSceneContainer, false);
        this.loadOneFrameVisualizationScene();
        currentScene = "";
    }

    this.loadLoadingScene = function (value) {
        _uiCreator.setControlValue(NameList.LoadingLabel, 'Loaded frames: ' + value + ' from ' + Globals.MaxTimeFrame);
        _uiCreator.setControlValue(NameList.LoadingProgressBar, 100 * value / Globals.MaxTimeFrame);
        _uiCreator.setSceneVisibility(loadingSceneContainer, true);
    }

    this.closeLoadingScene = function () {
        _uiCreator.setSceneVisibility(loadingSceneContainer, false);
    }

    this.calculatePositions = function (pageGrid) {
        _uiCreator.setPosition(loadingSceneContainer, pageGrid);
        _uiCreator.setPosition(oneFrameVisualizationSceneContainer, pageGrid);
        _uiCreator.setPosition(additionalFunctionalityContainer, pageGrid);
        _uiCreator.setPosition(videoVisualizationSceneContainer, pageGrid);
        _uiCreator.setPosition(currentFrameInfoSceneContainer, pageGrid);
        _uiCreator.setPosition(cutSceneContainer, pageGrid);
    }

    this.getUICreator = function () {
        return _uiCreator;
    }
}