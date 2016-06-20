Options = function () {

};

var DefaultNames = [OptionNames.OscillatorsNumber, OptionNames.Opacity, OptionNames.PointSize, OptionNames.CameraPosition,
                            OptionNames.UsingCustomParticles, OptionNames.RotationX, OptionNames.RotationY, OptionNames.VideoDelay,
                                OptionNames.RotationZoomAutomaticReset, OptionNames.NeedSaveSettingsToCookies, OptionNames.WaitAllFrames,
                                    OptionNames.AlwaysDownloadVideo];
var DefaultValues = [OptionSchema.DefaultOscillatorsNumber, OptionSchema.DefaultOpacity, OptionSchema.DefaultPointSize,
                            OptionSchema.DefaultCameraPosition, OptionSchema.DefaultUsingCustomParticles, OptionSchema.DefaultRotationX,
                                OptionSchema.DefaultRotationY, OptionSchema.DefaultVideoDelay, OptionSchema.DefaultRotationZoomAutomaticReset, OptionSchema.DefaultNeedSaveSettingsToCookies,
                                    OptionSchema.DefaultWaitAllFrames, OptionSchema.DefaultAlwaysDownloadVideo];

var CanSaveToCookiesNames = [OptionNames.Opacity, OptionNames.PointSize, OptionNames.VideoDelay, OptionNames.RotationZoomAutomaticReset, OptionNames.WaitAllFrames,
                                OptionNames.AlwaysDownloadVideo];

var CustomNames = [];
var CustomValues = [];

Options.Merge = function () {
    for (var i = 0; i < CustomNames.length; i++) {
        var index = DefaultNames.indexOf(CustomNames[i]);

        if (index >= 0) {
            DefaultValues[index] = CustomValues[i];
        }
    }

    Options.ResetButton();
}

Options.Save = function () {
    var cookies = new Cookies();

    for (var i = 0; i < DefaultNames.length; i++){
        var name = DefaultNames[i];
        var j = CanSaveToCookiesNames.indexOf(name);

        if (j >= 0) {
            cookies.setCookie(name, DefaultValues[i]);
        }
    }
}

Options.CleanCookies = function () {
    var cookies = new Cookies();

    for (var i = 0; i < DefaultNames.length; i++){
        cookies.eraseCookie(DefaultNames[i]);
    }
}

Options.TryGetSettingsFromCookies = function () {
    var cookies = new Cookies();

    for (var i = 0; i < CanSaveToCookiesNames.length; i++){
        var name = CanSaveToCookiesNames[i];
        var value = cookies.getCookie(name);

        if (value != ""){
            Options.SetValue(name, value);
        }
    }

    if (CustomNames.length > 0){
        Options.Merge();
    }
}

Options.GetDefaultValue = function (name) {
    var index = DefaultNames.indexOf(name);
    return DefaultValues[index];
};

Options.GetDefaultBoolValue = function (name) {
    var index = DefaultNames.indexOf(name);
    var stringValue = DefaultValues[index];

    if (stringValue === 'true') {
        return true;
    } else if (stringValue === 'false') {
        return false;
    } else {
        return stringValue;
    }
};

Options.GetValue = function (name) {
    var index = CustomNames.indexOf(name);

    if (index >= 0)
        return CustomValues[index];

    index = DefaultNames.indexOf(name);
    return DefaultValues[index];
};

Options.GetBoolValue = function(name) {
    var stringValue = Options.GetValue(name);

    if (stringValue === 'true') {
        return true;
    } else if (stringValue === 'false') {
        return false;
    } else {
        return stringValue;
    }
};

Options.SetValue = function (name, value) {
    var customValueIndex = CustomNames.indexOf(name);
    var defaultValueIndex = DefaultNames.indexOf(name);

    var valueIsDefault = value == DefaultValues[defaultValueIndex];

    if (customValueIndex < 0 && !valueIsDefault) {
        CustomNames.push(name);
        CustomValues.push(value);
        return;
    }
    else if (customValueIndex < 0 && valueIsDefault) {
        return;
    }
    else if (customValueIndex >= 0 && valueIsDefault){
        CustomNames.splice(customValueIndex);
        CustomValues.splice(customValueIndex);
        return;
    }

    CustomValues[customValueIndex] = value;
};

Options.ResetButton = function () {
    CustomNames = [];
    CustomValues = [];
};

/**
 * @return {boolean}
 */
Options.IsDirty = function () {
    return CustomValues.length != 0;
}