function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
var file;
var type;
function init() {
    alert('init');
    file = getParameterByName('fileName');
    type = getParameterByName('type');
    console.info(file);
    console.info(type);
    postToServer();
}

var ws = new WebSocket("ws://localhost:8080/websocket");
ws.onopen = function () {
};
ws.onmessage = function (message) {
    document.getElementById("chatlog").textContent += message.data + "\n";
};
function postToServer() {
    ws.send(file + '_' + type);
}
function closeConnect() {
    ws.close();
}
window.onbeforeunload = function () {
    ws.close();
};
