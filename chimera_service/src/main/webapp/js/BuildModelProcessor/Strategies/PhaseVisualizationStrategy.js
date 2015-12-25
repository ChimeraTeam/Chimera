PhaseVisualizationStrategy = function () {

    var colors = [];

    this.min;
    this.max;

    this.ConvertToColorMap = function (data) {
        colors = [];

        var H, Vm, a, Vi, Vd;
        var S = 0.8;
        var V = 1;

        for (var i = 0; i < data.length; i++) {
            colors[i] = new THREE.Color();
            H = 180 * data[i] / Math.PI;
            var converter = new ColorConverter();
            var hsl = converter.hsv_to_hsl(H, S, V);
            colors[i].setHSL(hsl[0], hsl[1], hsl[2]);
        }

        return colors;
    }

}