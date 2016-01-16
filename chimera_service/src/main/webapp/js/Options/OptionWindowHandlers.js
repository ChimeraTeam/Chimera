/**
 * Created by Yurii on 15.01.2016.
 */

OptionWindowHandlers = function () {
    var controlsContainer = [OptionsWindowControlNames.OpacityOptionLabel, OptionsWindowControlNames.OpacityOptionTextBox, OptionsWindowControlNames.PointSizeOptionLabel,
                                OptionsWindowControlNames.PointSizeOptionTextBox, OptionsWindowControlNames.VideoDelayOptionLabel, OptionsWindowControlNames.VideoDelayOptionTextBox,
                                    OptionsWindowControlNames.AutoResetRotationZoomLabel, OptionsWindowControlNames.AutoResetRotationZoomCheckBox, OptionsWindowControlNames.ApplySettingsButton,
                                        OptionsWindowControlNames.CancelSettingsButton];
    var _uiCreator = new UICreator();

    this.setChildControlsVisibility = function (isVisible) {
        readDefaultValues();
        _uiCreator.setSceneVisibility(controlsContainer, isVisible);
    }
    
    this.applySettings = function () {
        Options.SetValue(OptionNames.Opacity, _uiCreator.getControlValue(OptionsWindowControlNames.OpacityOptionTextBox));
        Options.SetValue(OptionNames.PointSize, _uiCreator.getControlValue(OptionsWindowControlNames.PointSizeOptionTextBox));
        Options.SetValue(OptionNames.VideoDelay, _uiCreator.getControlValue(OptionsWindowControlNames.VideoDelayOptionTextBox));
        Options.SetValue(OptionNames.RotationZoomAutomaticReset, _uiCreator.getCheckBoxCheckedValue(OptionsWindowControlNames.AutoResetRotationZoomCheckBox));

        Options.Merge();
    }

    function readDefaultValues(){
        _uiCreator.setControlValue(OptionsWindowControlNames.OpacityOptionTextBox, Options.GetDefaultValue(OptionNames.Opacity));
        _uiCreator.setControlValue(OptionsWindowControlNames.PointSizeOptionTextBox, Options.GetDefaultValue(OptionNames.PointSize));
        _uiCreator.setControlValue(OptionsWindowControlNames.VideoDelayOptionTextBox, Options.GetDefaultValue(OptionNames.VideoDelay));
        _uiCreator.setCheckBoxCheckedValue(OptionsWindowControlNames.AutoResetRotationZoomCheckBox, Options.GetDefaultValue(OptionNames.RotationZoomAutomaticReset));
    }
}