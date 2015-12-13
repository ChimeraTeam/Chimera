PageGrid = function () {

    this.FramesCountX = 30;
    this.FramesCountY = 40;

    this.FramesArrayX = [];
    this.FramesArrayY = [];

    this.CreateGrid = function (width, height) {
        var frameWidth = width / this.FramesCountX;
        var frameHeight = height / this.FramesCountY;

        for (var i = 0; i < width; i += frameWidth) {
            this.FramesArrayX.push(i);
        }

        for (var i = 0; i < height; i += frameHeight) {
            this.FramesArrayY.push(i);
        }

    }

    this.GetFrameX = function(x) {
        return this.FramesArrayX[x];
    }

    this.GetFrameY = function (y) {
        return this.FramesArrayY[y];
    }
}
