FrequencyVisualizationStrategy = function () {

    var colors = [];    
    var divideArray = [];

    this.min;
    this.max;

    this.ShowModel = function() {

    }

    this.ConvertToColorMap = function (data) {

        var rgbColors = new RGB();
        var colorsCount = 5;

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

    function Round(value)
    {
        var array = [];
        var min = 100;
        var index;
        for (var i = 0; i < divideArray.length; i++) {
            array[i] = value - divideArray[i];
        }

        for (var i = 0; i < array.length; i++) {
            if (array[i] < min) {
                min = array[i];
                index = i;
            }
        }

        return index;
    }
}