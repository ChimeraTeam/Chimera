var cutContext = function () {

}

cutContext.initialControlColor = "";
cutContext.cutType = "";
cutContext.cutControlsArray = [];
cutContext.cutValues = [];

cutContext.initCutArray = function () {
    cutContext.cutControlsArray.push("X1");            //0
    cutContext.cutControlsArray.push("textX1");        //1
    cutContext.cutControlsArray.push("Y1");            //2
    cutContext.cutControlsArray.push("textY1");        //3
    cutContext.cutControlsArray.push("Z1");            //4
    cutContext.cutControlsArray.push("textZ1");        //5
    cutContext.cutControlsArray.push("X2");            //6
    cutContext.cutControlsArray.push("textX2");        //7
    cutContext.cutControlsArray.push("Y2");            //8
    cutContext.cutControlsArray.push("textY2");        //9
    cutContext.cutControlsArray.push("Z2");            //10
    cutContext.cutControlsArray.push("textZ2");        //11
    cutContext.cutControlsArray.push("btnApplyCut");   //12
    cutContext.cutControlsArray.push("btnCancel");     //13
}

function setCutControlPosition(document, controlID, left, top, wd, ht) {
    document.getElementById(cutContext.cutControlsArray[controlID]).style.width = wd;
    document.getElementById(cutContext.cutControlsArray[controlID]).style.height = ht;
    document.getElementById(cutContext.cutControlsArray[controlID]).style.top = top;
    document.getElementById(cutContext.cutControlsArray[controlID]).style.left = left;
}

function setVisibleComponentCutProperty(document, controlID, value) {
    if (value) document.getElementById(cutContext.cutControlsArray[controlID]).style.visibility = "visible";
    else document.getElementById(cutContext.cutControlsArray[controlID]).style.visibility = "hidden";
}

cutContext.initCutComponentsPositions = function (document) {
    cutContext.initCutArray();
    setCutControlPosition(document, 0, 81 * settingContext.width / 100, 20 * settingContext.height / 50, 2 * settingContext.width / 100, 2 * settingContext.height / 100);
    setCutControlPosition(document, 1, 84 * settingContext.width / 100, 20 * settingContext.height / 50, 2 * settingContext.width / 100, 3 * settingContext.height / 100);
    setCutControlPosition(document, 2, 87 * settingContext.width / 100, 20 * settingContext.height / 50, 2 * settingContext.width / 100, 2 * settingContext.height / 100);
    setCutControlPosition(document, 3, 90 * settingContext.width / 100, 20 * settingContext.height / 50, 2 * settingContext.width / 100, 3 * settingContext.height / 100);
    setCutControlPosition(document, 4, 93 * settingContext.width / 100, 20 * settingContext.height / 50, 2 * settingContext.width / 100, 2 * settingContext.height / 100);
    setCutControlPosition(document, 5, 96 * settingContext.width / 100, 20 * settingContext.height / 50, 2 * settingContext.width / 100, 3 * settingContext.height / 100);
    setCutControlPosition(document, 6, 81 * settingContext.width / 100, 23 * settingContext.height / 50, 2 * settingContext.width / 100, 2 * settingContext.height / 100);
    setCutControlPosition(document, 7, 84 * settingContext.width / 100, 23 * settingContext.height / 50, 2 * settingContext.width / 100, 3 * settingContext.height / 100);
    setCutControlPosition(document, 8, 87 * settingContext.width / 100, 23 * settingContext.height / 50, 2 * settingContext.width / 100, 2 * settingContext.height / 100);
    setCutControlPosition(document, 9, 90 * settingContext.width / 100, 23 * settingContext.height / 50, 2 * settingContext.width / 100, 3 * settingContext.height / 100);
    setCutControlPosition(document, 10, 93 * settingContext.width / 100, 23 * settingContext.height / 50, 2 * settingContext.width / 100, 2 * settingContext.height / 100);
    setCutControlPosition(document, 11, 96 * settingContext.width / 100, 23 * settingContext.height / 50, 2 * settingContext.width / 100, 3 * settingContext.height / 100);
    setCutControlPosition(document, 12, 83 * settingContext.width / 100, 26 * settingContext.height / 50, 5 * settingContext.width / 100, 3 * settingContext.height / 100);
    setCutControlPosition(document, 13, 90 * settingContext.width / 100, 26 * settingContext.height / 50, 5 * settingContext.width / 100, 3 * settingContext.height / 100);
}

cutContext.loadFrontBackCut = function (document) {
    setVisibleComponentCutProperty(document, 0, true);
    setVisibleComponentCutProperty(document, 1, true);
    setVisibleComponentCutProperty(document, 2, true);
    setVisibleComponentCutProperty(document, 3, true);
    setVisibleComponentCutProperty(document, 4, true);
    setVisibleComponentCutProperty(document, 5, true);
    setVisibleComponentCutProperty(document, 6, false);
    setVisibleComponentCutProperty(document, 7, false);
    setVisibleComponentCutProperty(document, 8, false);
    setVisibleComponentCutProperty(document, 9, false);
    setVisibleComponentCutProperty(document, 10, false);
    setVisibleComponentCutProperty(document, 11, false);
    setVisibleComponentCutProperty(document, 12, true);
    setVisibleComponentCutProperty(document, 13, true);
}

cutContext.loadSelectedCut = function (document) {
    for (var i = 0; i < cutContext.cutControlsArray.length; i++) {
        setVisibleComponentCutProperty(document, i, true);
    }
}

cutContext.unVisibleAll = function (document) {
    for (var i = 0; i < cutContext.cutControlsArray.length; i++) {
        setVisibleComponentCutProperty(document, i, false);
    }
}

cutContext.getCutValues = function (document) {
    cutContext.cutValues.push(document.getElementById(cutContext.cutControlsArray[1]).value);
    cutContext.cutValues.push(document.getElementById(cutContext.cutControlsArray[3]).value);
    cutContext.cutValues.push(document.getElementById(cutContext.cutControlsArray[5]).value);
    if (cutContext.cutType = 'cutSelected') {
        cutContext.cutValues.push(document.getElementById(cutContext.cutControlsArray[7]).value);
        cutContext.cutValues.push(document.getElementById(cutContext.cutControlsArray[9]).value);
        cutContext.cutValues.push(document.getElementById(cutContext.cutControlsArray[11]).value);

    }
}

cutContext.clearCutValues = function () {
    cutContext.cutValues = null;
}