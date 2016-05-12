/**
 * Created by Yurii Koval on 5/12/2016.
 */

var DataProcessor = function () {
    var info;

    this.process = function (callback, showProgress) {
        var inspector = new SocketDataInspector();
        info =
        {
            file: getParameterByName('fileName'),
            type: getParameterByName('type'),
            strategy: getParameterByName('strategy'),
            compress: getParameterByName('compress'),
            frames: getParameterByName('frames'),
            callbackMethod: callback,
            showProgressMethod: showProgress
        }

        if (info.compress == "") {
            info.compress = Globals.DefaultCompressValue;
        }

        Globals.FilePath = info.file;
        Globals.VisualizationType = info.type;
        Globals.MaxTimeFrame = info.frames;

        inspector.init(info);

        if (info.strategy != "") {
            Globals.PhaseVisualizationStrategy = info.strategy;
        }

    }

    function getParameterByName(name)
    {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);

        return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }

    this.getType = function (configLine) {
        if (configLine == "P")
            return "Phase";
        if (configLine == "F")
            return "Frequency";
    }

    this.getOscillatorNumber = function (configLine) {
        if (info.compress == 'M' || info.compress == 'S')
            return Globals.SmallOsillatorsCount;
        else if (configLine.indexOf("100x100x100") > -1)
            return Globals.MediumOsillatorsCount;
        else if (configLine.indexOf("200x200x200") > -1)
            return Globals.LargeOsillatorsCount;
        else if (configLine.indexOf("400x400x400") > -1)
            return Globals.VeryLargeOsillatorsCount;
        else
            return Options.GetValue(OptionNames.OscillatorsNumber);
    }
}