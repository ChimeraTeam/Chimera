FrequencyVisualizationStrategy = function () {

    var colors = [];

    this.min;
    this.max;

    this.ConvertToColorMap = function (data) {
        colors = [];

        var rgbColors = new RGB();

        for (var i = 0; i < data.length; i++) {
            colors[i] = new THREE.Color();

            var color = rgbColors.GetColors(data[i]);
            colors[i].setRGB(color.r, color.g, color.b);
        }

        return colors;
    }
}