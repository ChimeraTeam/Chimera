/**
 * Created by Yurii on 25.02.2016.
 */

var SnapshotsManagerWindowHandlers = function () {
    var controlsContainer = [SnapshotsManagerWindowControlNames.SnapshotNameTextBox, SnapshotsManagerWindowControlNames.TakeSnapshotButton];
    var _uiCreator = new UICreator();

    this.setChildControlsVisibility = function (isVisible) {
        _uiCreator.setSceneVisibility(controlsContainer, isVisible);
    }
}