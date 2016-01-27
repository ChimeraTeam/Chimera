function dataDecryptTest(data, count) {
	var service = new DataDecryptedService();
    var decryptArray = service.decryptData(data);

    if (decryptArray.length == count)
        return true;

    return false;
}

test('dataDecryptTest()', function() {
    ok(dataDecryptTest("5.456", 1), 'decrypt data with 1 value');
    ok(dataDecryptTest("5.456,8.7852", 2), 'decrypt data with 2 values');
    ok(dataDecryptTest("4.456,6.7852,1.2222", 3), 'decrypt data with 3 values');
    ok(dataDecryptTest("4.456,6.7852,1.2222,4.456,6.7852,1.2222,4.456,6.7852,1.2222", 9), 'decrypt data with 9 values');
})
