var Colors = function () {
    var rgbColorMap = [];

    init();

    function init() {
        rgbColorMap = RGBColorMap.getColorMap();
    }

    this.getColors = function (index) {
        return {
            r: rgbColorMap[index][0],
            g: rgbColorMap[index][1],
            b: rgbColorMap[index][2]
        };
    }
};