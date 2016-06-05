var VideoProcessor = function (buildProcessor) {
    var processor = buildProcessor;
    var currentFrame = 1;
    var pause = false;
    var end = false;

    function animate() {
        if (pause)
            return;

        processor.process(currentFrame, true);

        currentFrame++;

        if (currentFrame > Globals.MaxTimeFrame) {
            end = true;
            chimeraManager.videoPause();
            currentFrame--;
            return;
        }

        setTimeout(
            function () {
                requestAnimationFrame(animate);
            }, Options.GetValue(OptionNames.VideoDelay));
    }

    this.isVideoEnd = function () {
        return end;
    }

    this.isVideoOnPause = function () {
        return pause;
    }

    this.play = function () {
        timeMoment = 0;
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
        processor.clearScene();
        currentFrame = 0;
    }

    this.next = function () {
        currentFrame++;
        if (!processor.process(currentFrame, true)) {
            ChimeraMessage.ShowMessage(ChimeraMessageType.Warning, ChimeraMessage.LastTimeMomentWarning);
            currentFrame--;
        }
    }

    this.back = function () {
        currentFrame--;
        if (!processor.process(currentFrame, true)) {
            ChimeraMessage.ShowMessage(ChimeraMessageType.Warning, ChimeraMessage.FirstTimeMomentWarning);
            currentFrame++;
        }
    }
}