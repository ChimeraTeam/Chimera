GetDataSocketStrategy = function () {

    var isMessageReady = false;
    var Data = "";
    var socket = new WebSocket("ws://chimera.biomed.kiev.ua:8983/chimera_service/websocket");

    this.GetData = function () {
        init();

        return dataArray(socket, function () {
            var container = document.getElementById("sockerDataTransferContainer");
            var event = container["onchange"];
            container.innerHTML = Data;

            if (typeof (event) == "function") {
                event.call(container);
            }

            return Data;
        });
        
    };;

    function dataArray(socket, callback) {
        setTimeout(
            function () {
                if (isMessageReady) {
                    if (callback !== undefined) {
                        callback();
                    }

                } else {
                    dataArray(socket, callback);
                }
            }, 5);
    }

    function getParameterByName(name)
    {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);

        return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }

    function init()
    {
        var file = getParameterByName('fileName');
        var type = getParameterByName('type');
        postToWServer(file, type);

        Globals.FilePath = file;
        Globals.VisualizationType = type;
    }

    socket.onopen = function () {

    };;

    socket.onmessage = function (message) {
        Data += message.data;
        isMessageReady = true;
    };;

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
};;
