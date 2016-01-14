﻿SocketDataInspector = function () {

    var Data = "";
    var currentFrame = 0;
    var frames = -1;
    var callback;
    var progress;
    var socket = new WebSocket("ws://chimera.biomed.kiev.ua:8983/chimera_service/websocket");
    this.init = function (callbackMethod, showProgressMethod) {
        var file = getParameterByName('fileName');
        var type = getParameterByName('type');
        frames = getParameterByName('frames');
        callback = callbackMethod;
        progress = showProgressMethod;

        postToWServer(file, type);

        Globals.FilePath = file;
        Globals.VisualizationType = type;
        Globals.MaxTimeFrame = frames;

        progress(0);
    }

    this.getType = function (configLine) {
        if (configLine == "P")
            return "Phase";
        if (configLine == "F")
            return "Frequency";
    }

    this.getOscillatorNumber = function (configLine) {
        if (configLine.indexOf("100x100x100") > -1) 
            return Globals.MediumOsillatorsCount;
        else if (configLine.indexOf("200x200x200") > -1)
            return Globals.LargeOsillatorsCount;
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

    function postToWServer(file, type) {
        sendMessage(file + '_' + type);
    }

    function closeConnect() {
        socket.close();
    }

    window.onbeforeunload = function () {
        closeConnect();
    }
}
