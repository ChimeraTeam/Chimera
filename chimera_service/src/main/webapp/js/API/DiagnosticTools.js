DiagnosticTools = function () {

    var stopWatch = new Stopwatch();
    var lapTime = 0;

    function roughSizeOfObject(object) {

        var objectList = [];
        var stack = [object];
        var bytes = 0;

        while (stack.length) {
            var value = stack.pop();

            if (typeof value === 'boolean') {
                bytes += 4;
            }
            else if (typeof value === 'string') {
                bytes += value.length * 2;
            }
            else if (typeof value === 'number') {
                bytes += 8;
            }
            else if (typeof value === 'object'
                && objectList.indexOf(value) === -1)
            {
                objectList.push(value);

                for (var i in value) {
                    stack.push(value[i]);
                }
            }
        }
        return bytes;
    }

    this.getObjectSize = function (object) {
        return roughSizeOfObject(object);
    }

    this.timerStart = function () {
        stopWatch.start();
    }

    this.timerStop = function (displayAlert) {
        stopWatch.stop();
        lapTime = stopWatch.time();
        if (displayAlert) alert(lapTime);
        stopWatch.reset();
    }

    this.getLapTime = function () {
        return lapTime;
    }
}

Stopwatch = function () {
    
    var startAt = 0;
    var lapTime = 0;

    var now = function () {
        return (new Date()).getUTCMilliseconds();
    };

    this.start = function () {
        startAt = now();
    };

    this.stop = function () {
        lapTime = now() - startAt;
        startAt = 0;
    };

    this.reset = function () {
        lapTime = startAt = 0;
    };

    this.time = function () {
        return lapTime;
    };
};

