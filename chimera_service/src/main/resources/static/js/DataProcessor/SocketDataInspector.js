SocketDataInspector = function () {
    var data = "";
    var currentFrame = 0;
    var info = null;
    var waitAllFrames = true;

    var socket = new WebSocket(Globals.WebSocketUrl);
    this.init = function (dataProcessorInfo) {
        info = dataProcessorInfo;
        waitAllFrames = Options.GetBoolValue(OptionNames.WaitAllFrames);
        postToWServer(info.file, info.type, info.compress, info.frames);

        if (waitAllFrames){
            info.showProgressMethod(0);
        } else {
            info.callbackMethod();
        }
    }

    function postToWServer(file, type, compress, frames) {
        sendMessage(file + '_' + type + '_' + compress + '_' + frames);
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", Globals.StatUrl, true);
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

        if (currentFrame > info.frames) {
            return;
        }

        if (message.data.charAt(0) == 'c') {
            waitAllFrames = false;
            info.callbackMethod();
            data += message.data.substr(1, message.data.length - 1);
        } else {
            data += message.data;
        }

        if (!waitAllFrames) {
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
