function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
function init() {
    var file = getParameterByName('fileName');
    var type = getParameterByName('type');
    postToServer(file, type);
}

//var ws = new WebSocket("ws://localhost:8080/chimera_service/websocket");
var ws = new WebSocket("ws://chimera.biomed.kiev.ua:8983/chimera_service/websocket");
ws.onopen = function () {
};
ws.onmessage = function (message) {
    document.getElementById("chatlog").textContent += message.data + "\n";
};

function sendMessage(msg) {
    waitForSocketConnection(ws, function () {
        ws.send(msg);
    });
}

function postToServer(file, type) {
    sendMessage(file + '_' + type);
}
function closeConnect() {
    ws.close();
}
window.onbeforeunload = function () {
    closeConnect();
};

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
