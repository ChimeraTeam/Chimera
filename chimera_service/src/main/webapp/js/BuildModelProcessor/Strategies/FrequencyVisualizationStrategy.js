FrequencyVisualizationStrategy = function () {

    var colors = [];
    var divideArray = [];

    this.min;
    this.max;

    this.ConvertToColorMap = function (data) {

        var rgbColors = new RGB();
        var colorsCount = rgbColors.GetColorsCount();

        var displacement = (this.max - this.min) / (colorsCount - 1);
        for (var i = 0; i < colorsCount; i++) {
            divideArray[i] = parseFloat(this.min) + i * displacement;
        }

        for (var i = 0; i < data.length; i++) {
            colors[i] = new THREE.Color();

            var colorIndex = Round(data[i]);
            colors[i].setRGB(rgbColors.GetR(colorIndex), rgbColors.GetG(colorIndex), rgbColors.GetB(colorIndex));
        }
        return colors;
    }

    function Round(value) {

        var index = 0;
        var min = 100;

        for (var i = 0; i < divideArray.length; i++) {
            var diff = value - divideArray[i];

            if (Math.abs(diff) < Math.abs(min)) {
                min = diff;
                index = i;
            }
        }

        return index;
    }
}