/**
 * Created by Yurii on 24.02.2016.
 */

var FrequencyParser = function () {
    this.parse = function (frameData, min, max, readyData) {
        var multiplier = RGBColorMap.getCount()/(max - min);

        for (var i = 0; i < frameData.length; i++) {
            var value = frameData[i];
            value -= min;
            value *= multiplier;
            readyData.push(parseInt(value));
        }
    }
}