Options = function () {

};

Options.DefaultNames = [OptionNames.OscillatorsNumber, OptionNames.Opacity, OptionNames.PointSize, OptionNames.CameraPosition,
                            OptionNames.UsingCustomParticles, OptionNames.RotationX, OptionNames.RotationY, OptionNames.VideoDelay,
                                OptionNames.RotationZoomAutomaticReset, OptionNames.NeedSaveSettingsToCookies, OptionNames.WaitAllFrames];
Options.DefaultValues = [OptionSchema.DefaultOscillatorsNumber, OptionSchema.DefaultOpacity, OptionSchema.DefaultPointSize,
                            OptionSchema.DefaultCameraPosition, OptionSchema.DefaultUsingCustomParticles, OptionSchema.DefaultRotationX,
                                OptionSchema.DefaultRotationY, OptionSchema.DefaultVideoDelay, OptionSchema.DefaultRotationZoomAutomaticReset, OptionSchema.DefaultNeedSaveSettingsToCookies,
                                    OptionSchema.DefaultWaitAllFrames];

Options.CanSaveToCookies = [OptionNames.Opacity, OptionNames.PointSize, OptionNames.VideoDelay, OptionNames.RotationZoomAutomaticReset, OptionNames.WaitAllFrames];

Options.CustomNames = [];
Options.CustomValues = [];

Options.Merge = function () {
    for (var i = 0; i < Options.CustomNames.length; i++) {
        var index = Options.DefaultNames.indexOf(Options.CustomNames[i]);

        if (index >= 0) {
            Options.DefaultValues[index] = Options.CustomValues[i];
        }
    }

    Options.Reset();
}

Options.Save = function () {
    var cookies = new Cookies();

    for (var i = 0; i < Options.DefaultNames.length; i++){
        var name = Options.DefaultNames[i];
        var j = Options.CanSaveToCookies.indexOf(name);

        if (j >= 0) {
            cookies.setCookie(name, Options.DefaultValues[i]);
        }
    }
}

Options.CleanCookies = function () {
    var cookies = new Cookies();

    for (var i = 0; i < Options.DefaultNames.length; i++){
        cookies.eraseCookie(Options.DefaultNames[i]);
    }
}

Options.TryGetSettingsFromCookies = function () {
    var cookies = new Cookies();

    for (var i = 0; i < Options.DefaultNames.length; i++){
        var name = Options.DefaultNames[i];
        var value = cookies.getCookie(name);

        if (value != ""){
            Options.SetValue(name, value);
        }
    }

    if (Options.CustomNames.length > 0){
        Options.Merge();
    }
}

Options.GetDefaultValue = function (name) {
    var index = Options.DefaultNames.indexOf(name);
    return Options.DefaultValues[index];
};

Options.GetDefaultBoolValue = function (name) {
    var index = Options.DefaultNames.indexOf(name);
    var stringValue = Options.DefaultValues[index];

    if (stringValue === 'true') {
        return true;
    } else if (stringValue === 'false') {
        return false;
    } else {
        return stringValue;
    }
};

Options.GetValue = function (name) {
    var index = Options.CustomNames.indexOf(name);

    if (index >= 0)
        return Options.CustomValues[index];

    index = Options.DefaultNames.indexOf(name);
    return Options.DefaultValues[index];
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
    var customValueIndex = Options.CustomNames.indexOf(name);
    var defaultValueIndex = Options.DefaultNames.indexOf(name);

    var valueIsDefault = value == Options.DefaultValues[defaultValueIndex];

    if (customValueIndex < 0 && !valueIsDefault) {
        Options.CustomNames.push(name);
        Options.CustomValues.push(value);
        return;
    }
    else if (customValueIndex < 0 && valueIsDefault) {
        return;
    }
    else if (customValueIndex >= 0 && valueIsDefault){
        Options.CustomNames.splice(customValueIndex);
        Options.CustomValues.splice(customValueIndex);
        return;
    }

    Options.CustomValues[customValueIndex] = value;
};

Options.Reset = function () {
    Options.CustomNames = [];
    Options.CustomValues = [];
};

/**
 * @return {boolean}
 */
Options.IsDirty = function () {
    return Options.CustomValues.length != 0;
}