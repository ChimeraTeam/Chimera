DataDecryptedService = function () {

    this.decryptData = function (data) {
        if (Globals.VisualizationType == 'P') {
            return data.split(',');
        }

        var array = data.split(',');
        var min = array.pop();
        var max = array.pop();
    }
    
};