var initialisePagesLoadHandler = function () {
}

initialisePagesLoadHandler.currentPage = "initial"; 

initialisePagesLoadHandler.setInitialComponentProperty = function (document) {
    var buttons = document.getElementsByTagName("input");
    for (var i = 0; i < buttons.length; i++) {
        document.getElementById(buttons[i].id).style.position = "absolute";
    }
    var labels = document.getElementsByTagName("label");
    for (var i = 0; i < labels.length; i++) {
        document.getElementById(labels[i].id).style.position = "absolute";
    }
    delete labels;
    delete buttons;
}

initialisePagesLoadHandler.allComponentsUnvisible = function (document) {
    var buttons = document.getElementsByTagName("input");
    for (var i = 0; i < buttons.length; i++) {
        document.getElementById(buttons[i].id).style.visibility = "hidden";
    }
    var labels = document.getElementsByTagName("label");
    for (var i = 0; i < labels.length; i++) {
        if (labels[i].id != "loadingLabel")
            document.getElementById(labels[i].id).style.visibility = "hidden";
    }
    delete labels;
    delete buttons;
}

function setVisibleComponentProperty(document, controlID, value) {
    if (value) document.getElementById(controlID).style.visibility = "visible";
    else document.getElementById(controlID).style.visibility = "hidden";
}

function setControlPosition(controlName, x, y, wd, ht) {
    document.getElementById(controlName).style.width = wd;
    document.getElementById(controlName).style.height = ht;
    document.getElementById(controlName).style.top = y;
    document.getElementById(controlName).style.left = x;
}

initialisePagesLoadHandler.loadingLabel = function (document) {
    setVisibleComponentProperty(document, "loadingLabel", true);
    setControlPosition("loadingLabel", 46 * settingContext.width / 100, 25 * settingContext.height / 50, 10 * settingContext.width / 100, 3 * settingContext.height / 100);
}

initialisePagesLoadHandler.loadingLabelHide = function (document) {
    setVisibleComponentProperty(document, "loadingLabel", false);
}

initialisePagesLoadHandler.loadInitialPage = function (document) {
    initialisePagesLoadHandler.currentPage = "initial";
    initialisePagesLoadHandler.allComponentsUnvisible(document);
    setVisibleComponentProperty(document, 'phase', true);
    setVisibleComponentProperty(document, 'freq', true);
    setControlPosition('phase', 2.3 * settingContext.width / 6, settingContext.height / 3, settingContext.width / 10, settingContext.height / 10);
    setControlPosition('freq', 3.3 * settingContext.width / 6, settingContext.height / 3, settingContext.width / 10, settingContext.height / 10);
}

initialisePagesLoadHandler.loadFileReaderPage = function (document) {
    initialisePagesLoadHandler.currentPage = "fileReader";
    initialisePagesLoadHandler.allComponentsUnvisible(document);
    setVisibleComponentProperty(document, 'main', true);
    setVisibleComponentProperty(document, 'openFile', true);
    setControlPosition('main', settingContext.width / 100, settingContext.height / 50, 5 * settingContext.width / 100, settingContext.height / 50);
    setControlPosition('openFile', 5.5 * settingContext.width / 100, settingContext.height / 50, 18 * settingContext.width / 100, 2 * settingContext.height / 50);
}

initialisePagesLoadHandler.loadPreVisualizationPage = function (document) {
    initialisePagesLoadHandler.currentPage = "preVisualization";
    initialisePagesLoadHandler.allComponentsUnvisible(document);
    setVisibleComponentProperty(document, 'textLabel', true);
    setVisibleComponentProperty(document, 'time', true);
    setVisibleComponentProperty(document, 'Build', true);
    setVisibleComponentProperty(document, 'Video3D', true);
    setControlPosition('textLabel', settingContext.width / 100, 4 * settingContext.height / 50, 25 * settingContext.width / 100, 2 * settingContext.height / 50);
    setControlPosition('time', 25 * settingContext.width / 100, 4 * settingContext.height / 50, 5 * settingContext.width / 100, 3 * settingContext.height / 100);
    setControlPosition('Build', 39 * settingContext.width / 100, 4 * settingContext.height / 50, 10 * settingContext.width / 100, 4 * settingContext.height / 100);
    setControlPosition('Video3D', 51 * settingContext.width / 100, 4 * settingContext.height / 50, 10 * settingContext.width / 100, 4 * settingContext.height / 100);
}

initialisePagesLoadHandler.loadVisualizationPage = function (document) {
    initialisePagesLoadHandler.currentPage = "visualization";
    initialisePagesLoadHandler.allComponentsUnvisible(document);
    setVisibleComponentProperty(document, 'textLabel', true);
    setVisibleComponentProperty(document, 'time', true);
    setVisibleComponentProperty(document, 'Build', true);
    setVisibleComponentProperty(document, 'Video3D', true);
    setVisibleComponentProperty(document, "cut", true);
    setVisibleComponentProperty(document, 'cutFront', true);
    setVisibleComponentProperty(document, 'cutBack', true);
    setVisibleComponentProperty(document, 'CutLines', true);
    setControlPosition('textLabel', settingContext.width / 100, 4 * settingContext.height / 50, 25 * settingContext.width / 100, 2 * settingContext.height / 50);
    setControlPosition('time', 25 * settingContext.width / 100, 4 * settingContext.height / 50, 5 * settingContext.width / 100, 3 * settingContext.height / 100);
    setControlPosition('Build', 39 * settingContext.width / 100, 4 * settingContext.height / 50, 10 * settingContext.width / 100, 4 * settingContext.height / 100);
    setControlPosition('Video3D', 51 * settingContext.width / 100, 4 * settingContext.height / 50, 10 * settingContext.width / 100, 4 * settingContext.height / 100);
    setControlPosition("cut", 90 * settingContext.width / 100, 10 * settingContext.height / 50, 5 * settingContext.width / 100, 2 * settingContext.height / 100);
    setControlPosition('cutFront', 87 * settingContext.width / 100, 12 * settingContext.height / 50, 10 * settingContext.width / 100, 3 * settingContext.height / 100);
    setControlPosition('cutBack', 87 * settingContext.width / 100, 14 * settingContext.height / 50, 10 * settingContext.width / 100, 3 * settingContext.height / 100);
    setControlPosition('CutLines', 87 * settingContext.width / 100, 16 * settingContext.height / 50, 10 * settingContext.width / 100, 3 * settingContext.height / 100);
}

initialisePagesLoadHandler.loadVideo3DPage = function (document) {
    initialisePagesLoadHandler.currentPage = "video";
    initialisePagesLoadHandler.allComponentsUnvisible(document);
    setVisibleComponentProperty(document, "videoLabelTime", true);
    setVisibleComponentProperty(document, 'stop', true);
    setVisibleComponentProperty(document, 'pause', true);
    setVisibleComponentProperty(document, 'delay', true);
    setControlPosition('stop', 3 * settingContext.width / 11, settingContext.height / 10, settingContext.width / 10, settingContext.height / 15);
    setControlPosition('pause', 5 * settingContext.width / 11, settingContext.height / 10, settingContext.width / 10, settingContext.height / 15);
    setControlPosition('delay', 7 * settingContext.width / 11, settingContext.height / 10, settingContext.width / 10, settingContext.height / 15);
}
