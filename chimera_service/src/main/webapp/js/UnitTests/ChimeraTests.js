function dataDecryptServiceTest(data, count) {
	var service = new DataDecryptedService();
    QUnit.assert.equal(service.decryptData(data).length, count, 'decrypt data with ' + count + ' values');
}

function cookiesAPITest(name, value) {
    var cookiesApi = new Cookies();
    cookiesApi.setCookie(name, value);

    var res = cookiesApi.getCookie(name);
    cookiesApi.eraseCookie(name);

    QUnit.assert.equal(res, value, name + ' with value ' + value + ' successfully saved and read from cookies');
    QUnit.assert.equal(cookiesApi.getCookie(name), "", name + ' was successfully erased');
}

QUnit.test('dataDecryptServiceTest', function() {
    dataDecryptServiceTest("5.456", 1);
    dataDecryptServiceTest("5.456,8.7852", 2);
    dataDecryptServiceTest("4.456,6.7852,1.2222", 3);
    dataDecryptServiceTest("4.456,6.7852,1.2222,4.456,6.7852,1.2222,4.456,6.7852,1.2222", 9);
})

QUnit.test('cookiesAPITest', function() {
    cookiesAPITest('test_cookie', 1);
})
