VideoProcessor = function (strategy) {
    var processor;
    var currentFrame;

    this.init = function (buildProcessor) {
        processor = buildProcessor;
        processor.clearScene();
    }

    this.play = function (data) {
        for (var i = 0; i < Globals.MaxTimeFrame; i++) {
            currentFrame = i + 1;
            processor.build(data, currentFrame);
        }
    }

    this.close = function () {
        processor.clearScene();
        processor = null;
        currentFrame = 0;
    }
};;