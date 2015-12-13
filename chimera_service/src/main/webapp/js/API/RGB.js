RGB = function () {
    var colorsCount = 17;

    this.colors = new Array(colorsCount);

    for (var i = 0; i < colorsCount; i++) {
        this.colors[i] = new Array(3);
    }

    //ffffff
    this.colors[0][0] = 255;
    this.colors[0][1] = 255;
    this.colors[0][2] = 255;

    //ffffcc
    this.colors[1][0] = 255;
    this.colors[1][1] = 255;
    this.colors[1][2] = 204;

    //ffff99
    this.colors[2][0] = 255;
    this.colors[2][1] = 204;
    this.colors[2][2] = 153;

    //ffff66
    this.colors[3][0] = 255;
    this.colors[3][1] = 255;
    this.colors[3][2] = 102;

    //ffff33
    this.colors[4][0] = 255;
    this.colors[4][1] = 255;
    this.colors[4][2] = 51;

    //ffff00
    this.colors[5][0] = 255;
    this.colors[5][1] = 255;
    this.colors[5][2] = 0;

    //99ff99
    this.colors[6][0] = 153;
    this.colors[6][1] = 255;
    this.colors[6][2] = 153;

    //66ff66
    this.colors[7][0] = 102;
    this.colors[7][1] = 255;
    this.colors[7][2] = 102;

    //33ff33
    this.colors[8][0] = 51;
    this.colors[8][1] = 255;
    this.colors[8][2] = 51;

    //00ff00
    this.colors[9][0] = 0;
    this.colors[9][1] = 255;
    this.colors[9][2] = 0;

    //ff6666
    this.colors[10][0] = 255;
    this.colors[10][1] = 102;
    this.colors[10][2] = 102;

    //ff3333
    this.colors[11][0] = 255;
    this.colors[11][1] = 51;
    this.colors[11][2] = 51;

    //ff0000
    this.colors[12][0] = 255;
    this.colors[12][1] = 0;
    this.colors[12][2] = 0;

    //3333ff
    this.colors[13][0] = 51;
    this.colors[13][1] = 51;
    this.colors[13][2] = 255;

    //0000ff
    this.colors[14][0] = 0;
    this.colors[14][1] = 0;
    this.colors[14][2] = 255;

    //404040
    this.colors[15][0] = 64;
    this.colors[15][1] = 64;
    this.colors[15][2] = 64;

    //000000
    this.colors[16][0] = 0;
    this.colors[16][1] = 0;
    this.colors[16][2] = 0;

    this.GetColorsCount = function () {
        return colorsCount;
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