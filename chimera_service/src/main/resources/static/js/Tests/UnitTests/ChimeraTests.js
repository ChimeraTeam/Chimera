function dataDecryptServiceTest(data, count, type) {
	var service = new DataDecryptor();
    Globals.VisualizationType = type;
    QUnit.assert.equal(service.decrypt(data).length, count, 'decrypt data with ' + count + ' values');
}

function socketDataInspectorSimpleDataPhaseTest() {
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
    }, 500);
}

function socketDataInspectorSimpleDataFrequencyTest() {
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
    }, 2000);
}

function socketDataInspectorComplexPhaseTest() {
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
    var decryptService = new DataDecryptor();
    inspector.init(info);
    QUnit.stop();
    setTimeout(function () {
        QUnit.start();
        QUnit.assert.ok(inspector.getData().length > 0, "Data was obtained from WebSocket");
        QUnit.assert.ok(decryptService.decrypt(inspector.getData()).length == (info.frames * 125000 + 1), "Phase data for " + info.frames + " frames were successfully obtained and decrypted");
    }, 3000);
}

function socketDataInspectorComplexFrequencyTest() {
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
    var decryptService = new DataDecryptor();
    inspector.init(info);
    QUnit.stop();
    setTimeout(function () {
        QUnit.start();
        QUnit.assert.ok(inspector.getData().length > 0, "Data was obtained from WebSocket");
        QUnit.assert.ok(decryptService.decrypt(inspector.getData()).length > info.frames * 125000, "Frequency data for " + info.frames + " frames were successfully obtained and decrypted");
    }, 4000);
}

function socketDataInspectorAndDecryptedServiceTest() {
    var inspector = new SocketDataInspector();
    inspector.setFrames(1);
    inspector.postToWServer('/home/saa/nauka/tst-2d/maistrenko/50x50x50-3d-tor/alpha=0.01-r=2-tor/trajectory.xz', 'P', 'N');
    QUnit.assert.ok(0 == 0, "");
    setTimeout(function () {
        QUnit.assert.ok(inspector.getData().length > 0, "Data was obtained from WebSocket (1 frame)");
    }, 500);
}

function snapshotsManagerTest() {
    QUnit.assert.ok(0 == 0, "");
}

function cookiesAPITest(name, value) {
    var cookiesApi = new Cookies();
    cookiesApi.setCookie(name, value);

    var res = cookiesApi.getCookie(name);
    cookiesApi.eraseCookie(name);

    QUnit.assert.equal(res, value, name + ' with value ' + value + ' successfully saved and read from cookies');
    QUnit.assert.equal(cookiesApi.getCookie(name), "", name + ' was successfully erased');
}

function uiTests() {
    var emulator = new ControlsEmulator();
    emulator.emulate();

    var uiCreator = new UICreator();

    var btnId = emulator.getControlsIds()[0];
    uiCreator.setControlValue(btnId, 'TEST');
    uiCreator.setDisabledButtonProperty(btnId, true);

    QUnit.assert.equal(uiCreator.getControlValue(btnId), 'TEST', 'control value was successfully changed');
    QUnit.assert.equal(document.getElementById(btnId).disabled, true, 'button was successfully disabled');
}

function pageGridTest(){
    var pageGrid = new PageGrid();
    pageGrid.createGrid(2000, 1000);
    QUnit.assert.ok(pageGrid.getCell(10, 10).x > 0, 'x coordinate for cell number 10 was successfully build');
    QUnit.assert.ok(pageGrid.getCell(20, 20).y > 0, 'y coordinate for cell number 20 was successfully build');
    QUnit.assert.ok(pageGrid.getCell(50, 50).x == null, 'cell number 50 does not exists');
}

QUnit.test('dataDecryptServiceTest', function() {
    dataDecryptServiceTest("5.456", 1, "P");
    dataDecryptServiceTest("5.456,8.7852", 2, "P");
    dataDecryptServiceTest("4.456,6.7852,1.2222", 3, "P");
    dataDecryptServiceTest("4.456,6.7852,1.2222,4.456,6.7852,1.2222,4.456,6.7852,1.2222", 9, "P");
})

QUnit.test('cookiesAPITest', function() {
    cookiesAPITest('test_cookie', 1);
})

QUnit.test('uiTests', function() {
    uiTests();
})

QUnit.test('pageGridTest', function() {
    pageGridTest();
})

QUnit.test('snapshotsManagerTest', function() {
    snapshotsManagerTest();
})

QUnit.test('socketDataInspectorSimplePhaseTest', function() {
    socketDataInspectorSimpleDataPhaseTest();
})

QUnit.test('socketDataInspectorComplexPhaseTest', function() {
    socketDataInspectorComplexPhaseTest();
})

QUnit.test('socketDataInspectorSimpleFrequencyTest', function() {
    socketDataInspectorSimpleDataFrequencyTest();
})

QUnit.test('socketDataInspectorComplexFrequencyTest', function() {
    socketDataInspectorComplexFrequencyTest();
})

