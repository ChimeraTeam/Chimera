/**
 * Created by Yurii on 01.06.2016.
 */

var UIUpdater = function () {
}

UIUpdater.update = function (uiManager) {
    var opacity = Options.GetValue(OptionNames.Opacity);
    var pointSize = Options.GetValue(OptionNames.PointSize);
    uiManager.getUICreator().setControlValue(NameList.OpacitySlider, opacity);
    uiManager.getUICreator().setControlValue(NameList.OpacityLabel, Templates.OpacityLabelTemplate + opacity);
    uiManager.getUICreator().setControlValue(NameList.PointSizeSlider, pointSize);
    uiManager.getUICreator().setControlValue(NameList.PointSizeLabel, Templates.PointSizeLabelTemplate + pointSize);
}