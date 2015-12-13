VideoProcessor = function () {
    var processor;
    var currentFrame = 0;
    var chimeraData;
    var pause;
    var end = false;

    function delay() {
        setTimeout(function () {
        }, 1000);
    }

    function animate() {
        if (pause)
            return;

        currentFrame++;

        if (currentFrame > Globals.MaxTimeFrame) {
            end = true;
            videoPause();
            return;
        }

        processor.build(chimeraData, currentFrame, true);

        requestAnimationFrame(animate);
    }

    this.init = function (buildProcessor) {
        processor = buildProcessor;
        pause = false;
        end = false;
    }

    this.play = function (data) {
        timeMoment = 0;
        chimeraData = data;
        animate();
    }

    this.pause = function () {
        pause = true;
    }

    this.resume = function() {
        pause = false;
        animate();
    }

    this.close = function () {
        if (!pause && !end)
            return;

        processor.clearScene();
        currentFrame = 0;
        chimeraData = [];
    }

    this.next = function () {
        currentFrame++;
        if (!processor.build(chimeraData, currentFrame, true))
            currentFrame--;
    }

    this.back = function () {
        currentFrame--;
        if (!processor.build(chimeraData, currentFrame, true))
            currentFrame++;
    }
}