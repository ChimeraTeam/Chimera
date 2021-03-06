/**
 * Created by Yurii on 13.02.2016.
 */

var PhaseVisualizationStrategy2 = function () {

    var colors = [];

    this.ConvertToColorMap = function (data) {
        colors = [];

        var S = 0.8;
        var V = 1;
        var converter = new PaletteConverter();

        for (var i = 0; i < data.length; i++) {
            colors[i] = new THREE.Color();
            var H = data[i];
            var hsl = converter.hsv_to_hsl(H, S, V);
            colors[i].setHSL(hsl.h, hsl.s, hsl.l);
        }

        return PhaseColorDecorator.decorate(colors);
    }
}