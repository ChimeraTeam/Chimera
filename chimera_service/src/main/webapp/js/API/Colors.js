var Colors = function (needInitColors) {
    var rgbColorMap = [];

    init(needInitColors);

    function init(needCreateColors) {
        if (needCreateColors) {
            rgbColorMap = RGBColorMap.getColorMap();
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