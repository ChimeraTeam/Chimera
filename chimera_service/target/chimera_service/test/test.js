function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
function init() {
    var file = getParameterByName('fileName');
    var type = getParameterByName('type');
    alert(file);
    postToServer(file, type);
}

var ws = new WebSocket("ws://localhost:8080/chimera_service/websocket");
ws.onopen = function () {
};
ws.onmessage = function (message) {
    document.getElementById("chatlog").textContent += message.data + "\n";
};
function postToServer(file, type) {
    ws.send(file + '_' + type);
}
function closeConnect() {
    ws.close();
}
window.onbeforeunload = function () {
    closeConnect();
};
