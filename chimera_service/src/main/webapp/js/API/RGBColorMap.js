/**
 * Created by Yurii on 17.02.2016.
 */

var RGBColorMap = function () {

}

var colorMap = [];

function push(r, g, b) {
    colorMap.push(new Array(r, g, b));
}

RGBColorMap.getCount = function () {
    init();
    return colorMap.length - 1;
};

RGBColorMap.getColorMap = function () {
    if (colorMap == null) {
        init();
    }

    return colorMap;
}

function init() {
    push(0,0,0);
    push(0,0,128);
    push(0,0,255);
    push(128,0,0);
    push(128,0,128);
    push(128,128,0);
    push(0,128,128);
    push(128,128,128);  //dark silver
    //push(34,139,34);    //forest green
    push(0,128,0);      //dark green
    push(0,255,0);      //green
    push(176,48,96);    //maroon
    push(208,32,144);   //violet red
    push(255,0,0);      //red
    push(255,0,255);    //magenta
    push(255,69,0);     //orange red
    push(245,245,220);  //beige
    push(255,255,0);
    push(192,192,192);
    push(255,255,255);


    return colorMap;
}