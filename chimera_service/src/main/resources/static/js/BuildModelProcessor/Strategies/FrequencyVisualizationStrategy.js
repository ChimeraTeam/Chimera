FrequencyVisualizationStrategy = function () {

    var colors = [];
    var rgbColors = new Colors();

    this.ConvertToColorMap = function (data) {
        colors = [];

        for (var i = 0; i < data.length; i++) {
            colors[i] = new THREE.Color();
            var color = rgbColors.getColors(data[i]);
            colors[i].setRGB(color.r, color.g, color.b);
        }

        return colors;
    }
}