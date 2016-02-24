DataDecryptedService = function () {

    this.decryptData = function (data) {
        if (Globals.VisualizationType == 'P') {
            return data.split(',');
        }

        var array = data.split(',');
    }
    
};