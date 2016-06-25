/**
 * Created by Yurii on 15.01.2016.
 */

var OptionWindowHandlers = function () {
    var controlsContainer = [ControlsNames.OpacityOptionLabel, ControlsNames.OpacityOptionTextBox, ControlsNames.PointSizeOptionLabel,
                                ControlsNames.PointSizeOptionTextBox, ControlsNames.VideoDelayOptionLabel, ControlsNames.VideoDelayOptionTextBox,
                                    ControlsNames.AutoResetRotationZoomLabel, ControlsNames.AutoResetRotationZoomCheckBox, ControlsNames.ApplySettingsButton,
                                        ControlsNames.CancelSettingsButton, ControlsNames.SaveCookiesButton, ControlsNames.SaveCookiesCheckBox,
                                            ControlsNames.WaitAllFramesButton, ControlsNames.WaitAllFramesCheckBox, ControlsNames.AlwaysDownloadVideoButton,
                                                ControlsNames.AlwaysDownloadVideoCheckBox];
    var _uiCreator = new UICreator();

    this.setChildControlsVisibility = function (isVisible) {
        readDefaultValues();
        _uiCreator.setSceneVisibility(controlsContainer, isVisible);
    }
    
    this.applySettings = function () {
        Options.SetValue(OptionNames.Opacity, _uiCreator.getControlValue(ControlsNames.OpacityOptionTextBox));
        Options.SetValue(OptionNames.PointSize, _uiCreator.getControlValue(ControlsNames.PointSizeOptionTextBox));
        Options.SetValue(OptionNames.VideoDelay, _uiCreator.getControlValue(ControlsNames.VideoDelayOptionTextBox));
        Options.SetValue(OptionNames.RotationZoomAutomaticReset, _uiCreator.getCheckBoxCheckedValue(ControlsNames.AutoResetRotationZoomCheckBox));
        Options.SetValue(OptionNames.NeedSaveSettingsToCookies, _uiCreator.getCheckBoxCheckedValue(ControlsNames.SaveCookiesCheckBox));
        Options.SetValue(OptionNames.WaitAllFrames, _uiCreator.getCheckBoxCheckedValue(ControlsNames.WaitAllFramesCheckBox));
        Options.SetValue(OptionNames.AlwaysDownloadVideo, _uiCreator.getCheckBoxCheckedValue(ControlsNames.AlwaysDownloadVideoCheckBox));

        Options.Merge();
    }

    function readDefaultValues(){
        _uiCreator.setControlValue(ControlsNames.OpacityOptionTextBox, Options.GetDefaultValue(OptionNames.Opacity));
        _uiCreator.setControlValue(ControlsNames.PointSizeOptionTextBox, Options.GetDefaultValue(OptionNames.PointSize));
        _uiCreator.setControlValue(ControlsNames.VideoDelayOptionTextBox, Options.GetDefaultValue(OptionNames.VideoDelay));
        _uiCreator.setCheckBoxCheckedValue(ControlsNames.AutoResetRotationZoomCheckBox, Options.GetDefaultBoolValue(OptionNames.RotationZoomAutomaticReset));
        _uiCreator.setCheckBoxCheckedValue(ControlsNames.SaveCookiesCheckBox, Options.GetDefaultBoolValue(OptionNames.NeedSaveSettingsToCookies));
        _uiCreator.setCheckBoxCheckedValue(ControlsNames.WaitAllFramesCheckBox, Options.GetDefaultBoolValue(OptionNames.WaitAllFrames));
        _uiCreator.setCheckBoxCheckedValue(ControlsNames.AlwaysDownloadVideoCheckBox, Options.GetDefaultBoolValue(OptionNames.AlwaysDownloadVideo));
    }
}