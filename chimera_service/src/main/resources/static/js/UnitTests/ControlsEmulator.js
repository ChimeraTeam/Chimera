/**
 * Created by p8h77m on 1/28/2016.
 */

var ControlsEmulator = function () {
    var controlsId = [];

    this.emulate = function () {
        var btn = document.createElement('BUTTON');
        btn.id = 'testBtn'
        btn.value = 'Ok';
        btn.style.visibility = "hidden";
        document.body.appendChild(btn);

        controlsId.push(btn.id);
    }

    this.getControlsIds = function () {
        return controlsId;
    }
};