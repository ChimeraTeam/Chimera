RGB = function () {
    var colorsCount = 5;

    this.colors = new Array(colorsCount);

    for (var i = 0; i < 10; i++) {
        this.colors[i] = new Array(3);
    }

    //ffffff
    this.colors[0][0] = 255;
    this.colors[0][1] = 255;
    this.colors[0][2] = 255;

    //00ff00
    this.colors[1][0] = 0;
    this.colors[1][1] = 255;
    this.colors[1][2] = 0;

    //ff40ff
    this.colors[2][0] = 255;
    this.colors[2][1] = 64;
    this.colors[2][2] = 255;

    //ff0000
    this.colors[3][0] = 255;
    this.colors[3][1] = 0;
    this.colors[3][2] = 0;

    //000000
    this.colors[4][0] = 0;
    this.colors[4][1] = 0;
    this.colors[4][2] = 0;

    this.GetColorsCount = function () {
        return this.colorsCount;
    }

    this.GetR = function (index) {
        return this.colors[index][0];
    }

    this.GetG = function (index) {
        return this.colors[index][1];
    }

    this.GetB = function (index) {
        return this.colors[index][2];
    }
}