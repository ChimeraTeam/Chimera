/**
 * Created by Yurii on 01.06.2016.
 */

var UIUpdater = function () {
}

UIUpdater.update = function (uiManager) {
    var opacity = Options.GetValue(OptionNames.Opacity);
    var pointSize = Options.GetValue(OptionNames.PointSize);
    uiManager.getUICreator().setControlValue(ControlsNames.OpacitySlider, opacity);
    uiManager.getUICreator().setControlValue(ControlsNames.OpacityLabel, Templates.OpacityLabelTemplate + opacity);
    uiManager.getUICreator().setControlValue(ControlsNames.PointSizeSlider, pointSize);
    uiManager.getUICreator().setControlValue(ControlsNames.PointSizeLabel, Templates.PointSizeLabelTemplate + pointSize);
}