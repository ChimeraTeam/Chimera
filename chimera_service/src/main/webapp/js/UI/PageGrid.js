PageGrid = function () {
    var framesCountX = 30;
    var framesCountY = 40;

    var framesArrayX = [];
    var framesArrayY = [];

    this.createGrid = function (width, height) {
        var frameWidth = width / framesCountX;
        var frameHeight = height / framesCountY;

        for (var i = 0; i < width; i += frameWidth) {
            framesArrayX.push(i);
        }

        for (var i = 0; i < height; i += frameHeight) {
            framesArrayY.push(i);
        }
    }

    this.getCell = function(x, y) {
        return {
            x: framesArrayX[x],
            y: framesArrayY[y]
        };
    }
};
