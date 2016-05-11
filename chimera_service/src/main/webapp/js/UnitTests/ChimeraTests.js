function dataDecryptServiceTest(data, count, type) {
	var service = new DataDecryptedService();
    Globals.VisualizationType = type;
    QUnit.assert.equal(service.decryptData(data).length, count, 'decrypt data with ' + count + ' values');
}

function socketDataInspectorTest() {

}

function snapshotsManagerTest() {
	
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

QUnit.test('socketDataInspectorTest', function() {
    socketDataInspectorTest();
})

