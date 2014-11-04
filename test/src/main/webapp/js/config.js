config = function () {

}

config.testFile = "test/phase.phase";
config.fileFormat = "1.1";
config.fileAttrubute = "neuronsVisualization";
config.typeModelling = 0;
config.userNotificationID = "00000000";

config.constructor = function () {
    config.userNotificationID = config.createUserNotificationID();
    config.addIDtoSQLDatabase(config.userNotificationID);
}

config.createUserNotificationID = function () {
    var id;
    return id;
}

config.removeIDfromSQLDatabase = function (id) {
}

config.addIDtoSQLDatabase = function (id) {
}

config.destructor = function () {
}