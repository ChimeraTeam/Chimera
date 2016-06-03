/**
 * Created by Yurii on 12.05.2016.
 */

var SocketDataInspectorTests = function () {
    this.socketDataInspectorSimpleDataPhaseTest = function () {
        var inspector = new SocketDataInspector();
        var info =
        {
            file: '/home/saa/nauka/tst-2d/maistrenko/50x50x50-3d-tor/alpha=0.01-r=2-tor/trajectory.xz',
            type: 'P',
            compress: 'N',
            frames: 1,
            callbackMethod: function () {},
            showProgressMethod: function () {}
        };
        inspector.init(info);
        QUnit.stop();
        setTimeout(function () {
            QUnit.start();
            QUnit.assert.ok(inspector.getData().length > 0, "Data was obtained from WebSocket (1 phase data frame)");
        }, 1000);
    }

    this.socketDataInspectorSimpleDataFrequencyTest = function() {
        var inspector = new SocketDataInspector();
        var info =
        {
            file: '/home/saa/nauka/tst-2d/maistrenko/50x50x50-3d-tor/alpha=0.01-r=2-tor/trajectory.xz',
            type: 'F',
            compress: 'N',
            frames: 1,
            callbackMethod: function () {},
            showProgressMethod: function () {}
        };

        inspector.init(info);
        QUnit.stop();
        setTimeout(function () {
            QUnit.start();
            QUnit.assert.ok(inspector.getData().length > 0, "Data was obtained from WebSocket (1 frequency data frame)");
        }, 2500);
    }

    this.socketDataInspectorComplexPhaseTest = function () {
        var inspector = new SocketDataInspector();
        var info =
        {
            file: '/home/saa/nauka/tst-2d/maistrenko/50x50x50-3d-tor/alpha=0.01-r=2-tor/trajectory.xz',
            type: 'P',
            compress: 'N',
            frames: 5,
            callbackMethod: function () {},
            showProgressMethod: function () {}
        };
        var decryptService = new DataDecryptedService();
        inspector.init(info);
        QUnit.stop();
        setTimeout(function () {
            QUnit.start();
            QUnit.assert.ok(inspector.getData().length > 0, "Data was obtained from WebSocket");
            QUnit.assert.ok(decryptService.decryptData(inspector.getData()).length == (info.frames * 125000 + 1), "Phase data for " + info.frames + " frames were successfully obtained and decrypted");
        }, 3000);
    }

    this.socketDataInspectorComplexFrequencyTest = function () {
        var inspector = new SocketDataInspector();
        var info =
        {
            file: '/home/saa/nauka/tst-2d/maistrenko/50x50x50-3d-tor/alpha=0.01-r=2-tor/trajectory.xz',
            type: 'F',
            compress: 'N',
            frames: 2,
            callbackMethod: function () {},
            showProgressMethod: function () {}
        };
        var decryptService = new DataDecryptedService();
        inspector.init(info);
        QUnit.stop();
        setTimeout(function () {
            QUnit.start();
            QUnit.assert.ok(inspector.getData().length > 0, "Data was obtained from WebSocket");
            QUnit.assert.ok(decryptService.decryptData(inspector.getData()).length > info.frames * 125000, "Frequency data for " + info.frames + " frames were successfully obtained and decrypted");
        }, 5000);
    }

    this.socketDataInspectorPhaseCheckAllValuesTest = function () {
        var inspector = new SocketDataInspector();
        var info =
        {
            file: '/home/saa/nauka/tst-2d/maistrenko/50x50x50-3d-tor/alpha=0.01-r=2-tor/trajectory.xz',
            type: 'P',
            compress: 'N',
            frames: 1,
            callbackMethod: function () {},
            showProgressMethod: function () {}
        };
        var decryptService = new DataDecryptedService();
        inspector.init(info);
        QUnit.stop();
        setTimeout(function () {
            QUnit.start();
            if (inspector.getData().length > 0){
                var decryptedData = decryptService.decryptData(inspector.getData());
                var res = true;
                for (var i = 0; i < decryptedData.length; i++) {
                    if (decryptedData[i] < 0 || decryptedData[i] > 360) {
                        res = false;
                    }
                }
                QUnit.assert.ok(res, "All obtained phase data has correct values");
            } else {
                QUnit.assert.ok(false, "Can't obtained data from WebSocket");
            }
        }, 4000);
    }
}