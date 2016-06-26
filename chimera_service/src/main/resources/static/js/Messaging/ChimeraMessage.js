var ChimeraMessage = function () {

}

ChimeraMessage.TimeMomentRangeError = "Unexpected time moment";
ChimeraMessage.LastTimeMomentWarning = "This is last time moment, can't load next frame";
ChimeraMessage.FirstTimeMomentWarning = "This is first time moment, can't load previously frame";
ChimeraMessage.OnOfflineWarning = "Please check internet connection!";
ChimeraMessage.IsNeedDownloadVideo = "Do you want download video in .gif format after video will be finished?";

ChimeraMessage.showMessage = function(type, message) {
    switch (type) {
        case 0:
            alert('Error: ' + message);
            break;
        case 1:
            alert('Info: ' + message);
            break;
        case 2:
            alert('Warning: ' + message);
            break;
        case 3:
            return confirm(message);
            break;
        default:
            break;
    }
}