Messaging = function () {

}

Messaging.Error = 0;
Messaging.Info = 1;
Messaging.Warning = 2;

Messaging.TimeMomentRangeError = "unexpected time moment";
Messaging.LastTimeMomentWarning = "this is last time moment, can't load next frame";
Messaging.FirstTimeMomentWarning = "this is first time moment, can't load previously frame";

Messaging.ShowMessage = function(type, message) {
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