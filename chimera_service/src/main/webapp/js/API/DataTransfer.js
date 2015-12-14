DataTransfer = function () {

    this.SendData = function (data, url) {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("POST", url);
        xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

        xmlhttp.send(JSON.stringify(data));
    }

}