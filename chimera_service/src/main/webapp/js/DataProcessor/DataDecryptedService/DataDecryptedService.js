DataDecryptedService = function () {

    this.decryptData = function (data) {
        if (Globals.VisualizationType == 'P') {
            return data.split(',');
        }

        var array = data.split(',');
        var unused = array.pop();
        var max = array.pop();
        var min = array.pop();
        alert(unused +',' + min +',' + max);
    }
};