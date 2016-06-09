var VideoProcessor = function () {
    var processor;
    var currentFrame = 1;
    var pause;
    var end = false;
    var saveVideo = false;
    var images = [];

    function animate() {
        if (pause)
            return;

        processor.build(currentFrame, true);

        if (saveVideo) {
            saveAsImage();
        }

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

    this.init = function (buildProcessor) {
        processor = buildProcessor;
        pause = false;
        end = false;

        if (confirm('Are you want download video in .gif format after video will finished?')) {
            saveVideo = true;
        } else {
            saveVideo = false;
        }
    }

    this.isVideoEnd = function () {
        return end;
    }

    this.isVideoOnPause = function () {
        return pause;
    }

    this.play = function () {
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
        if (!processor.build(currentFrame, true)) {
            ChimeraMessage.ShowMessage(ChimeraMessageType.Warning, ChimeraMessage.LastTimeMomentWarning);
            currentFrame--;
        }
    }

    this.back = function () {
        currentFrame--;
        if (!processor.build(currentFrame, true)) {
            ChimeraMessage.ShowMessage(ChimeraMessageType.Warning, ChimeraMessage.FirstTimeMomentWarning);
            currentFrame++;
        }
    }

    function saveAsImage() {
        var image = processor.takeScreenShot();
        images.push(image);
        saveFile(image.replace("image/jpeg", "image/octet-stream"), "test.jpg");
    }

    var saveFile = function (strData, filename) {
        var link = document.createElement('a');
        if (typeof link.download === 'string') {
            document.body.appendChild(link);
            link.download = filename;
            link.href = strData;
            link.click();
            document.body.removeChild(link);
        } else {
            location.replace(uri);
        }
    }
}