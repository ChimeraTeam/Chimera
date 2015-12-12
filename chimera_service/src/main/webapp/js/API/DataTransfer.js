DataTransfer = function () {

    this.SendData = function (data) {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("POST", "js/API/json-handler.php");
        xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

        xmlhttp.send(JSON.stringify(data));
    }

}