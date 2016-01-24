PhaseVisualizationStrategy = function () {

    var colors = [];

    this.ConvertToColorMap = function (data) {
        colors = [];

        var S = 0.8;
        var V = 1;
        var converter = new Colors(false);

        for (var i = 0; i < data.length; i++) {
            colors[i] = new THREE.Color();
            var H = data[i];
            var hsl = converter.hsv_to_hsl(H, S, V);
            colors[i].setHSL(hsl.h, hsl.s, hsl.l);
        }

        return colors;
    }

}