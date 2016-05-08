/**
 * Created by Yurii on 27.02.2016.
 */

var DateTime = function () {
    this.getCurrentTimeString = function () {
        var date = new Date();
        var hours = date.getHours().toString();
        var minutes = date.getMinutes().toString();
        var seconds = date.getSeconds().toString();
        var result = hours + ':';

        if (minutes.length == 1) {
            result += '0' + minutes + ':';
        } else {
            result += minutes + ':';
        }

        if (seconds.length == 1) {
            result += '0' + seconds;
        } else {
            result += seconds;
        }

        return result;
    }
}