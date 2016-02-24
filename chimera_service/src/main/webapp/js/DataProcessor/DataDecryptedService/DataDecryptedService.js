DataDecryptedService = function () {

    this.decryptData = function (data) {
        if (Globals.VisualizationType == 'P') {
            return data.split(',');
        }

        var array = data.split(',');
        alert(array.length);
        var min = array.pop();
        var max = array.pop();
        alert(array.length);
        alert(min);
        alert(max);
        alert(array[0]);
    }
    
};