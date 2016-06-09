var VideoProcessor = function () {
    var processor;
    var currentFrame = 1;
    var pause;
    var end = false;
    var saveVideo = false;
    var images = [];
    var gifDelay;

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
            createGifAndDownload();
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
            gifDelay = Options.GetValue(OptionNames.VideoDelay) / 1000 + 0.1;
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
    }

    function createGifAndDownload() {
        gifshot.createGIF({
            'images': images,
            'gifWidth': processor.getWebGLContainerWidth(),
            'gifHeight': processor.getWebGLContainerHeight(),
            'interval': gifDelay
        },function(obj) {
            if(!obj.error) {
                var delay = Options.GetValue(OptionNames.VideoDelay);
                var image = obj.image,
                    animatedImage = document.createElement('a');
                animatedImage.src = image;
                document.body.appendChild(animatedImage);
                animatedImage.download = "test.gif";
                animatedImage.href = image;
                animatedImage.click();
                document.body.removeChild(animatedImage);
            }
        });
    }
}