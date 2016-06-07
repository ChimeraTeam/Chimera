/**
 * Created by Yurii on 15.01.2016.
 */

var OptionWindowHandlers = function () {
    var controlsContainer = [NameList.OpacityOptionLabel, NameList.OpacityOptionTextBox, NameList.PointSizeOptionLabel,
                                NameList.PointSizeOptionTextBox, NameList.VideoDelayOptionLabel, NameList.VideoDelayOptionTextBox,
                                    NameList.AutoResetRotationZoomLabel, NameList.AutoResetRotationZoomCheckBox, NameList.ApplySettingsButton,
                                        NameList.CancelSettingsButton, NameList.SaveCookiesButton, NameList.SaveCookiesCheckBox,
                                            NameList.WaitAllFramesButton, NameList.WaitAllFramesCheckBox];
    var _uiCreator = new UICreator();

    this.setChildControlsVisibility = function (isVisible) {
        readDefaultValues();
        _uiCreator.setSceneVisibility(controlsContainer, isVisible);
    }
    
    this.applySettings = function () {
        Options.SetValue(OptionNames.Opacity, _uiCreator.getControlValue(NameList.OpacityOptionTextBox));
        Options.SetValue(OptionNames.PointSize, _uiCreator.getControlValue(NameList.PointSizeOptionTextBox));
        Options.SetValue(OptionNames.VideoDelay, _uiCreator.getControlValue(NameList.VideoDelayOptionTextBox));
        Options.SetValue(OptionNames.RotationZoomAutomaticReset, _uiCreator.getCheckBoxCheckedValue(NameList.AutoResetRotationZoomCheckBox));
        Options.SetValue(OptionNames.NeedSaveSettingsToCookies, _uiCreator.getCheckBoxCheckedValue(NameList.SaveCookiesCheckBox));
        Options.SetValue(OptionNames.WaitAllFrames, _uiCreator.getCheckBoxCheckedValue(NameList.WaitAllFramesCheckBox));

        Options.Merge();
    }

    function readDefaultValues(){
        _uiCreator.setControlValue(NameList.OpacityOptionTextBox, Options.GetDefaultValue(OptionNames.Opacity));
        _uiCreator.setControlValue(NameList.PointSizeOptionTextBox, Options.GetDefaultValue(OptionNames.PointSize));
        _uiCreator.setControlValue(NameList.VideoDelayOptionTextBox, Options.GetDefaultValue(OptionNames.VideoDelay));
        _uiCreator.setCheckBoxCheckedValue(NameList.AutoResetRotationZoomCheckBox, Options.GetDefaultBoolValue(OptionNames.RotationZoomAutomaticReset));
        _uiCreator.setCheckBoxCheckedValue(NameList.SaveCookiesCheckBox, Options.GetDefaultBoolValue(OptionNames.NeedSaveSettingsToCookies));
        _uiCreator.setCheckBoxCheckedValue(NameList.WaitAllFramesCheckBox, Options.GetDefaultBoolValue(OptionNames.WaitAllFrames));
    }
}