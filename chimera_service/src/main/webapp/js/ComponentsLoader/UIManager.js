UIManager = function () {
    var _uiCreator = new UICreator();

    var loadingSceneContainer = [NameList.LoadingLabel, NameList.LoadingProgressBar];
    var oneFrameVisualizationSceneContainer = [NameList.TimeMomentsLabel, NameList.SelectTimeMomentTextBox, NameList.BuildFrameButton, NameList.VideoButton];
    var additionalFunctionalityContainer = [NameList.CutButton, NameList.OpacitySlider, NameList.OpacityLabel, NameList.PointSizeSlider, NameList.PointSizeLabel];
    var videoVisualizationSceneContainer = [NameList.VideoBack, NameList.VideoPause, NameList.VideoNext, NameList.VideoClose];
    var currentFrameInfoSceneContainer = [NameList.CurrentFrameLabel];
    var cutSceneContainer = [NameList.HorizontalCut, NameList.VerticalCut, NameList.CloseCut, NameList.CurrentCutType];
    var currentScene = "";

    this.getCurrentScene = function () {
        return currentScene;
    }

    this.loadOneFrameVisualizationScene = function () {
        _uiCreator.SetSceneVisibility(oneFrameVisualizationSceneContainer, true);
    }

    this.closeOneFrameVisualizationScene = function() {
        _uiCreator.SetSceneVisibility(oneFrameVisualizationSceneContainer, false);
    }

    this.loadAdditionalFunctionalityScene = function () {
        _uiCreator.SetSceneVisibility(additionalFunctionalityContainer, true);
        document.getElementById(NameList.OpacitySlider).value = Options.DefaultOpacity;
        document.getElementById(NameList.OpacityLabel).value = 'Opacity: ' + Options.DefaultOpacity;
        document.getElementById(NameList.PointSizeSlider).value = Options.DefaultPointSize;
        document.getElementById(NameList.PointSizeLabel).value = 'Point Size: ' + Options.DefaultPointSize;
    }

    this.closeAdditionalFunctionalityScene = function () {
        _uiCreator.SetSceneVisibility(additionalFunctionalityContainer, false);
    }

    this.loadVideoVisualizationScene = function () {
        _uiCreator.SetSceneVisibility(videoVisualizationSceneContainer, true);
    }

    this.closeVideoVisualizationScene = function () {
        _uiCreator.SetSceneVisibility(videoVisualizationSceneContainer, false);
    }

    this.loadCurrentFrameInfoScene = function () {
        _uiCreator.SetSceneVisibility(currentFrameInfoSceneContainer, true);
    }

    this.closeCurrentFrameInfoScene = function () {
        _uiCreator.SetSceneVisibility(currentFrameInfoSceneContainer, false);
    }

    this.loadCutScene = function () {
        _uiCreator.SetVisibilityControlProperty(NameList.CutButton, false);
        _uiCreator.SetSceneVisibility(cutSceneContainer, true);
        this.closeOneFrameVisualizationScene();
        this.closeVideoVisualizationScene();
        currentScene = "CutScene";
    }

    this.closeCutScene = function () {
        _uiCreator.SetVisibilityControlProperty(NameList.CutButton, true);
        _uiCreator.SetSceneVisibility(cutSceneContainer, false);
        this.loadOneFrameVisualizationScene();
        currentScene = "";
    }

    this.loadLoadingScene = function (value) {
        _uiCreator.SetControlValue(NameList.LoadingLabel, 'Loaded frames: ' + value + ' from ' + Globals.MaxTimeFrame);
        _uiCreator.SetControlValue(NameList.LoadingProgressBar, 100 * value / Globals.MaxTimeFrame);
        _uiCreator.SetSceneVisibility(loadingSceneContainer, true);
    }

    this.closeLoadingScene = function () {
        _uiCreator.SetSceneVisibility(loadingSceneContainer, false);
    }

    this.calculatePositions = function (pageGrid) {
        _uiCreator.SetPosition(loadingSceneContainer, pageGrid);
        _uiCreator.SetPosition(oneFrameVisualizationSceneContainer, pageGrid);
        _uiCreator.SetPosition(additionalFunctionalityContainer, pageGrid);
        _uiCreator.SetPosition(videoVisualizationSceneContainer, pageGrid);
        _uiCreator.SetPosition(currentFrameInfoSceneContainer, pageGrid);
        _uiCreator.SetPosition(cutSceneContainer, pageGrid);
    }

    this.getUICreator = function () {
        return _uiCreator;
    }
}