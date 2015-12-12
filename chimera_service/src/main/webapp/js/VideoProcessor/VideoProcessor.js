VideoProcessor = function () {
    var processor;
    var currentFrame = 0;
    var chimeraData;

    function delay() {
        setTimeout(function () {
        }, 1000);
    }

    function animate() {
        currentFrame++;
        if (currentFrame > Globals.MaxTimeFrame) return;
        processor.build(chimeraData, currentFrame, true);
        requestAnimationFrame(animate);
    }

    this.init = function (buildProcessor) {
        processor = buildProcessor;
    }

    this.play = function (data) {
        timeMoment = 0;
        chimeraData = data;
        animate();
    }

    this.close = function () {
        processor.clearScene();
        currentFrame = 0;
        chimeraData = [];
    }
}