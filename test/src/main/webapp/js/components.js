var Components = function () {
    
};

Components.initialiseGeneralComponents = function () {
    var controls = [];
    controls.push("main");          //0     text label
    controls.push("openFile");      //1     file open dialog
    controls.push("textLabel");     //2     text label
    controls.push("time");          //3     textbox for input time moment 
    controls.push("Build");         //4     button for start visualization
    controls.push("Video3D");       //5     button for play a video
    controls.push("loadingLabel");  //6    loading label
    return controls;
}

Components.initialiseCutComponents = function () {
    var controls = [];
    controls.push("X1");            //0
    controls.push("textX1");        //1
    controls.push("Y1");            //2
    controls.push("textY1");        //3
    controls.push("Z1");            //4
    controls.push("textZ1");        //5
    controls.push("X2");            //6
    controls.push("textX2");        //7
    controls.push("Y2");            //8
    controls.push("textY2");        //9
    controls.push("Z2");            //10
    controls.push("textZ2");        //11
    controls.push("btnApplyCut");   //12
    controls.push("btnCancel");     //13
    controls.push("cut");           //14     text label
    controls.push("cutFront");      //15     cut front mode
    controls.push("cutBack");       //16     cut back mode
    controls.push("CutLines");      //17     cut lines mode
    return controls;
}

Components.initialiseVideoComponents = function () {
    var controls = [];
    controls.push("pause");   //0     pause video play or play video after pause
    controls.push("stop");    //1     stop video play and exit from video block
    controls.push("delay");   //2     delay video play
    controls.push("videoLabelTime");
    return controls;
}

Components.initialiseInitialPageComponents = function () {
    var controls = [];
    controls.push("phase");
    controls.push("freq");
    return controls;
}

Components.initialiseFileReaderPage = function (fileViewerID) {
    var controls = [];
    controls.push(fileViewerID);
    return controls;
}
Components.initialiseModellingPage = function (generalControls) {
    var controls = [];
    for (var i = 2; i < 6; i++) {
        controls.push(generalControls[i]);
    }
    return controls;
}

Components.setVisibleComponentPropertyByName =  function (document, controlName, value) {
    if (value) document.getElementById(controlName).style.visibility = "visible";
    else document.getElementById(controlName).style.visibility = "hidden";
}

function setControlPosition(document, name, x, y, width, height) {
    document.getElementById(name).style.width = width;
    document.getElementById(name).style.height = height;
    document.getElementById(name).style.top = y;
    document.getElementById(name).style.left = x;
}

Components.setInitialPageComponentsPosition = function (document, array, width, height) {
    for (var i = 0; i < 2; i++)
        document.getElementById(array[i]).style.position = "absolute";
    setControlPosition(document, array[0], 2.3 * width / 6, height / 3, width / 10, height / 10);
    setControlPosition(document, array[1], 3.3 * width / 6, height / 3, width / 10, height / 10);
}

Components.setInitialCutComponentsPosition = function (document, array, width, height) {
    for (var i = 0; i < 18; i++)
        document.getElementById(array[i]).style.position = "absolute";
    setControlPosition(document, array[0], 81 * width / 100, 20 * height / 50, 2 * width / 100, 2 * height / 100);
    setControlPosition(document, array[1], 84 * width / 100, 20 * height / 50, 2 * width / 100, 3 * height / 100);
    setControlPosition(document, array[2], 87 * width / 100, 20 * height / 50, 2 * width / 100, 2 * height / 100);
    setControlPosition(document, array[3], 90 * width / 100, 20 * height / 50, 2 * width / 100, 3 * height / 100);
    setControlPosition(document, array[4], 93 * width / 100, 20 * height / 50, 2 * width / 100, 2 * height / 100);
    setControlPosition(document, array[5], 96 * width / 100, 20 * height / 50, 2 * width / 100, 3 * height / 100);
    setControlPosition(document, array[6], 81 * width / 100, 23 * height / 50, 2 * width / 100, 2 * height / 100);
    setControlPosition(document, array[7], 84 * width / 100, 23 * height / 50, 2 * width / 100, 3 * height / 100);
    setControlPosition(document, array[8], 87 * width / 100, 23 * height / 50, 2 * width / 100, 2 * height / 100);
    setControlPosition(document, array[9], 90 * width / 100, 23 * height / 50, 2 * width / 100, 3 * height / 100);
    setControlPosition(document, array[10], 93 * width / 100, 23 * height / 50, 2 * width / 100, 2 * height / 100);
    setControlPosition(document, array[11], 96 * width / 100, 23 * height / 50, 2 * width / 100, 3 * height / 100);
    setControlPosition(document, array[12], 83 * width / 100, 26 * height / 50, 5 * width / 100, 3 * height / 100);
    setControlPosition(document, array[13], 90 * width / 100, 26 * height / 50, 5 * width / 100, 3 * height / 100);
    setControlPosition(document, array[14], 90 * width / 100, 10 * height / 50, 5 * width / 100, 2 * height / 100);
    setControlPosition(document, array[15], 87 * width / 100, 12 * height / 50, 10 * width / 100, 3 * height / 100);
    setControlPosition(document, array[16], 87 * width / 100, 14 * height / 50, 10 * width / 100, 3 * height / 100);
    setControlPosition(document, array[17], 87 * width / 100, 16 * height / 50, 10 * width / 100, 3 * height / 100);

}

Components.setVideoComponentsPosition = function (document, array, width, height) {
    for (var i = 0; i < 3; i++)
        document.getElementById(array[i]).style.position = "absolute";
    setControlPosition(document, array[0], 3 * width / 11, height / 10, width / 10, height / 15);
    setControlPosition(document, array[1], 5 * width / 11, height / 10, width / 10, height / 15);
    setControlPosition(document, array[2], 7 * width / 11, height / 10, width / 10, height / 15);
}
Components.setGeneralComponentsPosition = function (document, array, width, height) {
    for (var i = 0; i < 7; i++)
        document.getElementById(array[i]).style.position = "absolute";
    setControlPosition(document, array[0], width / 100, height / 50, 5 * width / 100, height / 50);
    setControlPosition(document, array[1], 5.5 * width / 100, height / 50, 18 * width / 100, 2 * height / 50);
    setControlPosition(document, array[2], width / 100, 4 * height / 50, 25 * width / 100, 2 * height / 50);
    setControlPosition(document, array[3], 25 * width / 100, 4 * height / 50, 5 * width / 100, 3 * height / 100);
    setControlPosition(document, array[4], 39 * width / 100, 4 * height / 50, 10 * width / 100, 4 * height / 100);
    setControlPosition(document, array[5], 51 * width / 100, 4 * height / 50, 10 * width / 100, 4 * height / 100);
    setControlPosition(document, array[6], 46 * width / 100, 25 * height / 50, 10 * width / 100, 3 * height / 100);

}

Components.setVisiblePropertyAllArrayComponents = function (document, array, count, value) {
    for (var i = 0; i < count; i++)
    {
        if (value) document.getElementById(array[i]).style.visibility = "visible";
        else document.getElementById(array[i]).style.visibility = "hidden";
    }
}