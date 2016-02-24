DataDecryptedService = function () {

    this.decryptData = function (data) {
        if (Globals.VisualizationType == 'P') {
            return data.split(',');
        }

        var readyData = [];
        var parser = new FrequencyParser();
        var array = data.split(',');
        array.pop();

        var oneFrameSize = Globals.OscillatorsNumber + 2;
        var count = array.length / oneFrameSize;

        for (var i = 0; i < count; i++) {
            var current = array.slice(i * oneFrameSize, (i + 1) * oneFrameSize);
            var max = current.pop();
            var min = current.pop();
            parser.parse(current, min, max, readyData);
            alert(readyData);
        }

        return readyData;
    }
};