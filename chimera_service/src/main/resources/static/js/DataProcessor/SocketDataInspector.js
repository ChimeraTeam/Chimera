SocketDataInspector = function () {
    var data = "";
    var currentFrame = 0;
    var info = null;

    var socket = new WebSocket("ws://chimera.biomed.kiev.ua:8983/chimera_service/websocket");
    this.init = function (dataProcessorInfo) {
        info = dataProcessorInfo;
        postToWServer(info.file, info.type, info.compress);

        if (Options.GetBoolValue(OptionNames.WaitAllFrames)){
            info.showProgressMethod(0);
        } else {
            info.callbackMethod();
        }
    }

    function postToWServer(file, type, compress) {
        sendMessage(file + '_' + type + '_' + compress);
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", "http://chimera.biomed.kiev.ua:8983/chimera_service/stat", true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send();
    }

    this.getData = function () {
        return data;
    }

    socket.onopen = function () {

    }

    socket.onmessage = function (message) {
        currentFrame++;

        if (currentFrame > info.frames)
            return;

        data += message.data;

        if (!Options.GetBoolValue(OptionNames.WaitAllFrames)) {
            var container = document.getElementById("sockerDataTransferContainer");
            container.innerHTML = data;

            var event = container["onchange"];

            if (typeof (event) == "function") {
                event.call(container);
            }

            return;
        }

        info.showProgressMethod(currentFrame);

        if (currentFrame == info.frames) {
            var container = document.getElementById("sockerDataTransferContainer");
            if (container != null) {
                container.innerHTML = data;
            }

            info.callbackMethod();
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

    function closeConnect() {
        socket.close();
    }

    window.onbeforeunload = function () {
        closeConnect();
    }
}
