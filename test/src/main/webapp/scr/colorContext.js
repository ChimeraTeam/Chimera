colorContext = function () {
}

colorContext.arrayR = [];
colorContext.arrayG = [];
colorContext.arrayB = [];

function addRGB(R, G, B) {
    colorContext.arrayR.push(R);
    colorContext.arrayG.push(G);
    colorContext.arrayB.push(B);
}

colorContext.setRGBdivArray = function () {
    addRGB(0, 1, 0);
    addRGB(0, 0, 1);
    addRGB(1, 0, 1);
    addRGB(0.85, 0.67, 0);
    addRGB(1, 0, 0);

    //addRGB(255/255, 227/255, 34/255);
    //for (var i = 0; i < 30; i++) {
    //    addRGB((177 - 5 * i)/255, 253/255, 36/255);
    //}
    //for (var i = 0; i < 30; i++) {
    //    addRGB(38/255, 253/255, (36 + 5 * i)/255);
    //}
    //for (var i = 0; i < 30; i++) {
    //    addRGB(40/255, (130 - i * 5)/255, 250/255);
    //}
    //for (var i = 0; i < 30; i++) {
    //    addRGB(250/255, 44/255, (240 - i * 5)/255);
    //}
}