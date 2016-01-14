Options = function () {

};

Options.DefaultNames = [OptionNames.OscillatorsNumber, OptionNames.Opacity, OptionNames.PointSize, OptionNames.CameraPosition,
                            OptionNames.UsingCustomParticles, OptionNames.RotationX, OptionNames.RotationY];
Options.DefaultValues = [OptionSchema.DefaultOscillatorsNumber, OptionSchema.DefaultOpacity, OptionSchema.DefaultPointSize,
                            OptionSchema.DefaultCameraPosition, OptionSchema.DefaultUsingCustomParticles, OptionSchema.DefaultRotationX,
                                OptionSchema.DefaultRotationY];

Options.CustomNames = [];
Options.CustomValues = [];

Options.GetValue = function (name) {
    var index = Options.CustomNames.indexOf(name);

    if (index >= 0)
        return Options.CustomValues[index];

    index = Options.DefaultNames.indexOf(name);
    return Options.DefaultValues[index];
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