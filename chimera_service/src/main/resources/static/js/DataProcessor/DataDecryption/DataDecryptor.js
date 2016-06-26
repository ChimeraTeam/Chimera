﻿var DataDecryptor = function () {

    this.decrypt = function (data) {
        var worker = new LZMAWorker();
        data = worker.extract(data);

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
            parser.parse(current, readyData);
        }

        return readyData;
    }
};