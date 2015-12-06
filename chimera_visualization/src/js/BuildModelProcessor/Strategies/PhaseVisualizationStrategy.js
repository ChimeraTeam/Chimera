PhaseVisualizationStrategy = function () {

    var colors = [];

    this.min;
    this.max;

    this.ShowModel = function()
    {
        
    }

    this.ConvertToColorMap = function (data) {
        var H, Vm, a, Vi, Vd, R, G, B;
        var S = (1 - this.min / this.max) * 100;
        var V = (this.max * 60) / 3.6;

        for (var i = 0; i < data.length; i++) {
            colors[i] = new THREE.Color();
            H = 3 * data[i] / 3.1427;
            Vm = V * (100 - S) / 100;
            a = (V - Vm) * (H % 1) / 60;
            Vi = Vm + a;
            Vd = V - a;
            H = Math.floor(H);

            switch (H) {
                case 0: colors[i].setRGB(V, Vi, Vm);
                    break;
                case 1: colors[i].setRGB(Vd, V, Vm);
                    break;
                case 2: colors[i].setRGB(Vm, V, Vi);
                    break;
                case 3: colors[i].setRGB(Vm, Vd, V);
                    break;
                case 4: colors[i].setRGB(Vi, Vm, V);
                    break;
                case 5: colors[i].setRGB(V, Vm, Vd);
                    break;
            }
        }

        return colors;
    }

}