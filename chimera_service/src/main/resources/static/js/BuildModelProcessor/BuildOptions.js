/**
 * Created by Yurii on 16.06.2016.
 */

var BuildOptions = function (array, forceOpacityValue, forcePointSizeValue, frame, isVideo) {
    this.particles = array;
    this.opacity = forceOpacityValue == null ? Options.GetValue(OptionNames.Opacity) : forceOpacityValue;
    this.size = forcePointSizeValue == null ? Options.GetValue(OptionNames.PointSize) : forcePointSizeValue;;
    this.frame = frame;
    this.isVideoMode = isVideo;
}