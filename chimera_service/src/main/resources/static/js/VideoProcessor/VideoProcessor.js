﻿var VideoProcessor = function () {
    var processor;
    var currentFrame = 1;
    var pause;
    var end = false;
    var images = [];
    var gifDelay;

    function animate() {
        if (pause)
            return;

        processor.process(new BuildOptions(null, null, null, currentFrame, true));

        saveAsImage();

        currentFrame++;

        if (currentFrame > Globals.MaxTimeFrame) {
            end = true;
            chimeraManager.videoPause();
            currentFrame--;
            if (Options.GetBoolValue(OptionNames.AlwaysDownloadVideo)) {
                createGifAndDownload();
            } else {
                chimeraManager.getUIManager().loadDownloadVideoScene();
            }
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
        chimeraManager.getUIManager().closeDownloadVideoScene();
        processor.clearScene();
        currentFrame = 0;
    }

    this.next = function () {
        currentFrame++;
        if (!processor.process(new BuildOptions(null, null, null, currentFrame, true))) {
            ChimeraMessage.showMessage(ChimeraMessageType.Warning, ChimeraMessage.LastTimeMomentWarning);
            currentFrame--;
        }
    }

    this.back = function () {
        currentFrame--;
        if (!processor.process(new BuildOptions(null, null, null, currentFrame, true))) {
            ChimeraMessage.showMessage(ChimeraMessageType.Warning, ChimeraMessage.FirstTimeMomentWarning);
            currentFrame++;
        }
    }

    this.downloadVideo = function () {
        createGifAndDownload();
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