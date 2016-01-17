VideoProcessor = function () {
    var processor;
    var currentFrame = 1;
    var pause;
    var end = false;

    function animate() {
        if (pause)
            return;

        processor.build(currentFrame, true);

        currentFrame++;

        if (currentFrame > Globals.MaxTimeFrame) {
            end = true;
            chimeraManager.videoPause();
            return;
        }

        setTimeout(
            function () {
                requestAnimationFrame(animate);
            }, Options.GetValue(OptionNames.VideoDelay));
    }

    this.init = function (buildProcessor) {
        processor = buildProcessor;
        pause = false;
        end = false;
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
        if (!pause && !end)
            return;

        processor.clearScene();
        currentFrame = 0;
    }

    this.next = function () {
        currentFrame++;
        if (!processor.build(currentFrame, true)) {
            Messaging.ShowMessage(Messaging.Warning, Messaging.LastTimeMomentWarning);
            currentFrame--;
        }
    }

    this.back = function () {
        currentFrame--;
        if (!processor.build(currentFrame, true)) {
            Messaging.ShowMessage(Messaging.Warning, Messaging.FirstTimeMomentWarning);
            currentFrame++;
        }
    }
}