SocketDataInspector = function () {
    var Data = "";
    var currentFrame = 0;
    var frames = -1;
    var callback;
    var compress
    var progress;
    var socket = new WebSocket("ws://chimera.biomed.kiev.ua:8983/chimera_service/websocket");
    this.init = function (callbackMethod, showProgressMethod) {
        var file = getParameterByName('fileName');
        var type = getParameterByName('type');
        var strategy = getParameterByName('strategy');
        compress = getParameterByName('compress');
        frames = getParameterByName('frames');
        callback = callbackMethod;
        progress = showProgressMethod;

        if (compress == "") {
            compress = Globals.DefaultCompressValue;
        }

        postToWServer(file, type, compress);

        Globals.FilePath = file;
        Globals.VisualizationType = type;
        Globals.MaxTimeFrame = frames;

        if (strategy != "") {
            Globals.PhaseVisualizationStrategy = strategy;
        }

        if (Options.GetBoolValue(OptionNames.WaitAllFrames)){
            progress(0);
        } else {
            callback();
        }
    }

    this.getType = function (configLine) {
        if (configLine == "P")
            return "Phase";
        if (configLine == "F")
            return "Frequency";
    }

    this.getOscillatorNumber = function (configLine) {
        if (compress == 'M' || compress == 'S')
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

    function getParameterByName(name)
    {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);

        return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }

    socket.onopen = function () {

    }

    socket.onmessage = function (message) {
        currentFrame++;

        if (currentFrame > frames)
            return;

        Data += message.data;

        if (!Options.GetBoolValue(OptionNames.WaitAllFrames)) {
            var container = document.getElementById("sockerDataTransferContainer");
            container.innerHTML = Data;

            var event = container["onchange"];

            if (typeof (event) == "function") {
                event.call(container);
            }

            return;
        }

        progress(currentFrame);

        if (currentFrame == frames) {
            var container = document.getElementById("sockerDataTransferContainer");
            container.innerHTML = Data;
            callback();
        }
    }

    function waitForSocketConnection(socket, callback) {
        setTimeout(
            function () {
                if (socket.readyState === 1) {
                    if (callback !== undefined) {
                        callback();
                    }

                } else {
                    waitForSocketConnection(socket, callback);
                }
            }, 5);
    }

    function sendMessage(msg) {
        waitForSocketConnection(socket, function () {
            socket.send(msg);
        });
    }

    function postToWServer(file, type, compress) {
        sendMessage(file + '_' + type + '_' + compress);
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", "http://chimera.biomed.kiev.ua:8983/chimera_service/stat", true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send();
    }

    function closeConnect() {
        socket.close();
    }

    window.onbeforeunload = function () {
        closeConnect();
    }
}
