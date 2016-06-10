var ChimeraMessage = function () {

}

ChimeraMessage.TimeMomentRangeError = "unexpected time moment";
ChimeraMessage.LastTimeMomentWarning = "this is last time moment, can't load next frame";
ChimeraMessage.FirstTimeMomentWarning = "this is first time moment, can't load previously frame";
ChimeraMessage.OnOfflineWarning = "Please check internet connection!";

ChimeraMessage.ShowMessage = function(type, message) {
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
        default:
            break;
    }
}