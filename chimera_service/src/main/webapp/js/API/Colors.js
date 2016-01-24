Colors = function (needInitColors) {
    var colorsCount = 17;
    var rgbColorMap = [];

    init(needInitColors);

    function push(r, g, b) {
        rgbColorMap.push(new Array(r, g, b));
    }

    function init(needCreateColors) {
        if (needCreateColors) {
            push(255, 255, 0);      //ffffff
            push(255, 255, 204);    //ffffcc
            push(255, 204, 153);    //ffff99
            push(255, 255, 102);    //ffff66
            push(255, 255, 51);     //ffff33
            push(255, 255, 0);      //ffff00
            push(153, 255, 153);    //99ff99
            push(102, 255, 102);    //66ff66
            push(51, 255, 51);      //33ff33
            push(0, 255, 0);        //00ff00
            push(255, 102, 102);    //ff6666
            push(255, 51, 51);      //ff3333
            push(255, 0, 0);        //ff0000
            push(51, 51, 255);      //3333ff
            push(0, 0, 255);        //0000ff
            push(64, 64, 64);       //404040
            push(0, 0, 0);          //000000
        }
    }

    this.getColorsCount = function () {
        return colorsCount;
    }

    this.getColors = function (index) {
        return {
            r: rgbColorMap[index][0],
            g: rgbColorMap[index][1],
            b: rgbColorMap[index][2]
        };
    }

    this.hsv_to_hsl = function (h, s, v) {
        // both hsv and hsl values are in [0, 1]
        var l = (2 - s) * v / 2;

        if (l != 0) {
            if (l == 1) {
                s = 0
            } else if (l < 0.5) {
                s = s * v / (l * 2)
            } else {
                s = s * v / (2 - l * 2)
            }
        }

        return {
            h: h / 100,
            s: s,
            l: l
        };
    }
};